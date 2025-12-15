import React, { useState, useEffect } from 'react';
import { Calculator, RefreshCw, ChevronRight } from 'lucide-react';

interface CalculationState {
  paymentAmountCents: number;
  exchangeRate: number;
  channelFeePercent: number;
  theaterSharePercent: number;
  distributorLimitPercent: number;
  teamPercent: number;
  individualTemplatePercent: number;
  leaderTemplatePercent: number;
}

export const CommissionCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<CalculationState>({
    paymentAmountCents: 1999, // 1999 cents
    exchangeRate: 7, // USD to RMB
    channelFeePercent: 70, // Channel fee retention rate
    theaterSharePercent: 80,
    distributorLimitPercent: 75, // Cap
    teamPercent: 100, 
    individualTemplatePercent: 80,
    leaderTemplatePercent: 20,
  });

  const [results, setResults] = useState<any>({});

  // Helper for truncation logic from PDF: "Intercept two decimal places" (floor)
  const truncate = (num: number) => Math.floor(num * 100) / 100;

  useEffect(() => {
    // 1. Order Amount (RMB)
    const usdAmount = inputs.paymentAmountCents / 100;
    const rawOrderAmount = usdAmount * inputs.exchangeRate * (inputs.channelFeePercent / 100);
    const orderAmount = truncate(rawOrderAmount);

    // 2. Theater Share
    const rawTheaterShare = orderAmount * (inputs.theaterSharePercent / 100);
    const theaterShare = truncate(rawTheaterShare);

    // 3. Distributor Order Amount
    const rawDistributorAmount = theaterShare * 1.0; 
    const distributorAmount = truncate(rawDistributorAmount);

    // 4. Team Share (Actual Commission Pool)
    const rawTeamShare = distributorAmount * (inputs.distributorLimitPercent / 100);
    const teamShare = truncate(rawTeamShare);

    // 5. Individual Share
    const rawIndividualShare = teamShare * (inputs.individualTemplatePercent / 100);
    const individualShare = truncate(rawIndividualShare);

    // 6. Leader/Head Share
    const rawLeaderShare = teamShare * (inputs.leaderTemplatePercent / 100);
    const leaderShare = truncate(rawLeaderShare);

    setResults({
      orderAmount,
      theaterShare,
      distributorAmount,
      teamShare,
      individualShare,
      leaderShare
    });
  }, [inputs]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Inputs Panel */}
      <div className="lg:col-span-5 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
          <Calculator className="text-indigo-600" />
          <h2 className="text-xl font-bold text-slate-800">Parameters (参数设置)</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">User Payment Cents (观众支付美分)</label>
            <input 
              type="number" 
              name="paymentAmountCents"
              value={inputs.paymentAmountCents} 
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            />
            <p className="text-xs text-slate-400 mt-1">= ${(inputs.paymentAmountCents/100).toFixed(2)} USD</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Exchange Rate (汇率)</label>
              <input 
                type="number" 
                name="exchangeRate"
                value={inputs.exchangeRate} 
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Channel Rate % (通道费)</label>
              <input 
                type="number" 
                name="channelFeePercent"
                value={inputs.channelFeePercent} 
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 space-y-3">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Split Ratios (分成比例)</p>
            <div className="flex justify-between items-center">
              <label className="text-sm text-slate-700">Theater Share (剧场分成)</label>
              <div className="flex items-center gap-1">
                <input type="number" name="theaterSharePercent" value={inputs.theaterSharePercent} onChange={handleChange} className="w-16 text-right px-2 py-1 border rounded text-sm"/>
                <span className="text-slate-500">%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <label className="text-sm text-slate-700">Upper Limit Cap (分佣上限)</label>
              <div className="flex items-center gap-1">
                <input type="number" name="distributorLimitPercent" value={inputs.distributorLimitPercent} onChange={handleChange} className="w-16 text-right px-2 py-1 border rounded text-sm"/>
                <span className="text-slate-500">%</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 space-y-3">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Template (分佣模板)</p>
            <div className="flex justify-between items-center">
              <label className="text-sm text-slate-700">Individual (个人)</label>
              <div className="flex items-center gap-1">
                <input type="number" name="individualTemplatePercent" value={inputs.individualTemplatePercent} onChange={handleChange} className="w-16 text-right px-2 py-1 border rounded text-sm"/>
                <span className="text-slate-500">%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <label className="text-sm text-slate-700">Leader/Head (团长)</label>
              <div className="flex items-center gap-1">
                <input type="number" name="leaderTemplatePercent" value={inputs.leaderTemplatePercent} onChange={handleChange} className="w-16 text-right px-2 py-1 border rounded text-sm"/>
                <span className="text-slate-500">%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Panel */}
      <div className="lg:col-span-7 space-y-4">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Calculation Waterfall (资金流水分成)</h2>
        <div className="text-xs text-orange-600 bg-orange-50 p-2 rounded mb-4 border border-orange-100">
           Note: All calculations use "Truncate to 2 decimal places" (小数点后两位截断) as per document.
        </div>
        
        {/* Step 1: Base Order */}
        <ResultCard 
          step="1"
          title="Order Amount (订单金额)"
          formula={`$${(inputs.paymentAmountCents/100).toFixed(2)} × ${inputs.exchangeRate} × ${inputs.channelFeePercent}%`}
          amount={results.orderAmount}
          description="Payment × Exchange Rate × Channel Fee"
        />

        <div className="flex justify-center"><ChevronRight className="rotate-90 text-slate-300" /></div>

        {/* Step 2: Theater */}
        <ResultCard 
          step="2"
          title="Theater Share (剧场分成金额)"
          formula={`${results.orderAmount} × ${inputs.theaterSharePercent}%`}
          amount={results.theaterShare}
          description="Order Amount × Theater Share %"
        />

        <div className="flex justify-center"><ChevronRight className="rotate-90 text-slate-300" /></div>

        {/* Step 3: Team Pool */}
        <ResultCard 
          step="3"
          title="Team Commission Pool (团队分成金额)"
          formula={`${results.distributorAmount} × ${inputs.distributorLimitPercent}% (Cap)`}
          amount={results.teamShare}
          isHighlight
          description="Distributor Amount × Upper Limit (Cap)"
        />

        <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="relative">
                <div className="absolute -top-4 left-1/2 -ml-0.5 h-4 w-0.5 bg-slate-300"></div>
                <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                    <p className="text-xs text-green-600 font-bold uppercase mb-1">Individual (个人 {inputs.individualTemplatePercent}%)</p>
                    <p className="text-2xl font-bold text-slate-800">{results.individualShare}</p>
                    <p className="text-xs text-slate-500 mt-1 font-mono">{results.teamShare} × {inputs.individualTemplatePercent}%</p>
                </div>
            </div>
            <div className="relative">
                <div className="absolute -top-4 left-1/2 -ml-0.5 h-4 w-0.5 bg-slate-300"></div>
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                    <p className="text-xs text-blue-600 font-bold uppercase mb-1">Leader (团长 {inputs.leaderTemplatePercent}%)</p>
                    <p className="text-2xl font-bold text-slate-800">{results.leaderShare}</p>
                    <p className="text-xs text-slate-500 mt-1 font-mono">{results.teamShare} × {inputs.leaderTemplatePercent}%</p>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

const ResultCard = ({ step, title, formula, amount, description, isHighlight = false }: any) => (
  <div className={`relative p-5 rounded-xl border ${isHighlight ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-slate-200'} shadow-sm`}>
    <div className="flex justify-between items-start">
        <div>
            <div className="flex items-center gap-2 mb-1">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-800 text-white text-xs font-bold">{step}</span>
                <h4 className="font-semibold text-slate-800">{title}</h4>
            </div>
            <p className="text-sm text-slate-500 font-mono bg-slate-100 inline-block px-2 py-0.5 rounded text-xs mb-2">{formula}</p>
            <p className="text-xs text-slate-400">{description}</p>
        </div>
        <div className="text-right">
            <span className="text-2xl font-bold text-slate-800">{amount?.toFixed(2)}</span>
            <span className="text-xs text-slate-500 block">RMB (元)</span>
        </div>
    </div>
  </div>
);