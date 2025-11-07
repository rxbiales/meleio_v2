"use client";

type PeriodSelectorProps = {
  value: "4w" | "8w" | "12w" | "6m";
  onChange: (next: "4w" | "8w" | "12w" | "6m") => void;
};

const OPTIONS: Array<{
  key: "4w" | "8w" | "12w" | "6m";
  label: string;
  aria: string;
}> = [
  { key: "4w", label: "4 semanas", aria: "Ultimas quatro semanas" },
  { key: "8w", label: "8 semanas", aria: "Ultimas oito semanas" },
  { key: "12w", label: "12 semanas", aria: "Ultimas doze semanas" },
  { key: "6m", label: "6 meses", aria: "Ultimos seis meses" },
];

export function PeriodSelector({ value, onChange }: PeriodSelectorProps) {
  return (
    <div
      className="flex items-center gap-1 rounded-full border border-purple-100 bg-white/80 p-1"
      role="group"
      aria-label="Selecionar periodo da serie historica"
    >
      {OPTIONS.map((option) => {
        const active = value === option.key;
        return (
          <button
            key={option.key}
            type="button"
            aria-pressed={active}
            aria-label={option.aria}
            onClick={() => onChange(option.key)}
            className={[
              "rounded-full px-3 py-1 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 lg:px-4 lg:py-1.5 lg:text-sm",
              active
                ? "bg-purple-600 text-white shadow-sm"
                : "text-gray-600 hover:bg-purple-50",
            ].join(" ")}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
