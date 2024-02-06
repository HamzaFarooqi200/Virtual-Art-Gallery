// dropdown-menu.js
import React from "react";

export function DropdownMenuTrigger({ children }) {
  return <div>{children}</div>;
}

export function DropdownMenuItem({ children }) {
  return <div>{children}</div>;
}

export function DropdownMenuSeparator() {
  return <div className="dropdown-separator"></div>;
}

export function DropdownMenuContent({ align, children }) {
  return <div style={{ textAlign: align }}>{children}</div>;
}

export function DropdownMenu({ children }) {
  return <div>{children}</div>;
}
