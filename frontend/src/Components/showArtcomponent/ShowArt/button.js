// button.js
import React from "react";

export function Button({ children, className, size, variant }) {
  return <button className={className}>{children}</button>;
}
