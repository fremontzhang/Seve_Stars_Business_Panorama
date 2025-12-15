import React, { useState } from 'react';
import { Layers, Globe, Zap, Shield, Database, Smartphone, Users, CreditCard, ArrowRight, Server, Layout } from 'lucide-react';
import { THEATER_DRAMA_LIST } from '../constants';

export const BusinessPanorama: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ecosystem' | 'capabilities'>('ecosystem');

  return (
    <div className="space-y-6">
      <div className="flex gap-4 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('ecosystem')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'ecosystem' ? 'bg-indigo-100 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Globe size={16} />
          Ecosystem Map (生态全景)
        </button>
        <button
          onClick={() => setActiveTab('capabilities')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'capabilities' ? 'bg-indigo-100 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Layers size={16} />
          Core Capabilities (核心能力)
        </button>
      </div>

      <div className="animate-fade-in">
        {activeTab === 'ecosystem' ? <EcosystemView /> : <CapabilitiesView />}
      </div>
    </div>
  );
};

const EcosystemView: React.FC = () => {
  return (
    <div className="space-y-8">
        <div className="bg-indigo-900 text-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-2">Seven Stars Business Ecosystem</h2>
            <p className="opacity-80">Connecting premium content providers with global traffic channels.</p>
        </div>

        {/* Ecosystem Flow Diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
            
            {/* 1. UPSTREAM: Content Providers */}
            <div className="lg:col-span-3 space-y-4">
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl h-full flex flex-col relative">
                    <div className="flex items-center gap-2 mb-4">
                        <Database className="text-emerald-600" />
                        <h3 className="font-bold text-emerald-900">Upstream (Content)</h3>
                    </div>
                    
                    <div className="flex-1 space-y-3">
                        <div className="bg-white p-3 rounded-lg border border-emerald-100 shadow-sm text-sm">
                            <span className="font-semibold block text-slate-700 mb-1">Short Drama Theaters</span>
                            <div className="flex flex-wrap gap-1">
                                {THEATER_DRAMA_LIST.slice(0, 6).map((t, i) => (
                                    <span key={i} className="text-xs bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded">{t.name}</span>
                                ))}
                                <span className="text-xs text-slate-400">+10 more</span>
                            </div>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-emerald-100 shadow-sm text-sm">
                            <span className="font-semibold block text-slate-700">Novel Platforms</span>
                            <span className="text-xs text-slate-500">NovelShort, GoodNovel...</span>
                        </div>
                    </div>
                    
                    {/* Connector Arrow */}
                    <div className="hidden lg:flex absolute top-1/2 -right-6 text-slate-300 z-10">
                        <ArrowRight size={24} />
                    </div>
                </div>
            </div>

            {/* 2. MIDSTREAM: Platform */}
            <div className="lg:col-span-6">
                <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-xl h-full relative">
                    <div className="text-center mb-6">
                        <h3 className="text-xl font-extrabold text-indigo-900 uppercase tracking-widest">Seven Stars Platform (七星)</h3>
                        <p className="text-xs text-indigo-600 font-mono mt-1">HUB / AGGREGATION / SETTLEMENT</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                         <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
                             <h4 className="font-bold text-slate-800 text-sm mb-2">Content Hub</h4>
                             <ul className="text-xs text-slate-500 space-y-1">
                                <li>• API Integration</li>
                                <li>• Material Distribution</li>
                                <li>• Link Generation</li>
                             </ul>
                         </div>
                         <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
                             <h4 className="font-bold text-slate-800 text-sm mb-2">Order System</h4>
                             <ul className="text-xs text-slate-500 space-y-1">
                                <li>• Real-time Sync</li>
                                <li>• Commission Calculation</li>
                                <li>• Refund Processing</li>
                             </ul>
                         </div>
                         <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
                             <h4 className="font-bold text-slate-800 text-sm mb-2">Risk Control</h4>
                             <ul className="text-xs text-slate-500 space-y-1">
                                <li>• Anti-Piracy Check</li>
                                <li>• Reporting Validation</li>
                                <li>• Traffic Monitoring</li>
                             </ul>
                         </div>
                         <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
                             <h4 className="font-bold text-slate-800 text-sm mb-2">Settlement</h4>
                             <ul className="text-xs text-slate-500 space-y-1">
                                <li>• Multi-level Split</li>
                                <li>• Wallet System</li>
                                <li>• Withdrawal Mgmt</li>
                             </ul>
                         </div>
                    </div>

                    {/* Connector Arrow */}
                    <div className="hidden lg:flex absolute top-1/2 -right-6 text-slate-300 z-10">
                        <ArrowRight size={24} />
                    </div>
                </div>
            </div>

            {/* 3. DOWNSTREAM: Distribution */}
            <div className="lg:col-span-3 space-y-4">
                <div className="bg-orange-50 border border-orange-200 p-4 rounded-xl h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                        <Users className="text-orange-600" />
                        <h3 className="font-bold text-orange-900">Downstream (Traffic)</h3>
                    </div>

                    <div className="space-y-3 flex-1">
                        <div className="bg-white p-3 rounded-lg border border-orange-100 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-bold text-slate-700">Channels</span>
                                <Globe size={14} className="text-orange-400"/>
                            </div>
                            <div className="flex gap-2 text-xs text-slate-500">
                                <span className="bg-slate-100 px-2 py-1 rounded">TikTok</span>
                                <span className="bg-slate-100 px-2 py-1 rounded">FB</span>
                                <span className="bg-slate-100 px-2 py-1 rounded">YouTube</span>
                            </div>
                        </div>

                        <div className="bg-white p-3 rounded-lg border border-orange-100 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-bold text-slate-700">Participants</span>
                                <Smartphone size={14} className="text-orange-400"/>
                            </div>
                            <ul className="text-xs text-slate-500 space-y-1">
                                <li>• Distributors (分销商)</li>
                                <li>• Team Leaders (团长)</li>
                                <li>• KOC/Influencers (达人)</li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-r from-orange-100 to-amber-100 p-3 rounded-lg border border-orange-200 text-center">
                            <span className="text-xs font-bold text-orange-800 uppercase">End Users</span>
                            <div className="flex justify-center mt-1">
                                <CreditCard size={16} className="text-orange-600"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

const CapabilitiesView: React.FC = () => {
    const capabilities = [
        {
            icon: Server,
            title: "Technical Architecture",
            color: "text-blue-600",
            bg: "bg-blue-50",
            items: [
                "High Concurrency API Handling",
                "Real-time Order Synchronization",
                "Automated Reporting Verification",
                "Cross-border Server Deployment"
            ]
        },
        {
            icon: Layout,
            title: "Product Matrix",
            color: "text-purple-600",
            bg: "bg-purple-50",
            items: [
                "Influencer Dashboard (Web/H5)",
                "Operations Admin Panel",
                "Link Generation Tools",
                "Data Visualization Charts"
            ]
        },
        {
            icon: Zap,
            title: "Operational Support",
            color: "text-amber-600",
            bg: "bg-amber-50",
            items: [
                "24/7 Material Updates",
                "Exclusive Drama Access",
                "Traffic Strategy Guides",
                "Community Management"
            ]
        },
        {
            icon: Shield,
            title: "Security & Compliance",
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            items: [
                "Anti-Piracy Monitoring",
                "Link Domain Rotation",
                "Risk Account Filtering",
                "Transparent Settlement Logs"
            ]
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {capabilities.map((cap, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${cap.bg}`}>
                        <cap.icon size={24} className={cap.color} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-4">{cap.title}</h3>
                    <ul className="space-y-3">
                        {cap.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <div className={`mt-1.5 w-1.5 h-1.5 rounded-full ${cap.color.replace('text-', 'bg-')}`}></div>
                                <span className="text-sm text-slate-600">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
