import { useState, type ChangeEvent, type CSSProperties, type FC } from "react";

interface AutocompleteItem {
  id: string | number;
  label: string;
  value: string;
}

interface AutocompleteProps {
  items: AutocompleteItem[];
  onSelect: (item: AutocompleteItem | null) => void;
  placeholder?: string;
  listId: string;
  className?: string;
  style?: CSSProperties;
}

export const Autocomplete: FC<AutocompleteProps> = ({
  items,
  onSelect,
  placeholder = "Buscar o seleccionar...",
  listId,
  className = "",
  style = {},
}) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

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
        value={inputValue}
        onChange={handleInputChange}
        list={listId}
      />

      <datalist
        id={listId}
        className="bg-white rounded-md shadow-lg border border-gray-200"
      >
        {items.map((item) => (
          <option key={item.id} value={item.value}>
            {item.label}
          </option>
        ))}
      </datalist>
    </div>
  );
};
