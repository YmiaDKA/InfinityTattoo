import type { Context } from "hono";

import { formatOre, parseKroner } from "../lib/report";
import { Layout } from "../views/layout";
import { Empty, PageHead, SegTabs } from "../views/ui";
import { adminApp, audit, str, type AdminEnv } from "./admin-shared";

/**
 * Produkter like Linework's: products with name, price incl. MVA, MVA rate and category, plus
 * "Manage categories". Picked in Nytt salg to register a sale. Stock count and SKU are our addition.
 * PLACEHOLDER-RESCAN: Linework's populated product rows, row actions and category picker weren't seen.
 */
export const products = adminApp();

export const VAT_OPTIONS = [25, 15, 12, 0] as const;

export type Product = {
  id: number;
  category_id: number | null;
  category: string | null;
  name: string;
  price_ore: number;
  vat_pct: number;
  sku: string | null;
  stock: number | null;
  active: number;
};

export const PRODUCT_SELECT = "SELECT p.*, pc.name AS category FROM products p LEFT JOIN product_categories pc ON pc.id = p.category_id";

export async function activeProducts(c: Context<AdminEnv>) {
  return (await c.env.DB.prepare(`${PRODUCT_SELECT} WHERE p.active = 1 ORDER BY pc.sort, pc.name, p.name`).all<Product>()).results;
}

const msg = (c: Context<AdminEnv>) => ({ flash: c.req.query("ok"), error: c.req.query("error") });

/** Produkter | Blekk, shared with the ink register's page. */
export function ProductTabs({ c, active }: { c: Context<AdminEnv>; active: "products" | "inks" }) {
  const f = c.get("user").features;
  if (f?.products === false || f?.inks === false) return null;
  return (
    <p>
      <SegTabs
        tabs={[
          { href: "/admin/products", label: "Produkter for salg" },
          { href: "/admin/inks", label: "Blekkregister" },
        ]}
        active={active === "products" ? "/admin/products" : "/admin/inks"}
      />
    </p>
  );
}

// Live "Pris eks. MVA / MVA" under the price, like Linework's add-product panel.
const PRICE_JS = `document.querySelectorAll('form[data-price]').forEach(function(f){var p=f.querySelector('[name=price]'),v=f.querySelector('[name=vat_pct]'),o=f.querySelector('.price-sum');function u(){var g=parseFloat((p.value||'0').replace(/\\s/g,'').replace(',','.'))||0,r=+v.value,m=g*r/(100+r),k=function(n){return n.toLocaleString('nb-NO',{minimumFractionDigits:2,maximumFractionDigits:2})+' kr'};o.textContent='Pris eks. MVA '+k(g-m)+' · MVA '+k(m)+' · Pris inkl. MVA '+k(g)}p.oninput=v.onchange=u;u()})`;

