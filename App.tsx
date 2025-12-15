import React, { useState } from 'react';
import { NAV_ITEMS, ROLES } from './constants';
import { InfoCard } from './components/InfoCard';
import { PromotionFlow, OrderFlow } from './components/FlowDiagram';
import { CommissionCalculator } from './components/CommissionCalculator';
import { ReportingSection } from './components/ReportingSection';
import { TheaterAccess } from './components/TheaterAccess';
import { LayoutDashboard, Menu, X } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('intro');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'intro':
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-8 text-white shadow-lg">
              <h1 className="text-3xl font-bold mb-2">Seven Stars (七星)</h1>
              <p className="text-indigo-100 text-lg">Short Drama Promotion Ecosystem (短剧推广生态)</p>
              <p className="mt-4 max-w-2xl text-sm opacity-80 leading-relaxed">
                A platform connecting influencers with drama content. Influencers promote short dramas and novels to earn commissions, while the platform handles orders, tracking, and complex settlement splits.
                (七星是短剧推广平台，达人通过推广短剧、小说来获取收益。涵盖推广、订单、结算全流程。)
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-4">Core Ecosystem Roles (核心角色)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {ROLES.map((role, idx) => (
                  <InfoCard 
                    key={idx}
                    title={role.title}
                    description={role.desc}
                    icon={role.icon}
                    colorClass={role.color}
                  />
                ))}
              </div>
            </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200">
                    <h3 className="font-bold text-lg mb-2 text-slate-800">Promotion (推广)</h3>
                    <p className="text-slate-500 text-sm">Influencers gain revenue by promoting content links externally. (达人通过推广获取收益)</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200">
                    <h3 className="font-bold text-lg mb-2 text-slate-800">Orders (订单)</h3>
                    <p className="text-slate-500 text-sm">Transparent tracking of earnings for influencers. (达人了解自己的收益)</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200">
                    <h3 className="font-bold text-lg mb-2 text-slate-800">Settlement (结算)</h3>
                    <p className="text-slate-500 text-sm">Automated commission splitting between theaters, platform, distributors, and users. (达人、分销商、平台之间分佣)</p>
                </div>
             </div>
          </div>
        );
      case 'flows':
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-800">Operational Workflows (业务流程)</h2>
            </div>
            <PromotionFlow />
            <OrderFlow />
            <div className="bg-orange-50 p-6 rounded-xl border border-orange-200 mt-6">
                <h3 className="text-orange-800 font-bold mb-2">Settlement Note (结算说明)</h3>
                <p className="text-orange-700 text-sm">
                    Settlements involve a strict calculation waterfall: User Pay -> Channel Fee -> Theater Share -> Distributor Share -> Team Share -> Individual.
                    <br/>
                    (分佣流程：观众支付 -> 扣除通道费 -> 剧场分成 -> 分销商金额 -> 团队分成 -> 个人/团长。详见 <strong>佣金计算</strong> 页面)
                </p>
            </div>
          </div>
        );
      case 'access':
        return (
          <div className="animate-fade-in">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Theater & Content Access (剧场接入总览)</h2>
              <p className="text-slate-500">Status tracking for upstream content providers, dramas, and novels. (上游内容剧场接入、短剧与小说状态梳理)</p>
            </div>
            <TheaterAccess />
          </div>
        );
      case 'calculator':
        return (
          <div className="animate-fade-in">
             <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Commission Settlement Engine (佣金结算引擎)</h2>
                <p className="text-slate-500">Calculate precise revenue splits based on the platform's truncate-to-two-decimals logic. (基于"小数点后两位截断"逻辑的精确分佣计算)</p>
             </div>
            <CommissionCalculator />
          </div>
        );
      case 'onboarding':
        return (
            <div className="animate-fade-in">
                <ReportingSection />
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-slate-200 p-4 flex justify-between items-center sticky top-0 z-20">
        <div className="flex items-center gap-2">
            <LayoutDashboard className="text-indigo-600" />
            <span className="font-bold text-slate-800">Seven Stars (七星)</span>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-600">
            {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`fixed md:sticky top-0 h-screen w-64 bg-white border-r border-slate-200 z-10 transform transition-transform duration-200 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="p-6 border-b border-slate-100 hidden md:flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
            <LayoutDashboard size={18} />
          </div>
          <h1 className="font-bold text-xl text-slate-800">Seven Stars</h1>
        </div>

        <nav className="p-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-slate-100">
            <div className="bg-slate-50 p-3 rounded-lg text-xs text-slate-500">
                <p className="font-semibold text-slate-700 mb-1">Documentation View</p>
                v1.1 • Access Update (接入文档)
            </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
        {renderContent()}
      </main>
      
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
            className="fixed inset-0 bg-black/20 z-0 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default App;