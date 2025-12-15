import React from 'react';
import { REPORTING_STEPS } from '../constants';
import { ShieldCheck, AlertCircle, FilePlus } from 'lucide-react';

export const ReportingSection: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Intro */}
      <div className="bg-indigo-900 text-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Anti-Piracy & Reporting (报备)</h2>
        <p className="opacity-90 leading-relaxed max-w-3xl">
          The reporting mechanism is critical for theaters to combat piracy and unauthorized distribution. It tracks which account publishes to which media platform.
          <br/>
          (目的：剧场方打击盗版、超发素材，报备哪个账号在哪个媒体发布)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {REPORTING_STEPS.map((step, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-slate-800">{step.title}</h3>
                <span className={`px-2 py-1 text-xs rounded-full font-bold ${idx === 0 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {step.status}
                </span>
            </div>
            <p className="text-slate-600 mb-4">{step.desc}</p>
            <ul className="space-y-2">
                {step.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                        {detail}
                    </li>
                ))}
            </ul>
          </div>
        ))}
      </div>

      {/* New Theater Access */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center gap-2">
            <FilePlus className="text-indigo-600" />
            <h3 className="font-bold text-slate-800">New Theater Onboarding Checklist (新剧场接入注意事项)</h3>
        </div>
        <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex gap-4">
                    <div className="mt-1">
                        <ShieldCheck className="text-emerald-500" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-800">1. Reporting Status (确认报备)</h4>
                        <p className="text-sm text-slate-500 mt-1">Confirm whether the theater requires strict reporting before integration. (确认有无报备)</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="mt-1">
                        <AlertCircle className="text-blue-500" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-800">2. Commission Template (分佣模板)</h4>
                        <p className="text-sm text-slate-500 mt-1">Pre-confirm the split ratios (Templates) for the new theater. (提前确认好【分佣模板】的比例)</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="mt-1">
                        <FilePlus className="text-purple-500" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-800">3. API Integration (接口对接)</h4>
                        <p className="text-sm text-slate-500 mt-1">1 Drama = 1 Language = Unique ID. (一部剧对应一种语言，剧ID唯一)</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};