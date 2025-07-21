import type { FC } from "react";

export const Divider: FC<{ vertical?: boolean }> = ({ vertical = false }) => {
  if (vertical) {
    return (
      <hr
        className="
          border-l-2
          border-gray-300
          dark:border-gray-600
          h-full
          mx-2
          min-h-[30px]"
      />
    );
  }
  return (
    <hr
      className="
        border-t-2
        border-gray-300
        dark:border-gray-600
        my-4
        w-full
      "
    />
  );
};
