import React from 'react';
import { ArrowRight, Clock, DollarSign, Smartphone, Database, Globe } from 'lucide-react';

interface StepProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  actor: string;
  isLast?: boolean;
}

const FlowStep: React.FC<StepProps> = ({ title, subtitle, icon, actor, isLast }) => (
  <div className="flex flex-col items-center relative group min-w-[140px]">
    {/* Actor Badge */}
    <span className="mb-3 px-2 py-1 text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-100 rounded-full">
      {actor}
    </span>
    
    {/* Node */}
    <div className="w-full bg-white p-4 rounded-xl border-2 border-slate-200 shadow-sm flex flex-col items-center text-center z-10 transition-colors group-hover:border-indigo-400">
      <div className="mb-2 text-indigo-600">
        {icon || <Database size={20} />}
      </div>
      <h4 className="font-bold text-slate-800 text-sm whitespace-pre-line">{title}</h4>
      {subtitle && <p className="text-xs text-slate-500 mt-1 whitespace-pre-line">{subtitle}</p>}
    </div>

    {/* Connector Line */}
    {!isLast && (
      <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-slate-200 -z-0 transform -translate-y-1/2">
        <div className="absolute right-0 -top-1.5 text-slate-300">
          <ArrowRight size={16} />
        </div>
      </div>
    )}
    
    {/* Mobile Connector */}
    {!isLast && (
      <div className="md:hidden my-2 text-slate-300">
        <ArrowRight size={20} className="transform rotate-90" />
      </div>
    )}
  </div>
);

export const PromotionFlow: React.FC = () => {
  return (
    <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 overflow-x-auto">
      <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
        <Smartphone className="text-blue-500" /> Promotion Workflow (推广流程)
      </h3>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 min-w-[600px]">
        <FlowStep 
          actor="Theater (剧场方)" 
          title="Provide Content" 
          subtitle="Shorts, Novels (短剧/小说)"
          icon={<Database />}
        />
        <FlowStep 
          actor="Platform (七星)" 
          title="Receive & Display" 
          subtitle="Visualization (可视展示)"
          icon={<Globe />}
        />
        <FlowStep 
          actor="Influencer (达人)" 
          title="Get Link & Post" 
          subtitle="Overseas (海外平台发布)"
          icon={<Smartphone />}
        />
        <FlowStep 
          actor="Audience (观众)" 
          title="View & Recharge" 
          subtitle="Revenue (充值/收益)"
          icon={<DollarSign />}
          isLast
        />
      </div>
    </div>
  );
};

export const OrderFlow: React.FC = () => {
  return (
    <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 overflow-x-auto mt-6">
      <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
        <Clock className="text-orange-500" /> Order Sync Workflow (订单/资金流程)
      </h3>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 min-w-[600px]">
        <FlowStep 
          actor="Audience (观众)" 
          title="Recharge" 
          subtitle="Pay via Link (点击链接充值)"
          icon={<DollarSign />}
        />
        <FlowStep 
          actor="Theater (剧场方)" 
          title="Generate Order" 
          subtitle="Create Order (生成订单)"
          icon={<Database />}
        />
        <FlowStep 
          actor="Platform (七星)" 
          title="Fetch Orders" 
          subtitle="Cron: 10 mins (定时调接口)"
          icon={<Clock />}
        />
        <FlowStep 
          actor="Influencer (达人)" 
          title="View Earnings" 
          subtitle="In Wallet (进入钱包)"
          icon={<Smartphone />}
          isLast
        />
      </div>
    </div>
  );
};