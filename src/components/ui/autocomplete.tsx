import { type ChangeEvent, type CSSProperties, type FC } from "react";

interface AutocompleteItem {
  label: string;
  value: string;
}

interface AutocompleteProps {
  value?: string;
  items: AutocompleteItem[];
  placeholder?: string;
  listId: string;
  className?: string;
  style?: CSSProperties;
  onSelect: (item: AutocompleteItem | null) => void;
  onChange?: (value: string) => void;
}

export const Autocomplete: FC<AutocompleteProps> = ({
  value,
  items,
  placeholder = "Setup name...",
  listId,
  className = "",
  style = {},
  onSelect,
  onChange,
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange?.(value);

    const selectedItem = items.find(
      (item) => item.value === value || item.label === value
    );
    if (selectedItem) {
      onSelect(selectedItem);
    } else {
      onSelect(null);
    }
  };

  return (
    <div className={`relative ${className}`} style={style}>
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        list={listId}
      />

      <datalist
        id={listId}
        className="bg-white rounded-md shadow-lg border border-gray-200"
      >
        {items.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </datalist>
    </div>
  );
};
