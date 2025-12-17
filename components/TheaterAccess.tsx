import React, { useState } from 'react';
import { ACCESS_DICTIONARY, THEATER_DRAMA_LIST, THEATER_NOVEL_LIST, PENDING_ACCESS, DRAMA_LIST_RESOURCES } from '../constants';
import { Database, AlertCircle, CheckCircle2, PauseCircle, Download, XCircle, ExternalLink, BookOpen, Video, Check, X, Info } from 'lucide-react';

export const TheaterAccess: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'dramas' | 'novels' | 'resources'>('overview');

  // Stats for the Overview
  const totalDramas = THEATER_DRAMA_LIST.length;
  const onlineDramas = THEATER_DRAMA_LIST.filter(t => t.status.includes('Online')).length;
  const pausedDramas = THEATER_DRAMA_LIST.filter(t => t.status.includes('Offline') || t.coopStatus.includes('Paused')).length;
  
  const BooleanIcon = ({ val }: { val: boolean }) => (
    val ? (
      <div className="flex justify-center">
        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center border border-green-200">
          <Check size={12} className="text-green-700 stroke-[3]" />
        </div>
      </div>
    ) : (
      <div className="flex justify-center">
        <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center border border-red-200">
          <X size={12} className="text-red-700 stroke-[3]" />
        </div>
      </div>
    )
  );

  const CoopStatusBadge = ({ status }: { status: string }) => {
    let label = status;
    let style = "bg-slate-100 text-slate-500 border-slate-200";

    if (!status || status === '-' || status === '') {
      label = "Normal (正常合作)";
      style = "bg-green-50 text-green-700 border-green-200";
    } else if (status.toLowerCase().includes('paused')) {
       style = "bg-red-50 text-red-700 border-red-200";
    } else if (status.toLowerCase().includes('pending')) {
       style = "bg-orange-50 text-orange-700 border-orange-200";
    }

    return (
      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border whitespace-nowrap ${style}`}>
        {label}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Sub Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'overview' ? 'bg-indigo-100 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}
        >
          Overview & Dictionary (概览与字典)
        </button>
        <button 
          onClick={() => setActiveTab('dramas')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'dramas' ? 'bg-indigo-100 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}
        >
          Short Dramas List (短剧接入表)
        </button>
        <button 
          onClick={() => setActiveTab('novels')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'novels' ? 'bg-indigo-100 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}
        >
          Novels List (小说接入表)
        </button>
        <button 
          onClick={() => setActiveTab('resources')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'resources' ? 'bg-indigo-100 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}
        >
          Pending & Config (待接入与配置)
        </button>
      </div>

      {/* Content Area */}
      <div className="animate-fade-in">
        
        {/* TAB: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-slate-500 text-sm">Total Integrations</p>
                  <p className="text-2xl font-bold text-slate-800">{totalDramas}</p>
                </div>
                <Database className="text-slate-300" size={32} />
              </div>
              <div className="bg-white p-5 rounded-xl border border-green-200 bg-green-50 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-green-700 text-sm">Online (已上线)</p>
                  <p className="text-2xl font-bold text-green-800">{onlineDramas}</p>
                </div>
                <CheckCircle2 className="text-green-400" size={32} />
              </div>
              <div className="bg-white p-5 rounded-xl border border-amber-200 bg-amber-50 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-amber-700 text-sm">Paused/Offline</p>
                  <p className="text-2xl font-bold text-amber-800">{pausedDramas}</p>
                </div>
                <PauseCircle className="text-amber-400" size={32} />
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <BookOpen size={18} className="text-indigo-600"/> 
                  Field Dictionary (名词字典)
                </h3>
              </div>
              <div className="divide-y divide-slate-100">
                {ACCESS_DICTIONARY.map((item, idx) => (
                  <div key={idx} className="p-4 hover:bg-slate-50 transition-colors grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="font-semibold text-slate-700 md:col-span-1">{item.term}</div>
                    <div className="text-slate-600 text-sm md:col-span-3">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB: DRAMAS - UPDATED WITH HORIZONTAL SCROLL AND STICKY COLUMN */}
        {activeTab === 'dramas' && (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
            <div className="p-4 bg-yellow-50 text-yellow-800 text-xs border-b border-yellow-100 flex items-center gap-2">
                <Info size={14} />
                <span>Scroll right to view all technical details (向右滑动查看所有技术细节)</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs whitespace-nowrap">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                    <th className="p-4 sticky left-0 bg-slate-50 z-10 border-r border-slate-200 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">Theater (剧场)</th>
                    <th className="p-4">Coop (合作状态)</th>
                    <th className="p-4">Status (状态)</th>
                    <th className="p-4">Drama Interface (短剧接口)</th>
                    <th className="p-4">Takedown Logic (下架逻辑)</th>
                    <th className="p-4 text-center">Download (下载)</th>
                    <th className="p-4 text-center">Play (播放)</th>
                    <th className="p-4 text-center">Task API (任务接口)</th>
                    <th className="p-4">Token Rule (口令码)</th>
                    <th className="p-4">Token Len</th>
                    <th className="p-4 text-center">App Link</th>
                    <th className="p-4 text-center">Short Link</th>
                    <th className="p-4">Deep Link</th>
                    <th className="p-4 text-center">Order Sync</th>
                    <th className="p-4">Order Freq (更新频率)</th>
                    <th className="p-4 text-center">Ads (广告)</th>
                    <th className="p-4 text-center">Refund Support</th>
                    <th className="p-4">Refund Logic</th>
                    <th className="p-4 text-center">Launch Time</th>
                    <th className="p-4 text-center">Must Report</th>
                    <th className="p-4">Order Data</th>
                    <th className="p-4">Query Range</th>
                    <th className="p-4">Auth</th>
                    <th className="p-4 bg-slate-50/50">Notes (备注)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {THEATER_DRAMA_LIST.map((drama, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      {/* Sticky Theater Name */}
                      <td className="p-4 font-bold text-slate-800 sticky left-0 bg-white z-10 border-r border-slate-200 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                        {drama.name}
                      </td>
                      
                      <td className="p-4">
                        <CoopStatusBadge status={drama.coopStatus} />
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                          drama.status.includes('Online') ? 'bg-green-50 border-green-100 text-green-700' :
                          drama.status.includes('Dev') ? 'bg-blue-50 border-blue-100 text-blue-700' :
                          'bg-slate-100 border-slate-200 text-slate-500'
                        }`}>
                          {drama.status.split(' ')[0]}
                        </span>
                      </td>
                      
                      <td className="p-4 text-slate-600">{drama.dramaInterface}</td>
                      <td className="p-4 text-slate-600">{drama.takedownLogic}</td>
                      <td className="p-4 text-center text-slate-600">{drama.downloadType}</td>
                      
                      {/* Boolean Icons */}
                      <td className="p-4 text-center"><BooleanIcon val={drama.playSupport} /></td>
                      <td className="p-4 text-center"><BooleanIcon val={drama.taskInterface} /></td>
                      
                      <td className="p-4 text-slate-600 max-w-[150px] truncate" title={drama.tokenRule}>{drama.tokenRule}</td>
                      <td className="p-4 text-center font-mono text-slate-500">{drama.tokenLen}</td>
                      
                      <td className="p-4 text-center"><BooleanIcon val={drama.appLink} /></td>
                      <td className="p-4 text-center"><BooleanIcon val={drama.shortLink} /></td>
                      
                      <td className="p-4 text-slate-600">{drama.deepLink}</td>
                      <td className="p-4 text-center"><BooleanIcon val={drama.orderSync} /></td>
                      <td className="p-4 text-slate-600">{drama.orderFreq}</td>
                      <td className="p-4 text-center"><BooleanIcon val={drama.adSync} /></td>
                      <td className="p-4 text-center"><BooleanIcon val={drama.refundSupport} /></td>
                      <td className="p-4 text-slate-600 max-w-[150px] truncate" title={drama.refundReturn}>{drama.refundReturn}</td>
                      <td className="p-4 text-center"><BooleanIcon val={drama.launchTime} /></td>
                      <td className="p-4 text-center"><BooleanIcon val={drama.mustReport} /></td>
                      
                      <td className="p-4 text-slate-600 max-w-[150px] truncate" title={drama.orderDataStatus}>{drama.orderDataStatus}</td>
                      <td className="p-4 text-slate-600">{drama.queryRange}</td>
                      <td className="p-4 text-slate-600 max-w-[100px] truncate" title={drama.authMethod}>{drama.authMethod}</td>
                      
                      {/* Notes moved to end */}
                      <td className="p-4 text-slate-500 italic max-w-[150px] truncate bg-slate-50/30" title={drama.notes}>
                        {drama.notes || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB: NOVELS */}
        {activeTab === 'novels' && (
           <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
             <table className="w-full text-left text-sm">
               <thead>
                 <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                   <th className="p-4">Platform (小说平台)</th>
                   <th className="p-4">Takedown Interface (下架接口)</th>
                   <th className="p-4">Token Type (口令码)</th>
                   <th className="p-4">Token Len</th>
                   <th className="p-4">Order Sync (订单同步)</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                 {THEATER_NOVEL_LIST.map((novel, idx) => (
                   <tr key={idx} className="hover:bg-slate-50 transition-colors">
                     <td className="p-4 font-medium text-slate-800 flex items-center gap-2">
                       <BookOpen size={16} className="text-emerald-500"/>
                       {novel.name}
                     </td>
                     <td className="p-4 text-slate-600">{novel.offlineLogic}</td>
                     <td className="p-4 text-slate-600">
                       <span className={`px-2 py-0.5 rounded text-xs border ${novel.tokenType.includes('Static') ? 'bg-gray-100 border-gray-200 text-gray-600' : 'bg-blue-50 border-blue-100 text-blue-600'}`}>
                         {novel.tokenType}
                       </span>
                     </td>
                     <td className="p-4 text-slate-600 font-mono">{novel.tokenLen}</td>
                     <td className="p-4 text-slate-600">{novel.orderSync}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
         </div>
        )}

        {/* TAB: RESOURCES */}
        {activeTab === 'resources' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pending */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
               <div className="bg-purple-50 px-6 py-4 border-b border-purple-100 flex items-center gap-2">
                  <AlertCircle className="text-purple-600" size={20} />
                  <h3 className="font-bold text-purple-900">Pending Integration (待接入剧场)</h3>
               </div>
               <div className="p-0">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500">
                      <tr>
                        <th className="p-3 pl-6">Name</th>
                        <th className="p-3">Type</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">ETA</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {PENDING_ACCESS.map((item, idx) => (
                        <tr key={idx}>
                          <td className="p-3 pl-6 font-medium text-slate-800">{item.name}</td>
                          <td className="p-3 text-slate-500">{item.type}</td>
                          <td className="p-3">
                            <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded">{item.status}</span>
                          </td>
                          <td className="p-3 text-slate-600">{item.delivery}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
               </div>
            </div>

            {/* Resources Links */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
               <div className="bg-blue-50 px-6 py-4 border-b border-blue-100 flex items-center gap-2">
                  <ExternalLink className="text-blue-600" size={20} />
                  <h3 className="font-bold text-blue-900">Drama List Configuration (剧单配置)</h3>
               </div>
               <div className="p-6">
                  <p className="text-xs text-slate-400 mb-4">Links to external spreadsheets or configs.</p>
                  <ul className="space-y-3">
                    {DRAMA_LIST_RESOURCES.map((res, idx) => (
                      <li key={idx} className="flex items-start gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer group">
                        <div className="mt-1 text-slate-400 group-hover:text-blue-500"><ExternalLink size={16}/></div>
                        <div>
                          <span className="font-medium text-slate-700 block group-hover:text-blue-600">{res.name}</span>
                          <span className="text-xs text-slate-500">{res.link}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
               </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
