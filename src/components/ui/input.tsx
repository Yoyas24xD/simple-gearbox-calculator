import type { ComponentProps, FC } from "react";

export const Input: FC<ComponentProps<"input">> = (props) => {
  return (
    <input
      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
      {...props}
    />
  );
};
