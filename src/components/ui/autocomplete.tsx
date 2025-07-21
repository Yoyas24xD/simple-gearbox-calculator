import { useState, type ChangeEvent, type CSSProperties, type FC } from "react";

interface AutocompleteItem {
  label: string;
  value: string;
}

interface AutocompleteProps {
  value?: string;
  items: AutocompleteItem[];
  placeholder?: string;
  className?: string;
  style?: CSSProperties;
  onSelect: (item: AutocompleteItem | null) => void;
  onChange?: (value: string) => void;
}

export const Autocomplete: FC<AutocompleteProps> = ({
  value,
  items,
  placeholder = "Select an option",
  className = "",
  style = {},
  onSelect,
  onChange,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [filteredItems, setFilteredItems] = useState<AutocompleteItem[]>(items);
  console.log({ filteredItems });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange?.(value);

    setFilteredItems((prevItems) =>
      prevItems.filter((item) =>
        item.label.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <article className={`relative ${className}`} style={style}>
      <input
        type="text"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 ease-in-out"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        onFocus={() => setShowOptions(true)}
        onBlur={() => setTimeout(() => setShowOptions(false), 100)}
        autoComplete="off"
      />
      {showOptions && filteredItems.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg shadow-xl mt-1 max-h-60 overflow-y-auto">
          {filteredItems.map((item) => (
            <option
              key={item.value}
              value={item.value}
              className="p-3 text-gray-800 hover:bg-indigo-50 hover:text-indigo-700 cursor-pointer"
              onClick={() => onSelect(item)}
            >
              {item.label}
            </option>
          ))}
        </ul>
      )}
    </article>
  );
};