function ProductForm({ product, categories }: { product?: Product; categories: { id: number; name: string }[] }) {
  return (
    <form method="post" action={product ? `/admin/products/${product.id}` : "/admin/products"} class="card" data-price>
      <div class="row">
        <label>
          Produktnavn
          <input name="name" required maxlength={80} value={product?.name ?? ""} placeholder="Etterbehandlingskrem" />
        </label>
        <label>
          Pris inkl. MVA (kr)
          <input name="price" inputmode="decimal" required value={product ? String(product.price_ore / 100) : ""} placeholder="249" />
        </label>
        <label>
          MVA
          <select name="vat_pct">
            {VAT_OPTIONS.map((v) => (
              <option value={v} selected={v === (product?.vat_pct ?? 25)}>
                {v} %
              </option>
            ))}
          </select>
        </label>
        <label>
          Kategori
          <select name="category_id">
            <option value="">Uten kategori</option>
            {categories.map((k) => (
              <option value={k.id} selected={k.id === product?.category_id}>
                {k.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div class="row">
        <label>
          Varenummer (valgfritt)
          <input name="sku" maxlength={40} value={product?.sku ?? ""} />
        </label>
        <label>
          På lager (tomt = teller ikke)
          <input name="stock" inputmode="numeric" value={product?.stock != null ? String(product.stock) : ""} />
        </label>
      </div>
      <p class="muted price-sum" style="font-size:.88rem" />
      <button name="action" value="save">{product ? "Lagre" : "Opprett produkt"}</button>
      {product && (
        <>
          <button class="secondary" name="action" value={product.active ? "archive" : "restore"} style="margin-left:.5rem">
            {product.active ? "Arkiver" : "Gjenopprett"}
          </button>
          <a class="button secondary" href="/admin/products" style="margin-left:.5rem">
            Avbryt
          </a>
        </>
      )}
    </form>
  );
}

products.get("/products", async (c) => {
  // The menu's Produkter opens the ink register when only that is switched on.
  if (c.get("user").features?.products === false) return c.redirect(c.get("user").features?.inks === false ? "/admin/settings/features" : "/admin/inks");
  const cat = c.req.query("category") ?? "";
  const showArchived = c.req.query("archived") === "1";
  const [rows, categories] = await Promise.all([
    c.env.DB.prepare(`${PRODUCT_SELECT} WHERE p.active = ? ORDER BY pc.sort, pc.name, p.name`).bind(showArchived ? 0 : 1).all<Product>(),
    c.env.DB.prepare("SELECT pc.id, pc.name, (SELECT COUNT(*) FROM products p WHERE p.category_id = pc.id AND p.active = 1) AS n FROM product_categories pc ORDER BY pc.sort, pc.name").all<{ id: number; name: string; n: number }>(),
  ]);
  const list = rows.results.filter((p) => (cat === "" ? true : cat === "none" ? !p.category_id : p.category_id === Number(cat)));
  const edit = rows.results.find((p) => p.id === Number(c.req.query("edit")));
  const href = (k: string) => `/admin/products${k ? `?category=${k}` : ""}`;
  return c.html(
    <Layout title="Produkter" path="/admin/products" user={c.get("user")} {...msg(c)}>
      <PageHead title="Produkter" sub="Smykker, krem og annet studioet selger. Velg produktet i «Nytt salg», så får salget riktig MVA.">
        <a class="button secondary" href="#kategorier">
          Kategorier
        </a>
        <a class="button" href="#nytt">
          + Legg til produkt
        </a>
      </PageHead>
      <ProductTabs c={c} active="products" />
      <div class="toolbar">
        <span class="muted">Kategori</span>
        <SegTabs
          tabs={[
            { href: href(""), label: "Alle", count: rows.results.length },
            ...categories.results.map((k) => ({ href: href(String(k.id)), label: k.name, count: k.n })),
            { href: href("none"), label: "Uten kategori" },
          ]}
          active={href(cat)}
        />
        <a class="muted" style="margin-left:auto" href={showArchived ? "/admin/products" : "/admin/products?archived=1"}>
          {showArchived ? "Vis aktive" : "Vis arkiverte"}
        </a>
      </div>
      <div class="list">
        <table>
          <thead>
            <tr>
              <th>Produktnavn</th>
              <th>Kategori</th>
              <th class="num">MVA</th>
              <th class="num">Pris inkl. MVA</th>
              <th class="num">På lager</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {list.map((p) => (
              <tr>
                <td>
                  {p.name}
                  {p.sku && <span class="muted"> · {p.sku}</span>}
                </td>
                <td class="muted">{p.category ?? "Uten kategori"}</td>
                <td class="num">{p.vat_pct} %</td>
                <td class="num">{formatOre(p.price_ore)}</td>
                <td class="num">{p.stock == null ? <span class="muted">–</span> : p.stock <= 0 ? <span style="color:var(--warn)">{p.stock}</span> : p.stock}</td>
                <td class="num">
                  <a href={`/admin/products?edit=${p.id}#nytt`}>Rediger</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!list.length && (
          <Empty icon="products" text="Ingen produkter lagt til ennå">
            <a class="button" href="#nytt">
              Legg til produkt
            </a>
          </Empty>
        )}
      </div>

      <h2 id="nytt">{edit ? `Rediger ${edit.name}` : "Nytt produkt"}</h2>
      <ProductForm product={edit} categories={categories.results} />

      <h2 id="kategorier">Kategorier</h2>
      <div class="card">
        {categories.results.length === 0 ? (
          <p class="muted" style="margin-top:0">
            Ingen kategorier ennå. Lag den første for å gruppere produktene. Produkter uten kategori står under «Uten kategori».
          </p>
        ) : (
          <table style="margin-bottom:1rem">
            <tbody>
              {categories.results.map((k) => (
                <tr>
                  <td>
                    <form method="post" action={`/admin/products/categories/${k.id}`} style="display:flex;gap:.4rem">
                      <input name="name" value={k.name} maxlength={40} required style="max-width:260px" />
                      <button class="secondary small" name="action" value="rename">
                        Gi nytt navn
                      </button>
                      <button class="secondary small" name="action" value="delete" onclick="return confirm('Slette kategorien? Produktene blir stående uten kategori.')">
                        Slett
                      </button>
                    </form>
                  </td>
                  <td class="num muted">{k.n} produkter</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <form method="post" action="/admin/products/categories" style="display:flex;gap:.5rem">
          <input name="name" required maxlength={40} placeholder="Navn på ny kategori" style="max-width:300px" />
          <button>Legg til</button>
        </form>
      </div>
      <script dangerouslySetInnerHTML={{ __html: PRICE_JS }} />
    </Layout>,
  );
});

function productFields(body: Record<string, unknown>) {
  const name = str(body, "name").slice(0, 80);
  const price = parseKroner(str(body, "price"));
  const vat = Number(str(body, "vat_pct"));
  const stockText = str(body, "stock");
  const stock = stockText === "" ? null : Number(stockText);
  if (!name || price == null || price < 0 || !VAT_OPTIONS.includes(vat as never) || (stock != null && !Number.isInteger(stock))) return null;
  return { name, price, vat, stock, sku: str(body, "sku").slice(0, 40) || null, category: Number(str(body, "category_id")) || null };
}

products.use("/products/*", async (c, next) => {
  if (c.get("user").features?.products === false) return c.redirect("/admin/settings/features?error=Produkter+for+salg+er+slått+av");
  await next();
});

products.post("/products", async (c) => {
  const f = productFields(await c.req.parseBody());
  if (!f) return c.redirect("/admin/products?error=Sjekk+navn,+pris+og+MVA#nytt");
  const row = await c.env.DB.prepare("INSERT INTO products (category_id, name, price_ore, vat_pct, sku, stock) VALUES (?, ?, ?, ?, ?, ?) RETURNING id")
    .bind(f.category, f.name, f.price, f.vat, f.sku, f.stock)
    .first<{ id: number }>();
  await audit(c.env, c.get("user"), "create", "product", row!.id);
  return c.redirect(`/admin/products?ok=${encodeURIComponent(`${f.name} lagt til`)}`);
});

products.post("/products/categories", async (c) => {
  const name = str(await c.req.parseBody(), "name").slice(0, 40);
  if (!name) return c.redirect("/admin/products#kategorier");
  await c.env.DB.prepare("INSERT OR IGNORE INTO product_categories (name) VALUES (?)").bind(name).run();
  return c.redirect(`/admin/products?ok=${encodeURIComponent(`Kategorien ${name} er lagt til`)}#kategorier`);
});

products.post("/products/categories/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const body = await c.req.parseBody();
  if (str(body, "action") === "delete") {
    await c.env.DB.batch([
      c.env.DB.prepare("UPDATE products SET category_id = NULL WHERE category_id = ?").bind(id),
      c.env.DB.prepare("DELETE FROM product_categories WHERE id = ?").bind(id),
    ]);
    return c.redirect("/admin/products?ok=Kategorien+er+slettet#kategorier");
  }
  const name = str(body, "name").slice(0, 40);
  if (name) await c.env.DB.prepare("UPDATE OR IGNORE product_categories SET name = ? WHERE id = ?").bind(name, id).run();
  return c.redirect("/admin/products?ok=Lagret#kategorier");
});

products.post("/products/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const body = await c.req.parseBody();
  const action = str(body, "action");
  if (action === "archive" || action === "restore") {
    await c.env.DB.prepare("UPDATE products SET active = ? WHERE id = ?").bind(action === "restore" ? 1 : 0, id).run();
    return c.redirect(`/admin/products?ok=${action === "restore" ? "Gjenopprettet" : "Arkivert"}`);
  }
  const f = productFields(body);
  if (!f) return c.redirect(`/admin/products?edit=${id}&error=Sjekk+navn,+pris+og+MVA#nytt`);
  await c.env.DB.prepare("UPDATE products SET category_id = ?, name = ?, price_ore = ?, vat_pct = ?, sku = ?, stock = ? WHERE id = ?")
    .bind(f.category, f.name, f.price, f.vat, f.sku, f.stock, id)
    .run();
  await audit(c.env, c.get("user"), "update", "product", id);
  return c.redirect("/admin/products?ok=Lagret");
});
