import React from "react";

interface PageHeaderProps {
  title: string;
  description: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-6 flex flex-col gap-1.5 z-10 relative">
      <p className="pageDescription">{description}</p>
      <h3 className="pageTitle">{title}</h3>
    </div>
  );
}
