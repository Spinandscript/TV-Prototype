import React from 'react';
import { Sparkles, ArrowRight, Clock, Receipt } from 'lucide-react';
import { EquipmentNode, Part } from '../types';

interface RecommendationBannerProps {
  node: EquipmentNode;
  onOpenInstallBay: (part: Part) => void;
  onGenerateQuote: (part: Part) => void;
}

export default function RecommendationBanner({ 
  node, 
  onOpenInstallBay, 
  onGenerateQuote 
}: RecommendationBannerProps) {
  // Customize the AI CJ prompt based on the selected node
  const getCJPromptText = () => {
    switch (node.id) {
      case 'conveyor':
        return "It looks like you're replacing the conveyor chain. Based on the current installation, I recommend:";
      case 'wrap-brushes':
        return "Passenger-side wrap brush is experiencing high drag telemetry. Based on the current installation, I recommend:";
      case 'dryers':
        return "Anomalous vibrations on Blower #3 require immediate attention. Based on the current installation, I recommend:";
      case 'hydraulic':
        return "System temperature is slightly high. Based on the current installation, I recommend:";
      case 'entrance':
        return "Entrance sensors are aligned. To prevent gate lockouts in case of collision, I recommend:";
      case 'prep-arch':
        return "Water pressure checks out. For the next scheduled 500-hour service, I recommend:";
      case 'top-brush':
        return "Brush core rotation speed is nominal. For center segment wear during peak washes, I recommend:";
      case 'exit-arch':
        return "Wax dispersion rates are steady. To prevent delayed shutoff chemical dripping, I recommend:";
      default:
        return `Based on telemetry statistics for ${node.name}, I recommend:`;
    }
  };

  const getEstimatedTime = () => {
    switch (node.id) {
      case 'conveyor': return "3.5 Hours";
      case 'wrap-brushes': return "1.5 Hours";
      case 'dryers': return "2.0 Hours";
      case 'hydraulic': return "1.0 Hours";
      default: return "45 Mins";
    }
  };

  // Utility to map abstract thumbnail strings to appropriate styled blocks/badges
  const renderThumbnailBadge = (thumb: string) => {
    switch (thumb) {
      case 'conveyor_chain':
        return <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-[10px] font-black text-blue-400 font-mono">CHN</div>;
      case 'rollers':
        return <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[10px] font-black text-amber-400 font-mono">RLR</div>;
      case 'master_links':
        return <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-[10px] font-black text-emerald-400 font-mono">LNK</div>;
      case 'neoglide_foam':
      case 'foam_segments':
        return <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-[10px] font-black text-purple-400 font-mono">FOAM</div>;
      case 'shock_absorber':
      case 'vibration_mounts':
        return <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-[10px] font-black text-orange-400 font-mono">MNT</div>;
      case 'dryer-impeller':
        return <div className="w-9 h-9 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-[10px] font-black text-teal-400 font-mono">IMP</div>;
      case 'hydraulic_seal':
      case 'pump_seal':
        return <div className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-[10px] font-black text-red-400 font-mono">SEAL</div>;
      case 'oil_filter':
        return <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-[10px] font-black text-indigo-400 font-mono">FLT</div>;
      default:
        return <div className="w-9 h-9 rounded-lg bg-slate-500/10 border border-slate-500/30 flex items-center justify-center text-[10px] font-black text-slate-400 font-mono">PRT</div>;
    }
  };

  const hasParts = node.compatibleParts && node.compatibleParts.length > 0;
  const firstPart = hasParts ? node.compatibleParts[0] : null;

  return (
    <div id="ai-recommendation-banner" className="bg-[#070A13] border border-white/5 rounded-2xl p-5 flex flex-col lg:flex-row items-center justify-between gap-6 select-none shrink-0 relative">
      {/* Left: CJ Coworker profile card & Message */}
      <div className="flex items-start gap-4 text-left max-w-xl">
        <div className="relative shrink-0">
          <div className="w-12 h-12 rounded-full border border-blue-500/30 overflow-hidden relative shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            <img 
              src="/src/assets/images/cj_ai_avatar_1783109383873.jpg" 
              alt="CJ AI" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center border border-[#070A13]">
            <Sparkles className="w-2.5 h-2.5 text-white" />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Predictive Recommendation</span>
            <span className="text-[9px] font-mono font-bold bg-blue-500/15 text-blue-400 px-1.5 py-0.2 rounded border border-blue-500/20 uppercase tracking-widest">
              CJ AI
            </span>
          </div>
          <p className="text-white text-xs font-semibold leading-normal mt-1.5">
            {getCJPromptText()}
          </p>
        </div>
      </div>

      {/* Center: Three parts cards mapped side-by-side */}
      <div className="flex-1 flex flex-wrap items-center gap-3 justify-start lg:justify-center">
        {node.compatibleParts.slice(0, 3).map((part) => (
          <div 
            key={part.id}
            id={`part-card-${part.id}`}
            className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/20 transition-all duration-300 w-52 shrink-0 text-left group"
          >
            {renderThumbnailBadge(part.thumbnail)}
            <div className="min-w-0">
              <h4 className="text-[11px] font-bold text-white truncate group-hover:text-blue-400 transition-colors">{part.name}</h4>
              <div className="flex items-center gap-1.5 mt-0.5 text-[9px] font-mono text-slate-500">
                <span className="font-bold text-slate-400">Qty: {part.qty}</span>
                <span>•</span>
                <span className="text-slate-300">{part.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right: Estimated install time & Action buttons */}
      <div className="flex flex-col items-center lg:items-end gap-3 shrink-0">
        <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold font-mono uppercase tracking-widest">
          <Clock className="w-3.5 h-3.5 text-blue-500" />
          <span>Est. Install: {getEstimatedTime()}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Generate Quote Outline */}
          {firstPart && (
            <button
              onClick={() => onGenerateQuote(firstPart)}
              className="px-4 py-2.5 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/5 text-slate-300 hover:text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Receipt className="w-3.5 h-3.5 text-slate-400" />
              <span>Generate Quote</span>
            </button>
          )}

          {/* Open Install Bay Solid Blue */}
          {firstPart && (
            <button
              onClick={() => onOpenInstallBay(firstPart)}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-[0_4px_12px_rgba(37,99,235,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Open Install Bay</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
