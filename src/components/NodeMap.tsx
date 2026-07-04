import React from 'react';
import { 
  DoorOpen, 
  ShowerHead, 
  Link as LinkIcon, 
  Disc, 
  Grid3X3, 
  Wind, 
  Droplets, 
  LogOut,
  Milestone
} from 'lucide-react';
import { EquipmentNode, HealthStatus } from '../types';

interface NodeMapProps {
  nodes: EquipmentNode[];
  selectedNodeId: string;
  onSelectNode: (id: string) => void;
}

const nodeIcons: Record<string, React.ComponentType<any>> = {
  entrance: DoorOpen,
  'prep-arch': ShowerHead,
  conveyor: LinkIcon,
  'top-brush': Disc,
  'wrap-brushes': Grid3X3,
  dryers: Wind,
  hydraulic: Droplets,
  'exit-arch': LogOut,
};

const statusColors: Record<HealthStatus, { text: string; bg: string; border: string }> = {
  Healthy: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  Monitor: { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  Attention: { text: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  Critical: { text: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
};

export default function NodeMap({ nodes, selectedNodeId, onSelectNode }: NodeMapProps) {
  return (
    <div id="equipment-node-map" className="w-full flex flex-col relative select-none mt-2">
      {/* Map Nodes Slider / Flex Row */}
      <div className="flex items-center justify-between gap-1 relative z-10 px-8 overflow-x-auto pb-4 scrollbar-none">
        {nodes.map((node, idx) => {
          const Icon = nodeIcons[node.id] || Milestone;
          const isSelected = node.id === selectedNodeId;
          const sc = statusColors[node.status];
          const hasNext = idx < nodes.length - 1;

          return (
            <React.Fragment key={node.id}>
              {/* Individual Node */}
              <button
                id={`node-${node.id}`}
                onClick={() => onSelectNode(node.id)}
                className="flex flex-col items-center group relative cursor-pointer outline-none shrink-0 transition-all duration-300"
              >
                {/* Node Housing Ring */}
                <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 relative ${
                  isSelected 
                    ? 'bg-white text-blue-600 shadow-[0_0_15px_rgba(255,255,255,0.4)] border border-white' 
                    : 'bg-[#0E1326]/60 border border-white/5 text-slate-400 hover:border-white/15 hover:text-white'
                }`}>
                  <Icon className="w-4.5 h-4.5" />
                  
                  {/* Small colored status glow indicator */}
                  {!isSelected && (
                    <span className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full ${
                      node.status === 'Healthy' ? 'bg-emerald-500' :
                      node.status === 'Monitor' ? 'bg-amber-500' :
                      node.status === 'Attention' ? 'bg-orange-500' : 'bg-rose-500'
                    }`} />
                  )}
                </div>

                {/* Node Name */}
                <span className={`text-[11px] font-bold mt-2 transition-colors duration-200 truncate max-w-[85px] ${
                  isSelected ? 'text-white font-semibold' : 'text-slate-500 group-hover:text-slate-300'
                }`}>
                  {node.name}
                </span>

                {/* Subtext indicating selected state with a subtle line matching reference */}
                {isSelected && (
                  <div className="absolute -bottom-2 w-12 h-0.5 bg-blue-500 rounded-full animate-pulse"></div>
                )}
              </button>

              {/* Connecting Dotted Line matching image */}
              {hasNext && (
                <div className="flex-1 h-[1px] border-t border-dashed border-white/10 mx-2 min-w-[15px] shrink-0"></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
