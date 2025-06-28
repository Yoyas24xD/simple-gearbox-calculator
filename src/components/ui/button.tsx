import type { ComponentProps, FC } from "react";

interface Props extends ComponentProps<"button"> {
  flavor?: "primary" | "danger" | "secondary";
}

export const Button: FC<Props> = (props) => {
  const { flavor = "primary", ...rest } = props;
  const classNames = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    secondary: "bg-gray-500 hover:bg-gray-600 text-white",
  };
  return (
    <button
      className={`rounded px-2 py-1 text-white focus:outline-none focus:ring-2 ${classNames[flavor]}`}
      {...rest}
    >
      {rest.children}
    </button>
  );
};
