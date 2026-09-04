import React from "react";

export interface CardProps {
  /** drives the per-card CSS in app/cards.css via [data-card] */
  card: string;
  variant?: "white" | "image" | "hero";
  href?: string;
  /** stagger position for the entrance animation */
  index?: number;
  /** show the hover arrow affordance (links only, by default) */
  arrow?: boolean;
  ariaLabel?: string;
  children: React.ReactNode;
}

function Arrow() {
  return (
    <span className="card-arrow" aria-hidden>
      <svg viewBox="0 0 24 24" width="55%" height="55%" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="7" y1="17" x2="17" y2="7" />
        <polyline points="7 7 17 7 17 17" />
      </svg>
    </span>
  );
}

/**
 * Shared card shell: rounded surface, gradient hairline border, entrance
 * stagger, and the hover arrow that links cards get.
 */
export default function Card({
  card,
  variant = "white",
  href,
  index = 0,
  arrow,
  ariaLabel,
  children,
}: CardProps) {
  const style = { "--card-i": index } as React.CSSProperties;
  const showArrow = arrow ?? Boolean(href);

  if (href) {
    const external = href.startsWith("http") || href.startsWith("mailto:");
    return (
      <a
        className="card card-link"
        data-card={card}
        data-variant={variant}
        style={style}
        href={href}
        aria-label={ariaLabel}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer noopener" : undefined}
      >
        {children}
        {showArrow && <Arrow />}
      </a>
    );
  }

  return (
    <div className="card" data-card={card} data-variant={variant} style={style} aria-label={ariaLabel}>
      {children}
      {showArrow && <Arrow />}
    </div>
  );
}
