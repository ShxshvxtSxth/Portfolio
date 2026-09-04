import React from "react";
import Card from "./Card";
import { profile } from "@/lib/profile";

/**
 * Counter by default; hovering swaps in the featured certificate and a shine
 * sweeps across the card while the signature draws itself. Clicking opens the
 * certificate PDF.
 */
export default function CertificateCard({ index }: { index?: number }) {
  const { count, label, featured } = profile.certifications;

  return (
    <Card
      card="certificate"
      href={featured.file}
      index={index}
      ariaLabel={`${featured.issuer} certificate: ${featured.program}`}
    >
      <svg className="cert-badge" viewBox="0 0 24 24" aria-hidden>
        <circle cx="12" cy="12" r="11" fill="#1d9bf0" />
        <path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <div className="cert-state cert-default">
        <div className="cert-lines" aria-hidden>
          <span className="cert-line" />
          <span className="cert-line" style={{ width: "78%" }} />
          <span className="cert-line" style={{ width: "88%" }} />
        </div>

        <span className="cert-value">{count}</span>
        <span className="cert-label">{label}</span>

        <svg className="cert-sig" viewBox="0 0 120 30" fill="none" aria-hidden>
          <path
            d="M4 22c10-16 16-16 20-6s8 12 14 2 10-14 16-6 10 12 18 4 14-10 18-6"
            stroke="#171717"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="cert-state cert-detail">
        <span className="cert-issuer">{featured.issuer}</span>
        <span className="cert-program">{featured.program}</span>
        <span className="cert-dept">{featured.department}</span>
        <span className="cert-period">
          {featured.mode} · {featured.period}
        </span>
        <span className="cert-meta">{featured.meta}</span>
      </div>

      <span className="cert-shine" aria-hidden />
    </Card>
  );
}
