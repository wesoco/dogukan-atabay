import Link from "next/link";
import type { Service } from "@/lib/content";
import { getServiceIcon } from "@/components/ServiceIcons";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = getServiceIcon(service.slug);
  return (
    <article className="service-card">
      <div className="service-card-body">
        <div className="service-card-header">
          <span className="service-icon" aria-hidden="true">
            <Icon />
          </span>
          <h2 className="service-card-title">{service.title}</h2>
        </div>
        <p>{service.excerpt}</p>
        <Link href={`/hizmetler/${service.slug}`} className="service-card-link">Detaylı bilgi <span className="service-link-arrow">→</span></Link>
      </div>
    </article>
  );
}
