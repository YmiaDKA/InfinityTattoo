"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import {
  ImageIcon,
  ImagePlusIcon,
  Trash2Icon,
} from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type WorkItem = {
  id: string;
  image: string;
  tag: string;
  title: string;
};

const tags = ["Realism", "Vector", "Custom"];
const storageKey = "infinity-admin-work-items";

export function AdminWorkEditor() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [hasLoadedItems, setHasLoadedItems] = useState(false);
  const [items, setItems] = useState<WorkItem[]>([]);
  const [tag, setTag] = useState(tags[0]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const savedItems = window.localStorage.getItem(storageKey);

      if (savedItems) {
        try {
          const parsedItems = JSON.parse(savedItems) as WorkItem[];

          if (Array.isArray(parsedItems)) {
            setItems(parsedItems);
          }
        } catch {
          window.localStorage.removeItem(storageKey);
        }
      }

      setHasLoadedItems(true);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (hasLoadedItems) {
      window.localStorage.setItem(storageKey, JSON.stringify(items));
    }
  }, [hasLoadedItems, items]);

  function handleAddItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const file = fileInputRef.current?.files?.[0];

    if (!file) {
      setError("Choose an image first");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setItems((currentItems) => [
        {
          id: crypto.randomUUID(),
          image: String(reader.result),
          tag,
          title: title.trim() || file.name.replace(/\.[^.]+$/, ""),
        },
        ...currentItems,
      ]);
      setError("");
      setTitle("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };

    reader.readAsDataURL(file);
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="bg-card/70">
        <CardHeader>
          <div className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <ImagePlusIcon className="size-5" />
          </div>
          <CardTitle className="font-display text-4xl">Work editor</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-5" onSubmit={handleAddItem}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="tattoo-title">Tattoo title</FieldLabel>
                <Input
                  className="h-11 rounded-full px-4"
                  id="tattoo-title"
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Black and grey sleeve"
                  value={title}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="tattoo-tag">Tag</FieldLabel>
                <select
                  className="h-11 rounded-full border border-input bg-background/60 px-4 text-sm outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  id="tattoo-tag"
                  onChange={(event) => setTag(event.target.value)}
                  value={tag}
                >
                  {tags.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </Field>
              <Field>
                <FieldLabel htmlFor="tattoo-image">Image</FieldLabel>
                <Input
                  accept="image/*"
                  className="h-11 rounded-full px-4"
                  id="tattoo-image"
                  ref={fileInputRef}
                  type="file"
                />
              </Field>
            </FieldGroup>
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            <button
              className={buttonVariants({ className: "w-fit rounded-full" })}
              type="submit"
            >
              Add tattoo
            </button>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        {items.length ? (
          items.map((item) => (
            <Card className="overflow-hidden bg-card/70" key={item.id}>
              <div className="relative aspect-[4/5] bg-background">
                {/* Uploaded previews are saved in this browser until shared storage is added. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={item.title}
                  className="size-full object-cover"
                  src={item.image}
                />
              </div>
              <CardContent className="flex items-center justify-between gap-4 p-4">
                <div>
                  <p className="font-medium text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.tag}</p>
                </div>
                <Button
                  aria-label={`Remove ${item.title}`}
                  className="rounded-full"
                  onClick={() =>
                    setItems((currentItems) =>
                      currentItems.filter((currentItem) => currentItem.id !== item.id)
                    )
                  }
                  size="icon"
                  type="button"
                  variant="outline"
                >
                  <Trash2Icon className="size-4" />
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="bg-card/70 sm:col-span-2">
            <CardContent className="flex items-center gap-3 p-6 text-muted-foreground">
              <ImageIcon className="size-5 text-[color:var(--studio-red)]" />
              No tattoos saved in this browser yet.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
