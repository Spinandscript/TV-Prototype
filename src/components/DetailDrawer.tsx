import React from 'react';
import { 
  Heart, 
  Wrench, 
  Info, 
  CheckCircle, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Share2, 
  Download, 
  FolderGit2,
  FileCode,
  FileText
} from 'lucide-react';
import { EquipmentNode, HealthStatus } from '../types';

interface DetailDrawerProps {
  node: EquipmentNode;
  onInstallClick: (partId: string) => void;
}

const statusColors: Record<HealthStatus, { text: string; bg: string; dot: string }> = {
  Healthy: { text: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', dot: 'bg-emerald-400' },
  Monitor: { text: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20', dot: 'bg-amber-400' },
  Attention: { text: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20', dot: 'bg-orange-400' },
  Critical: { text: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20', dot: 'bg-rose-400' },
};

export default function DetailDrawer({ node, onInstallClick }: DetailDrawerProps) {
  const [isFavorited, setIsFavorited] = React.useState(false);
  const [openAccordion, setOpenAccordion] = React.useState<'history' | 'assets' | 'docs' | null>('history');

  const sc = statusColors[node.status];

  const toggleAccordion = (section: 'history' | 'assets' | 'docs') => {
    if (openAccordion === section) {
      setOpenAccordion(null);
    } else {
      setOpenAccordion(section);
    }
  };

  return (
    <aside id="right-detail-drawer" className="w-80 bg-[#070A13] border-l border-white/5 flex flex-col justify-between h-full select-none overflow-hidden shrink-0 relative z-10">
      {/* Header Panel */}
      <div className="p-5 border-b border-white/5 shrink-0">
        <div className="flex items-start justify-between gap-2">
          <div className="text-left">
            <h2 className="text-white font-extrabold text-lg leading-tight tracking-tight">{node.name}</h2>
            <p className="text-[10px] text-slate-500 font-mono mt-1 uppercase tracking-widest font-bold">{node.model}</p>
          </div>
          <div className="flex gap-2">
            {/* Favorite Bookmark */}
            <button
              onClick={() => setIsFavorited(!isFavorited)}
              className={`p-2 rounded-xl border border-white/5 cursor-pointer transition-colors ${
                isFavorited ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Health Status Indicator */}
        <div className={`mt-4 flex items-center justify-between px-3 py-2.5 rounded-xl border ${sc.bg}`}>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${sc.dot} animate-pulse`} />
            <span className="text-xs font-bold text-slate-300">Operational Health</span>
          </div>
          <span className={`text-xs font-extrabold font-mono uppercase tracking-wider ${sc.text}`}>{node.status}</span>
        </div>
      </div>

      {/* Main Spec Panels (Scrollable) */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5 scrollbar-thin">
        {/* Current Install Asset Photo Card matching reference */}
        <div>
          <h3 className="text-white text-[10px] font-bold uppercase tracking-widest mb-2.5 flex items-center gap-1.5 text-slate-500">
            <Info className="w-3.5 h-3.5 text-blue-500" />
            Current Install
          </h3>
          
          <div className="bg-white/5 border border-white/5 rounded-2xl p-3 flex items-start gap-3.5 relative overflow-hidden">
            {/* Display conveyor zoom-in sprocket chain if node is conveyor, else stylized gradient icon */}
            <div className="w-20 h-20 rounded-xl overflow-hidden border border-white/15 bg-[#0C1123] relative shrink-0">
              {node.id === 'conveyor' ? (
                <img 
                  src="/src/assets/images/conveyor_chain_zoom_1783109403487.jpg" 
                  alt="Conveyor sprocket close-up" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-600/20 to-indigo-600/10 flex items-center justify-center">
                  <span className="text-xs font-mono font-bold text-blue-400">{node.id.substring(0, 3).toUpperCase()}</span>
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0 text-left">
              <h4 className="text-white text-xs font-bold truncate">{node.name}</h4>
              <p className="text-[10px] text-slate-500 font-mono mt-0.5">{node.model}</p>
              <p className="text-[10px] text-slate-400 font-semibold font-mono mt-1">SN: {node.id.toUpperCase()}-384A</p>
              <button className="mt-2 px-2.5 py-1 text-[9px] font-bold font-mono text-blue-400 border border-blue-500/20 bg-blue-500/10 rounded uppercase hover:bg-blue-500/25 transition-colors cursor-pointer">
                Inspect Asset
              </button>
            </div>
          </div>
        </div>

        {/* Specifications List Table */}
        <div>
          <h3 className="text-white text-[10px] font-bold uppercase tracking-widest mb-2.5 flex items-center gap-1.5 text-slate-500">
            <Wrench className="w-3.5 h-3.5 text-blue-500" />
            Specs & Timeline
          </h3>
          <div className="bg-white/5 border border-white/5 rounded-2xl p-3.5 space-y-2.5 text-left">
            {node.specs.map((spec, i) => (
              <div key={i} className="flex justify-between items-center text-xs border-b border-white/5 pb-2 last:border-0 last:pb-0">
                <span className="text-slate-500 font-semibold">{spec.label}</span>
                <span className="text-slate-200 font-bold font-mono text-right truncate max-w-[140px]" title={spec.value}>{spec.value}</span>
              </div>
            ))}
            <div className="flex justify-between items-center text-xs border-b border-white/5 pb-2">
              <span className="text-slate-500 font-semibold">Installed On</span>
              <span className="text-slate-200 font-mono font-bold">{node.installDate}</span>
            </div>
            <div className="flex justify-between items-center text-xs border-b border-white/5 pb-2">
              <span className="text-slate-500 font-semibold">Technician</span>
              <span className="text-slate-200 font-bold truncate max-w-[120px]" title={node.installedBy}>{node.installedBy}</span>
            </div>
            <div className="flex justify-between items-center text-xs border-b border-white/5 pb-2">
              <span className="text-slate-500 font-semibold">Vendor</span>
              <span className="text-slate-200 font-bold">{node.vendor}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-semibold">Warranty</span>
              <span className={`font-bold font-mono text-[10px] px-1.5 py-0.5 rounded-md ${
                node.warranty.includes('Active') ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
              }`}>{node.warranty}</span>
            </div>
          </div>
        </div>

        {/* Compatibility Checklist */}
        <div>
          <h3 className="text-white text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 text-slate-400">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
            Asset Compatibility Check
          </h3>
          <div className="space-y-2">
            {node.compatibleParts.map((part) => (
              <div 
                key={part.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-400 shrink-0">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate max-w-[160px]">{part.name}</p>
                    <p className="text-[10px] text-slate-500 font-mono">Compatible Part: {part.compatibilityCode}</p>
                  </div>
                </div>
                <button
                  onClick={() => onInstallClick(part.id)}
                  className="px-2 py-1 rounded bg-blue-600/10 text-blue-400 hover:text-white hover:bg-blue-600/30 text-[10px] font-mono font-bold border border-blue-500/10 transition-colors cursor-pointer"
                >
                  Bay
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Accordion Menus */}
        <div className="space-y-2">
          {/* Service History Accordion */}
          <div className="border border-white/5 rounded-xl bg-white/5 overflow-hidden">
            <button
              onClick={() => toggleAccordion('history')}
              className="w-full flex items-center justify-between p-3 text-xs font-bold text-slate-300 hover:bg-white/5"
            >
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-blue-500" />
                <span>Service Logs ({node.serviceHistory.length})</span>
              </div>
              {openAccordion === 'history' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openAccordion === 'history' && (
              <div className="p-3 border-t border-white/5 bg-[#070A13]/40 space-y-2.5">
                {node.serviceHistory.map((history, i) => (
                  <div key={i} className="text-xs space-y-1 bg-white/5 p-2 rounded-lg border border-white/5">
                    <div className="flex justify-between font-semibold">
                      <span className="text-slate-300">{history.action}</span>
                      <span className="text-slate-500 font-mono text-[10px]">{history.date}</span>
                    </div>
                    <p className="text-slate-400 leading-normal text-[11px]">{history.notes}</p>
                    <p className="text-[10px] text-slate-500 font-mono">Tech: {history.technician}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Related Assets Accordion */}
          <div className="border border-white/5 rounded-xl bg-white/5 overflow-hidden">
            <button
              onClick={() => toggleAccordion('assets')}
              className="w-full flex items-center justify-between p-3 text-xs font-bold text-slate-300 hover:bg-white/5"
            >
              <div className="flex items-center gap-2">
                <FolderGit2 className="w-3.5 h-3.5 text-blue-500" />
                <span>Inter-Node Routing</span>
              </div>
              {openAccordion === 'assets' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openAccordion === 'assets' && (
              <div className="p-3 border-t border-white/5 bg-[#070A13]/40 flex gap-2 flex-wrap">
                {node.relatedAssets.map((assetId, i) => (
                  <span 
                    key={i} 
                    className="text-[10px] font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-1 rounded-lg uppercase"
                  >
                    → {assetId}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Documents Accordion */}
          <div className="border border-white/5 rounded-xl bg-white/5 overflow-hidden">
            <button
              onClick={() => toggleAccordion('docs')}
              className="w-full flex items-center justify-between p-3 text-xs font-bold text-slate-300 hover:bg-white/5"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-blue-500" />
                <span>Documents & Manuals</span>
              </div>
              {openAccordion === 'docs' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openAccordion === 'docs' && (
              <div className="p-3 border-t border-white/5 bg-[#070A13]/40 space-y-2">
                {node.documents.map((doc, i) => (
                  <div 
                    key={i} 
                    className="flex justify-between items-center text-xs p-2 bg-white/5 rounded-lg border border-white/5 hover:border-white/10"
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      <FileCode className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <div className="truncate max-w-[140px]">
                        <p className="text-slate-300 font-medium truncate" title={doc.name}>{doc.name}</p>
                        <p className="text-[9px] text-slate-500 font-mono">{doc.type} • {doc.size}</p>
                      </div>
                    </div>
                    <button className="p-1 rounded bg-white/5 text-slate-400 hover:text-white cursor-pointer hover:bg-white/10">
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Persistent Technical Spec Footer */}
      <div className="p-4 border-t border-white/5 shrink-0 bg-[#070A13] flex flex-col justify-center">
        <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono font-semibold uppercase">
          <span>Model Logic</span>
          <span className="text-blue-400">TUNNEL-V1-A</span>
        </div>
      </div>
    </aside>
  );
}
