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
            <h2 className="text-2xl font-bold mb-2">Seven Stars Business Ecosystem (七星业务生态)</h2>
            <p className="opacity-80">Connecting premium content providers with global traffic channels. (连接优质内容提供商与全球流量渠道)</p>
        </div>

        {/* Ecosystem Flow Diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
            
            {/* 1. UPSTREAM: Content Providers */}
            <div className="lg:col-span-3 space-y-4">
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl h-full flex flex-col relative">
                    <div className="flex items-center gap-2 mb-4">
                        <Database className="text-emerald-600" />
                        <h3 className="font-bold text-emerald-900">Upstream (Content) / 上游（内容）</h3>
                    </div>
                    
                    <div className="flex-1 space-y-3">
                        <div className="bg-white p-3 rounded-lg border border-emerald-100 shadow-sm text-sm">
                            <span className="font-semibold block text-slate-700 mb-1">Short Drama Theaters (短剧剧场)</span>
                            <div className="flex flex-wrap gap-1">
                                {THEATER_DRAMA_LIST.slice(0, 6).map((t, i) => (
                                    <span key={i} className="text-xs bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded">{t.name}</span>
                                ))}
                                <span className="text-xs text-slate-400">+10 more (更多)</span>
                            </div>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-emerald-100 shadow-sm text-sm">
                            <span className="font-semibold block text-slate-700">Novel Platforms (小说平台)</span>
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
                        <p className="text-xs text-indigo-600 font-mono mt-1">HUB / AGGREGATION / SETTLEMENT (枢纽 / 聚合 / 结算)</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                         <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
                             <h4 className="font-bold text-slate-800 text-sm mb-2">Content Hub (内容中心)</h4>
                             <ul className="text-xs text-slate-500 space-y-1">
                                <li>• API Integration (接口对接)</li>
                                <li>• Material Distribution (素材分发)</li>
                                <li>• Link Generation (链接生成)</li>
                             </ul>
                         </div>
                         <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
                             <h4 className="font-bold text-slate-800 text-sm mb-2">Order System (订单系统)</h4>
                             <ul className="text-xs text-slate-500 space-y-1">
                                <li>• Real-time Sync (实时同步)</li>
                                <li>• Commission Calculation (佣金计算)</li>
                                <li>• Refund Processing (退款处理)</li>
                             </ul>
                         </div>
                         <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
                             <h4 className="font-bold text-slate-800 text-sm mb-2">Risk Control (风控系统)</h4>
                             <ul className="text-xs text-slate-500 space-y-1">
                                <li>• Anti-Piracy Check (防盗版检测)</li>
                                <li>• Reporting Validation (报备验证)</li>
                                <li>• Traffic Monitoring (流量监控)</li>
                             </ul>
                         </div>
                         <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
                             <h4 className="font-bold text-slate-800 text-sm mb-2">Settlement (结算系统)</h4>
                             <ul className="text-xs text-slate-500 space-y-1">
                                <li>• Multi-level Split (多级分润)</li>
                                <li>• Wallet System (钱包系统)</li>
                                <li>• Withdrawal Mgmt (提现管理)</li>
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
                        <h3 className="font-bold text-orange-900">Downstream (Traffic) / 下游（流量）</h3>
                    </div>

                    <div className="space-y-3 flex-1">
                        <div className="bg-white p-3 rounded-lg border border-orange-100 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-bold text-slate-700">Channels (渠道)</span>
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
                                <span className="text-sm font-bold text-slate-700">Participants (参与者)</span>
                                <Smartphone size={14} className="text-orange-400"/>
                            </div>
                            <ul className="text-xs text-slate-500 space-y-1">
                                <li>• Distributors (分销商)</li>
                                <li>• Team Leaders (团长)</li>
                                <li>• KOC/Influencers (达人)</li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-r from-orange-100 to-amber-100 p-3 rounded-lg border border-orange-200 text-center">
                            <span className="text-xs font-bold text-orange-800 uppercase">End Users (C端用户)</span>
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
            title: "Technical Architecture (技术架构)",
            color: "text-blue-600",
            bg: "bg-blue-50",
            items: [
                "High Concurrency API Handling (高并发接口处理)",
                "Real-time Order Synchronization (实时订单同步)",
                "Automated Reporting Verification (自动报备验证)",
                "Cross-border Server Deployment (跨境服务器部署)"
            ]
        },
        {
            icon: Layout,
            title: "Product Matrix (产品矩阵)",
            color: "text-purple-600",
            bg: "bg-purple-50",
            items: [
                "Influencer Dashboard (达人后台 Web/H5)",
                "Operations Admin Panel (运营管理后台)",
                "Link Generation Tools (转链工具)",
                "Data Visualization Charts (数据可视化图表)"
            ]
        },
        {
            icon: Zap,
            title: "Operational Support (运营支持)",
            color: "text-amber-600",
            bg: "bg-amber-50",
            items: [
                "24/7 Material Updates (7x24小时素材更新)",
                "Exclusive Drama Access (独家短剧接入)",
                "Traffic Strategy Guides (投放策略指南)",
                "Community Management (社群管理)"
            ]
        },
        {
            icon: Shield,
            title: "Security & Compliance (安全合规)",
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            items: [
                "Anti-Piracy Monitoring (防盗版监控)",
                "Link Domain Rotation (域名轮询)",
                "Risk Account Filtering (风险账号过滤)",
                "Transparent Settlement Logs (透明结算日志)"
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
