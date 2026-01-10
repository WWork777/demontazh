import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { ReactNode } from "react";

interface Props {
  disabled?: boolean;
  className?: string;
  text?: string;
  link?: string;
  icon?: ReactNode;
  children?: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  target?: "_blank" | "_self"; // optional
  rel?: string; // optional
}

export const Button: React.FC<Props> = ({
  className,
  children,
  text,
  link,
  icon,
  onClick,
  type = "button",
  target,
  rel,
}) => {
  const content = (
    <>
      {icon || children}
      {text && <span>{text}</span>}
    </>
  );

  const classes = cn("flex items-center justify-center gap-2", className);

  if (link) {
    const isExternal =
      link.startsWith("tel:") ||
      link.startsWith("mailto:") ||
      link.startsWith("http://") ||
      link.startsWith("https://");

    if (isExternal) {
      return (
        <a href={link} className={classes} target={target} rel={rel}>
          {content}
        </a>
      );
    }

    return (
      <Link href={link} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} onClick={onClick} type={type} disabled={false}>
      {content}
    </button>
  );
};
