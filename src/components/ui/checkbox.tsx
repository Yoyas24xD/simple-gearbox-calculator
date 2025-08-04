import type { FC } from "react";

interface Props {
  checked: boolean;
  onChange: (checked: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;

  className?: string;
}
export const Checkbox: FC<Props> = ({
  checked,
  onChange,
  label,
  className,
}) => {
  return (
    <label className={`flex items-center gap-2 cursor-pointer ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />
      {label && (
        <span className="text-sm text-gray-700 dark:text-gray-300">
          {label}
        </span>
      )}
    </label>
  );
};
