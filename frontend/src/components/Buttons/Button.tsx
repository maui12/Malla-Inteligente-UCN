import React from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Button.module.css";

type ButtonVariant =
  | "blue"
  | "green"
  | "purple"
  | "red"
  | "gray";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  to?: string;
  variant?: ButtonVariant;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

export default function Button({
  children,
  to,
  onClick,
  variant = "blue",
  iconLeft,
  iconRight,
  ...rest
}: ButtonProps) {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(e);
    if (to) navigate(to);
  };

  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      onClick={handleClick}
      {...rest}
    >
      {iconLeft && <span className={styles.icon}>{iconLeft}</span>}
      <span>{children}</span>
      {iconRight && <span className={styles.icon}>{iconRight}</span>}
    </button>
  );
}
