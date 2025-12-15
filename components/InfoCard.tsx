import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InfoCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  colorClass: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, description, icon: Icon, colorClass }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${colorClass}`}>
        <Icon size={24} />
      </div>
      <h3 className="text-lg font-semibold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
};