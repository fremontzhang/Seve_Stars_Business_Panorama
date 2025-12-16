import React, { useState, useEffect } from 'react';
import { Calculator, ChevronRight, RefreshCw, Zap, CreditCard } from 'lucide-react';

type OrderType = 'recharge' | 'ad';

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

const SCENARIOS = {
  recharge: {
    label: "4.1 Recharge Order (充值订单)",
    icon: CreditCard,
    color: "indigo",
    params: {
      paymentAmountCents: 1999,
      exchangeRate: 7,
      channelFeePercent: 70,
      theaterSharePercent: 80,
      distributorLimitPercent: 75,
      teamPercent: 100, 
      individualTemplatePercent: 80,
      leaderTemplatePercent: 20,
    }
  },
  ad: {
    label: "4.2 Ad Order (广告订单)",
    icon: Zap,
    color: "amber",
    params: {
      paymentAmountCents: 1999,
      exchangeRate: 7,
      channelFeePercent: 60,
      theaterSharePercent: 0, // No theater share for ads
      distributorLimitPercent: 100, // 100% limit
      teamPercent: 100,
      individualTemplatePercent: 80,
      leaderTemplatePercent: 20,
    }
  }
};

export const CommissionCalculator: React.FC = () => {
  const [orderType, setOrderType] = useState<OrderType>('recharge');
  const [inputs, setInputs] = useState<CalculationState>(SCENARIOS.recharge.params);
  const [results, setResults] = useState<any>({});

  // Helper for truncation logic from PDF: "Intercept two decimal places" (floor)
  const truncate = (num: number) => Math.floor(num * 100) / 100;

  // Switch handler
  const switchScenario = (type: OrderType) => {
    setOrderType(type);
    setInputs(SCENARIOS[type].params);
  };

  useEffect(() => {
    // 1. Order Amount (RMB)
    const usdAmount = inputs.paymentAmountCents / 100;
    const rawOrderAmount = usdAmount * inputs.exchangeRate * (inputs.channelFeePercent / 100);
    const orderAmount = truncate(rawOrderAmount);

    let theaterShare = 0;
    let distributorAmount = 0;

    if (orderType === 'recharge') {
        // 4.1 Recharge Logic
        // Theater Share = Order Amount * Theater %
        const rawTheaterShare = orderAmount * (inputs.theaterSharePercent / 100);
        theaterShare = truncate(rawTheaterShare);
        
        // Distributor Amount = Theater Share * 100% (Implicit distributor ratio)
        distributorAmount = theaterShare; 
    } else {
        // 4.2 Ad Logic
        // "Ads have no theater share" -> Distributor Amount derived directly from Order Amount
        theaterShare = 0;
        distributorAmount = orderAmount; // 100% of order amount goes to distributor pool base
    }

    // 4. Team Share (Actual Commission Pool)
    // Formula: Distributor Amount * Limit %
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
  }, [inputs, orderType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const currentScenario = SCENARIOS[orderType];

  return (
    <div className="space-y-6">
      {/* Type Toggle */}
      <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm inline-flex gap-2">
        {(Object.keys(SCENARIOS) as OrderType[]).map((type) => {
            const sc = SCENARIOS[type];
            const isActive = orderType === type;
            return (
                <button
                    key={type}
                    onClick={() => switchScenario(type)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                        isActive 
                        ? `bg-${sc.color}-100 text-${sc.color}-700 shadow-sm` 
                        : 'text-slate-500 hover:bg-slate-50'
                    }`}
                >
                    <sc.icon size={16} />
                    {sc.label}
                </button>
            )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Inputs Panel */}
        <div className="lg:col-span-5 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
                <Calculator className={`text-${currentScenario.color}-600`} />
                <h2 className="text-xl font-bold text-slate-800">Parameters</h2>
            </div>
            <button 
                onClick={() => setInputs(SCENARIOS[orderType].params)}
                className="text-xs text-slate-400 hover:text-indigo-600 flex items-center gap-1"
                title="Reset to Defaults"
            >
                <RefreshCw size={12}/> Reset
            </button>
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

            <div className={`p-4 rounded-lg border space-y-3 transition-colors ${orderType === 'recharge' ? 'bg-slate-50 border-slate-100' : 'bg-amber-50 border-amber-100'}`}>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Split Ratios (分成比例)</p>
              
              <div className="flex justify-between items-center">
                <label className="text-sm text-slate-700">Theater Share (剧场分成)</label>
                <div className="flex items-center gap-1">
                  {orderType === 'recharge' ? (
                      <>
                        <input type="number" name="theaterSharePercent" value={inputs.theaterSharePercent} onChange={handleChange} className="w-16 text-right px-2 py-1 border rounded text-sm"/>
                        <span className="text-slate-500">%</span>
                      </>
                  ) : (
                      <span className="text-xs font-bold text-slate-400 px-2">N/A (No Share)</span>
                  )}
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
          <h2 className="text-xl font-bold text-slate-800 mb-4">Calculation Waterfall ({SCENARIOS[orderType].label})</h2>
          <div className="text-xs text-orange-600 bg-orange-50 p-2 rounded mb-4 border border-orange-100 flex items-start gap-2">
             <div className="mt-0.5"><Zap size={12}/></div>
             <span>Note: All calculations use "Truncate to 2 decimal places" (小数点后两位截断) as per document.</span>
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

          {/* Step 2: Theater (Only for Recharge) */}
          {orderType === 'recharge' ? (
              <>
                <ResultCard 
                    step="2"
                    title="Theater Share (剧场分成金额)"
                    formula={`${results.orderAmount} × ${inputs.theaterSharePercent}%`}
                    amount={results.theaterShare}
                    description="Order Amount × Theater Share %"
                />
                <div className="flex justify-center"><ChevronRight className="rotate-90 text-slate-300" /></div>
              </>
          ) : (
              // For Ad Order, indicate skipped step
             <>
                <div className="text-center text-xs text-slate-400 py-2 border border-dashed border-slate-200 rounded-lg bg-slate-50">
                    Step 2 Skipped: No Theater Share for Ads (广告无剧场分成)
                </div>
                <div className="flex justify-center"><ChevronRight className="rotate-90 text-slate-300" /></div>
             </>
          )}

          {/* Step 3: Team Pool */}
          <ResultCard 
            step={orderType === 'recharge' ? "3" : "2"}
            title="Team Commission Pool (团队分成金额)"
            formula={orderType === 'recharge' 
                ? `${results.distributorAmount} × ${inputs.distributorLimitPercent}%` 
                : `${results.distributorAmount} (Order Amt) × ${inputs.distributorLimitPercent}%`}
            amount={results.teamShare}
            isHighlight
            description={orderType === 'recharge' ? "Distributor Amount × Limit" : "Order Amount × Limit (Direct Pass-through)"}
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
    </div>
  );
};

const ResultCard = ({ step, title, formula, amount, description, isHighlight = false }: any) => (
  <div className={`relative p-5 rounded-xl border ${isHighlight ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-slate-200'} shadow-sm transition-all`}>
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
