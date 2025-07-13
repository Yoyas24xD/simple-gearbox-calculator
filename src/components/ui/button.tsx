import type { ComponentProps, FC } from "react";

interface Props extends ComponentProps<"button"> {
  flavor?: "primary" | "danger" | "secondary" | "success";
}

export const Button: FC<Props> = (props) => {
  const { flavor = "primary", className, ...rest } = props;
  const classNames = {
    primary: "bg-indigo-700 hover:bg-indigo-800 text-white",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    success: "bg-green-500 hover:bg-green-600 text-white",
    secondary: "bg-cyan-800 hover:bg-cyan-900 text-white",
  };
  return (
    <button
      {...rest}
      className={`${className} rounded px-2 py-1 bg- focus:outline-none focus:ring-2 ${classNames[flavor]}`}
    >
      {rest.children}
    </button>
  );
};
