// components/ui/breadcrumbs.tsx
import React from "react";
import Link from "next/link";
import { IoChevronForward } from "react-icons/io5";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="flex items-center text-sm text-gray-600">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <Link
            href={item.href}
            className="hover:text-blue-600 transition-colors"
          >
            {item.label}
          </Link>
          {index < items.length - 1 && (
            <IoChevronForward className="mx-2 text-gray-400" />
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
