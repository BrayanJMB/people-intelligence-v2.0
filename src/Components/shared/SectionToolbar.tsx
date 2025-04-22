import { IconPlus } from "@tabler/icons-react";

type SectionToolBarProps = {
  title: string;
  onAddClick?: () => void; // ⬅️ opcional
  buttonText?: string;
};

export const SectionToolbar = ({
  title,
  onAddClick,
  buttonText = "Crear",
}: SectionToolBarProps) => {
  return (
    <section className="flex justify-between items-center bg-white p-8 px-11 rounded-[20px]">
      <div>
        <h2 className="font-bold text-[22px]">{title}</h2>
      </div>
      {onAddClick && (
        <button onClick={onAddClick} className="btn btn-principal">
          <IconPlus />
          <span>{buttonText}</span>
        </button>
      )}
    </section>
  );
};
