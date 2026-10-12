import type { Env } from "../env";

/**
 * Instructions sent before an appointment (in the confirmation and the reminder) or after it (with
 * the aftercare email), like Linework's Settings → Instructions: up to 8, each with a name, timing,
 * email subject and an SMS line. Linework edits the content in a drag-and-drop email builder; we use
 * plain text. Which emails "before" instructions ride along with is a guess: PLACEHOLDER-RESCAN.
 */

export const MAX_INSTRUCTIONS = 8;

export type Instruction = {
  id: number;
  name: string;
  timing: "before" | "after";
  kinds: string | null;
  email_subject: string | null;
  body_no: string;
  body_en: string | null;
  sms_text: string | null;
  enabled: number;
  sort: number;
};

/** Starting points, like Linework's "Start with a template". */
export const TEMPLATES: Record<string, Omit<Instruction, "id" | "enabled" | "sort">> = {
  before_tattoo: {
    name: "Før tatovering",
    timing: "before",
    kinds: "tattoo",
    email_subject: "Slik forbereder du deg til tatoveringen",
    body_no:
      "Sov godt natten før, og spis et ordentlig måltid før du kommer.\nDrikk vann, og unngå alkohol dagen før og samme dag.\nHa på klær som gjør det lett å komme til stedet som skal tatoveres.\nSmør ikke inn huden med krem samme dag.\nEr du syk eller har feber, ring oss så finner vi en ny tid.",
    body_en:
      "Get a good night's sleep and eat a proper meal before you come.\nDrink water, and avoid alcohol the day before and on the day.\nWear clothes that give easy access to the area being tattooed.\nDon't put lotion on the skin on the day.\nIf you're ill or have a fever, call us and we'll find a new time.",
    sms_text: "Husk å spise godt og drikke vann før timen din hos Infinity Tattoo.",
  },
  after_tattoo: {
    name: "Etterbehandling tatovering",
    timing: "after",
    kinds: "tattoo",
    email_subject: "Etterbehandling av tatoveringen din",
    body_no:
      "Ta av plasten etter 2–4 timer og vask forsiktig med lunkent vann og mild såpe.\nLa huden lufttørke, og smør et tynt lag med krem 2–3 ganger om dagen.\nIkke klø eller pill på skorper.\nUnngå bading, badstue og sol i to uker.\nSpør oss gjerne hvis noe ser rart ut.",
    body_en:
      "Remove the wrap after 2–4 hours and wash gently with lukewarm water and mild soap.\nLet the skin air dry, then apply a thin layer of cream 2–3 times a day.\nDon't scratch or pick at scabs.\nAvoid swimming, sauna and sun for two weeks.\nAsk us if anything looks off.",
    sms_text: "Ta godt vare på den nye tatoveringen! Følg etterbehandlingen for best mulig tilheling.",
  },
  after_piercing: {
    name: "Etterbehandling piercing",
    timing: "after",
    kinds: "piercing",
    email_subject: "Etterbehandling av piercingen din",
    body_no:
      "Rens 2 ganger om dagen med saltvann, og ikke vri på smykket.\nVask hendene før du tar på piercingen.\nUnngå bading i basseng og sjø de første ukene.\nIkke bytt smykke før den er grodd. Kom innom hvis du er usikker.",
    body_en:
      "Clean twice a day with saline and don't twist the jewellery.\nWash your hands before touching the piercing.\nAvoid pools and the sea for the first weeks.\nDon't change the jewellery until it has healed. Drop by if you're unsure.",
    sms_text: "Husk å rense piercingen med saltvann 2 ganger om dagen.",
  },
};

export const TIMING_LABELS = { before: "Før timen", after: "Etter timen" } as const;

/** Pure: the enabled instructions that apply to a service kind and timing. Exported for tests. */
export function pickInstructions(rows: Instruction[], kind: string, timing: "before" | "after"): Instruction[] {
  return rows
    .filter((r) => r.enabled && r.timing === timing && (!r.kinds || r.kinds.split(",").includes(kind)))
    .sort((a, b) => a.sort - b.sort || a.id - b.id);
}

export async function instructionsFor(env: Env, kind: string, timing: "before" | "after"): Promise<Instruction[]> {
  const rows = (await env.DB.prepare("SELECT * FROM instructions WHERE enabled = 1").all<Instruction>()).results;
  return pickInstructions(rows, kind, timing);
}

/** The text block that goes into an email, in the client's language. */
export function instructionText(rows: Instruction[], lang: "no" | "en"): string {
  return rows.map((r) => `${r.email_subject || r.name}\n${(lang === "en" && r.body_en) || r.body_no}`).join("\n\n");
}
