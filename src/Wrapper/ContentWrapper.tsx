"use client";

import { ReactNode } from "react";

const ContentWrapper = ({ children }: { children: ReactNode }) => {
  return <div className="flex px-4 py-14">{children}</div>;
};

export default ContentWrapper;
