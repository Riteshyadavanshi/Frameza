"use client";

import { useState } from "react";

export const Footer = () => {
  const [year] = useState(() => new Date(Date.now()).getFullYear());
  return (
    <footer className="w-screen p-4 bg-neutral-900 mt-4">
      <h1 className="text-white text-center">
        © {year} Frameza™. All Rights Reserved.
      </h1>
    </footer>
  );
};
