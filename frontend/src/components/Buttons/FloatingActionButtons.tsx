import React from "react";
import Button from "./Button";
import styles from "./FloatingActionButtons.module.css";

interface FloatingAction {
  label: string;
  variant:   
  | "blue"
  | "green"
  | "purple"
  | "red"
  | "gray";
  onClick: () => void;
}

interface FloatingActionButtonsProps {
  actions: FloatingAction[];
  position?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
}

export default function FloatingActionButtons({ 
  actions, 
  position = "bottom-left" 
}: FloatingActionButtonsProps) {
  return (
    <div className={`${styles.container} ${styles[position]}`}>
      {actions.map((action, index) => (
        <Button
          key={index}
          variant={action.variant}
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
}