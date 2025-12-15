import React, { useState } from 'react';
import { ACCESS_DICTIONARY, THEATER_DRAMA_LIST, THEATER_NOVEL_LIST, PENDING_ACCESS, DRAMA_LIST_RESOURCES } from '../constants';
import { Database, AlertCircle, CheckCircle2, PauseCircle, Download, XCircle, ExternalLink, BookOpen, Video } from 'lucide-react';

export const TheaterAccess: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'dramas' | 'novels' | 'resources'>('overview');

  // Stats for the Overview
  const totalDramas = THEATER_DRAMA_LIST.length;
  const onlineDramas = THEATER_DRAMA_LIST.filter(t => t.status.includes('Online')).length;
  const pausedDramas = THEATER_DRAMA_LIST.filter(t => t.status.includes('Paused')).length;
  
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
                  <p className="text-amber-700 text-sm">Paused (暂停)</p>
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

        {/* TAB: DRAMAS */}
        {activeTab === 'dramas' && (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
             <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                    <th className="p-4">Theater (剧场)</th>
                    <th className="p-4">Status (状态)</th>
                    <th className="p-4">Takedown Logic (下架逻辑)</th>
                    <th className="p-4 text-center">Download (下载)</th>
                    <th className="p-4">Notes (备注)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {THEATER_DRAMA_LIST.map((drama, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-medium text-slate-800 flex items-center gap-2">
                        <Video size={16} className="text-indigo-400"/>
                        {drama.name}
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          drama.status.includes('Online') ? 'bg-green-100 text-green-700' :
                          drama.status.includes('Paused') ? 'bg-amber-100 text-amber-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {drama.status}
                        </span>
                      </td>
                      <td className="p-4 text-slate-600">{drama.filter}</td>
                      <td className="p-4 text-center">
                        {drama.download ? 
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600"><Download size={16}/></span> : 
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-400"><XCircle size={16}/></span>
                        }
                      </td>
                      <td className="p-4 text-slate-500 text-xs italic">{drama.notes}</td>
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