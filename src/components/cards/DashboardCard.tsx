import Link from 'next/link';
import type { ReactElement } from 'react';
import type { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  href: string;
  title: string;
  subtitle: string;
  icon?: LucideIcon;
}

export default function DashboardCard({
  href,
  title,
  subtitle,
  icon: Icon,
}: DashboardCardProps): ReactElement {
  return (
    <Link
      href={href}
      data-component="dashboard-card"
      className="block rounded-xl border border-gray-200 bg-white p-6 transition-all duration-200 hover:border-yellow-400 hover:shadow-lg hover:ring-1 hover:ring-orange-500"
    >
      <div className="flex items-start gap-4">
        {Icon && (
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-purple-100">
            <Icon className="h-6 w-6 text-purple-600" />
          </div>
        )}
        <div className="flex-1 text-left">
          <h3 className="mb-1 text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>
      </div>
    </Link>
  );
}
