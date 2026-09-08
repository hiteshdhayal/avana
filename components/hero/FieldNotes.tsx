import type { FieldNote } from "@/content/types";

/**
 * The measured column at the right of the hero (spec 6.2). Switzer with
 * tabular figures, each note sitting on a 1px stone rule that draws
 * left-to-right during the load sequence.
 */
export function FieldNotes({ notes }: { notes: FieldNote[] }) {
  if (!notes.length) return null;

  return (
    <dl className="w-full max-w-xs">
      {notes.map((note, i) => (
        <div
          key={note.label}
          className="hero-note relative pt-3 pb-3"
          style={{ ["--i" as string]: i }}
        >
          <span
            aria-hidden="true"
            className="hero-note-rule absolute inset-x-0 top-0 block h-px bg-[var(--rule)]"
            style={{ ["--i" as string]: i }}
          />
          <div className="flex items-baseline justify-between gap-4">
            <dt className="font-sans text-caption text-[var(--fg-muted)]">
              {note.label}
            </dt>
            <dd className="tnum font-sans text-body font-medium text-[var(--fg-strong)]">
              {note.value}
            </dd>
          </div>
        </div>
      ))}
    </dl>
  );
}
