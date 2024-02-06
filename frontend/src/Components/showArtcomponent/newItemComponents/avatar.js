// avatar.js
import React from "react";

export function AvatarImage({ alt, src }) {
  return <img alt={alt} src={src} />;
}

export function AvatarFallback({ children }) {
  return <div>{children}</div>;
}

export function Avatar({ children }) {
  return <div>{children}</div>;
}
