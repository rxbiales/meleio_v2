"use client";

type TimelineTabsProps = {
  value: "pulso" | "competencias";
  onChange: (next: "pulso" | "competencias") => void;
};

const ITEMS: Array<{
  key: "pulso" | "competencias";
  label: string;
  description: string;
}> = [
  {
    key: "pulso",
    label: "Pulso",
    description: "Oscilacoes semanais do pulso SEL",
  },
  {
    key: "competencias",
    label: "Competencias",
    description: "Linhas e radar das quatro competencias",
  },
];

export function TimelineTabs({ value, onChange }: TimelineTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Alternar visualizacao da timeline"
      className="inline-flex overflow-hidden rounded-full border border-purple-100 bg-purple-50/60 p-1"
    >
      {ITEMS.map((item) => {
        const active = value === item.key;
        return (
          <button
            key={item.key}
            type="button"
            role="tab"
            aria-selected={active}
            aria-label={item.description}
            onClick={() => onChange(item.key)}
            className={[
              "rounded-full px-4 py-1.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 lg:px-6 lg:py-2 lg:text-base",
              active
                ? "bg-white text-purple-700 shadow-sm"
                : "text-purple-500 hover:bg-white/60",
            ].join(" ")}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
