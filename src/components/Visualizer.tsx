import React from 'react';
import { 
  Play, 
  RotateCw, 
  Activity, 
  Eye, 
  Settings2, 
  Info,
  Maximize2,
  X,
  Sparkles
} from 'lucide-react';
import { EquipmentNode, HealthStatus } from '../types';

interface VisualizerProps {
  node: EquipmentNode;
  showStatus: boolean;
  setShowStatus: (val: boolean) => void;
  viewMode: '2D' | '3D';
  setViewMode: (mode: '2D' | '3D') => void;
  onPartClick: (partId: string) => void;
  onSelectNode?: (id: string) => void;
}

const statusColors: Record<HealthStatus, { border: string; glow: string; text: string; light: string }> = {
  Healthy: { border: 'border-emerald-500/30', glow: 'shadow-emerald-500/20', text: 'text-emerald-400', light: 'bg-emerald-500' },
  Monitor: { border: 'border-amber-500/30', glow: 'shadow-amber-500/20', text: 'text-amber-400', light: 'bg-amber-500' },
  Attention: { border: 'border-orange-500/30', glow: 'shadow-orange-500/20', text: 'text-orange-400', light: 'bg-orange-500' },
  Critical: { border: 'border-rose-500/30', glow: 'shadow-rose-500/20', text: 'text-rose-400', light: 'bg-rose-500' },
};

export default function Visualizer({ 
  node, 
  showStatus, 
  setShowStatus, 
  viewMode, 
  setViewMode,
  onPartClick,
  onSelectNode
}: VisualizerProps) {
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [hoveredNodeId, setHoveredNodeId] = React.useState<string | null>(null);
  const [isCJWelcomeOpen, setIsCJWelcomeOpen] = React.useState(true);

  const sc = statusColors[node.status];

  // Render the full 3D tunnel wireframe schematic matching reference image
  const renderTunnelSkeleton = () => {
    return (
      <g transform="translate(15, 60)">
        {/* Ground grid floor perspective plane */}
        <path d="M 0 160 L 460 80 L 460 210 L 0 250 Z" fill="rgba(6, 9, 20, 0.5)" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
        <line x1="0" y1="205" x2="460" y2="145" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
        
        {/* Conveyor Track running along the entire base */}
        <g 
          className="cursor-pointer" 
          onClick={() => onSelectNode?.('conveyor')}
          onMouseEnter={() => setHoveredNodeId('conveyor')}
          onMouseLeave={() => setHoveredNodeId(null)}
        >
          {/* Active outline highlight around Conveyor track */}
          {node.id === 'conveyor' && (
            <path 
              d="M -10 205 L 470 142 L 470 152 L -10 215 Z" 
              fill="none" 
              stroke={node.status === 'Attention' ? '#f97316' : '#2563eb'} 
              strokeWidth="4" 
              className="animate-pulse"
              style={{ filter: `drop-shadow(0 0 8px ${node.status === 'Attention' ? 'rgba(249,115,22,0.8)' : 'rgba(37,99,235,0.8)'})` }}
            />
          )}
          {/* Conveyor track */}
          <path d="M 10 205 L 450 145" stroke={node.status === 'Attention' ? 'rgba(249,115,22,0.2)' : '#334155'} strokeWidth="10" strokeLinecap="round" />
          <path 
            d="M 10 205 L 450 145" 
            stroke={node.status === 'Attention' ? '#f97316' : (node.id === 'conveyor' ? '#3b82f6' : '#475569')} 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeDasharray={isPlaying ? "10 8" : "none"} 
            className="transition-colors duration-300"
          />
        </g>

        {/* ENTER → Indicator */}
        <g transform="translate(-15, 225)">
          <text x="0" y="0" fill="#64748b" fontSize="9" fontWeight="bold" fontFamily="monospace">ENTER →</text>
        </g>

        {/* 1. Entrance Area Node */}
        <g 
          transform="translate(45, 195)" 
          className="cursor-pointer group"
          onClick={() => onSelectNode?.('entrance')}
          onMouseEnter={() => setHoveredNodeId('entrance')}
          onMouseLeave={() => setHoveredNodeId(null)}
        >
          {node.id === 'entrance' && (
            <ellipse cx="0" cy="5" rx="20" ry="10" fill="none" stroke="#3b82f6" strokeWidth="1.5" className="animate-pulse" />
          )}
          {/* Gate Box */}
          <rect x="-6" y="-20" width="12" height="24" fill={node.id === 'entrance' ? '#2563eb' : '#1e293b'} stroke="#475569" strokeWidth="1" />
          {/* Gate Arm */}
          <line 
            x1="0" 
            y1="-14" 
            x2={isPlaying ? "12" : "20"} 
            y2={isPlaying ? "-25" : "-14"} 
            stroke="#ef4444" 
            strokeWidth="2" 
            className="transition-all duration-1000" 
          />
          {/* Photoeye Sensor beam */}
          <line x1="12" y1="-5" x2="35" y2="-8" stroke={isPlaying ? "#f43f5e" : "transparent"} strokeWidth="1" strokeDasharray="2 2" />
          <text x="-15" y="18" fill={node.id === 'entrance' ? '#ffffff' : '#64748b'} fontSize="8" fontWeight="bold" fontFamily="monospace">ENTRANCE</text>
        </g>

        {/* 2. Prep Arch Node */}
        <g 
          transform="translate(105, 185)" 
          className="cursor-pointer group"
          onClick={() => onSelectNode?.('prep-arch')}
          onMouseEnter={() => setHoveredNodeId('prep-arch')}
          onMouseLeave={() => setHoveredNodeId(null)}
        >
          {node.id === 'prep-arch' && (
            <ellipse cx="0" cy="5" rx="20" ry="10" fill="none" stroke="#3b82f6" strokeWidth="1.5" className="animate-pulse" />
          )}
          {/* High pressure arch loop */}
          <path d="M -15 15 L -15 -18 L 15 -22 L 15 11" fill="none" stroke={node.id === 'prep-arch' ? '#3b82f6' : '#334155'} strokeWidth="3" strokeLinecap="round" />
          {/* Water particles */}
          {isPlaying && (
            <g opacity="0.6">
              <line x1="-10" y1="-10" x2="-2" y2="0" stroke="#60a5fa" strokeWidth="1" strokeDasharray="2 3" />
              <line x1="10" y1="-12" x2="2" y2="0" stroke="#60a5fa" strokeWidth="1" strokeDasharray="2 3" />
            </g>
          )}
          <text x="-15" y="22" fill={node.id === 'prep-arch' ? '#ffffff' : '#64748b'} fontSize="8" fontWeight="bold" fontFamily="monospace">PREP ARCH</text>
        </g>

        {/* 3. Top Brush Node */}
        <g 
          transform="translate(165, 175)" 
          className="cursor-pointer group"
          onClick={() => onSelectNode?.('top-brush')}
          onMouseEnter={() => setHoveredNodeId('top-brush')}
          onMouseLeave={() => setHoveredNodeId(null)}
        >
          {node.id === 'top-brush' && (
            <ellipse cx="0" cy="5" rx="20" ry="10" fill="none" stroke="#3b82f6" strokeWidth="1.5" className="animate-pulse" />
          )}
          {/* Overhead horizontal cylinder brush */}
          <line x1="0" y1="-25" x2="0" y2="5" stroke="#475569" strokeWidth="2" />
          <ellipse 
            cx="0" 
            cy="-12" 
            rx="14" 
            ry="7" 
            fill={node.id === 'top-brush' ? 'rgba(59,130,246,0.3)' : 'rgba(71,85,105,0.2)'} 
            stroke={node.id === 'top-brush' ? '#3b82f6' : '#475569'} 
            strokeWidth="1.5" 
          />
          <text x="-15" y="18" fill={node.id === 'top-brush' ? '#ffffff' : '#64748b'} fontSize="8" fontWeight="bold" fontFamily="monospace">TOP BRUSH</text>
        </g>

        {/* 4. Wrap Brushes Node */}
        <g 
          transform="translate(225, 165)" 
          className="cursor-pointer group"
          onClick={() => onSelectNode?.('wrap-brushes')}
          onMouseEnter={() => setHoveredNodeId('wrap-brushes')}
          onMouseLeave={() => setHoveredNodeId(null)}
        >
          {node.id === 'wrap-brushes' && (
            <ellipse cx="0" cy="5" rx="20" ry="10" fill="none" stroke="#3b82f6" strokeWidth="1.5" className="animate-pulse" />
          )}
          {/* Two standing vertical cylinder brushes */}
          <g transform="translate(-8, -12)">
            <line x1="0" y1="-12" x2="0" y2="12" stroke="#475569" strokeWidth="1.5" />
            <ellipse cx="0" cy="0" rx="6" ry="12" fill="rgba(16,185,129,0.2)" stroke="#10b981" strokeWidth="1" />
          </g>
          <g transform="translate(8, -10)">
            <line x1="0" y1="-12" x2="0" y2="12" stroke="#475569" strokeWidth="1.5" />
            {/* Attention orange brush */}
            <ellipse cx="0" cy="0" rx="6" ry="12" fill="rgba(249,115,22,0.25)" stroke="#f97316" strokeWidth="1.5" className="animate-pulse" />
          </g>
          <text x="-18" y="20" fill={node.id === 'wrap-brushes' ? '#ffffff' : '#64748b'} fontSize="8" fontWeight="bold" fontFamily="monospace">WRAP BRUSHES</text>
        </g>

        {/* 5. Dryers Node */}
        <g 
          transform="translate(285, 155)" 
          className="cursor-pointer group"
          onClick={() => onSelectNode?.('dryers')}
          onMouseEnter={() => setHoveredNodeId('dryers')}
          onMouseLeave={() => setHoveredNodeId(null)}
        >
          {node.id === 'dryers' && (
            <ellipse cx="0" cy="5" rx="20" ry="10" fill="none" stroke="#3b82f6" strokeWidth="1.5" className="animate-pulse" />
          )}
          {/* Multiple blower housing fans */}
          <path d="M -15 -18 L 15 -22 L 0 -5 Z" fill="none" stroke={node.id === 'dryers' ? '#3b82f6' : '#334155'} strokeWidth="2.5" />
          <circle cx="-12" cy="-18" r="4" fill="#f97316" className="animate-pulse" />
          <circle cx="12" cy="-22" r="4" fill="#475569" />
          {/* Air wave indicators */}
          {isPlaying && (
            <path d="M -8 -2 Q -8 5 -3 10 M 8 -4 Q 8 3 11 8" fill="none" stroke="rgba(96,165,250,0.5)" strokeWidth="1" />
          )}
          <text x="-12" y="18" fill={node.id === 'dryers' ? '#ffffff' : '#64748b'} fontSize="8" fontWeight="bold" fontFamily="monospace">DRYERS</text>
        </g>

        {/* 6. Hydraulic Station Node */}
        <g 
          transform="translate(345, 145)" 
          className="cursor-pointer group"
          onClick={() => onSelectNode?.('hydraulic')}
          onMouseEnter={() => setHoveredNodeId('hydraulic')}
          onMouseLeave={() => setHoveredNodeId(null)}
        >
          {node.id === 'hydraulic' && (
            <ellipse cx="0" cy="5" rx="20" ry="10" fill="none" stroke="#3b82f6" strokeWidth="1.5" className="animate-pulse" />
          )}
          {/* Hydraulic unit fluid tank */}
          <rect x="-10" y="-14" width="20" height="16" rx="2" fill={node.id === 'hydraulic' ? 'rgba(245,158,11,0.2)' : '#1e293b'} stroke="#f59e0b" strokeWidth="1" />
          <line x1="-10" y1="-5" x2="10" y2="-5" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 1" />
          <text x="-15" y="16" fill={node.id === 'hydraulic' ? '#ffffff' : '#64748b'} fontSize="8" fontWeight="bold" fontFamily="monospace">HYDRAULIC</text>
        </g>

        {/* 7. Exit Arch Node */}
        <g 
          transform="translate(405, 135)" 
          className="cursor-pointer group"
          onClick={() => onSelectNode?.('exit-arch')}
          onMouseEnter={() => setHoveredNodeId('exit-arch')}
          onMouseLeave={() => setHoveredNodeId(null)}
        >
          {node.id === 'exit-arch' && (
            <ellipse cx="0" cy="5" rx="20" ry="10" fill="none" stroke="#3b82f6" strokeWidth="1.5" className="animate-pulse" />
          )}
          {/* Rainmaker exit rinse arch */}
          <path d="M -12 12 L -12 -15 L 12 -18 L 12 8" fill="none" stroke={node.id === 'exit-arch' ? '#34d399' : '#334155'} strokeWidth="2.5" />
          {/* Exit sign glowing green */}
          <rect x="-8" y="-28" width="16" height="8" rx="1" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
          <text x="-15" y="20" fill={node.id === 'exit-arch' ? '#ffffff' : '#64748b'} fontSize="8" fontWeight="bold" fontFamily="monospace">EXIT ARCH</text>
        </g>

        {/* EXIT → Indicator */}
        <g transform="translate(445, 140)">
          <text x="0" y="0" fill="#64748b" fontSize="9" fontWeight="bold" fontFamily="monospace">EXIT →</text>
        </g>
      </g>
    );
  };

  // Render SVG Isometric representation based on node id
  const renderIsometricModel = () => {
    switch (node.id) {
      case 'entrance':
        return (
          <g transform="translate(100, 50)">
            {/* Base platform */}
            <path d="M 150 50 L 350 150 L 150 250 L -50 150 Z" fill="#131B33" stroke="#25325C" strokeWidth="2" />
            <path d="M -50 150 L -50 165 L 150 265 L 150 250 Z" fill="#0C1123" />
            <path d="M 150 250 L 150 265 L 350 165 L 350 150 Z" fill="#0E162D" />

            {/* Loop Detector Area */}
            <path d="M 110 130 L 190 170 L 130 200 L 50 160 Z" fill="rgba(59, 130, 246, 0.1)" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="90" y="150" fill="#60A5FA" fontSize="10" fontFamily="monospace">LOOP DETECTOR</text>

            {/* Photoeye Stand Left */}
            <g transform="translate(50, 100)" className="cursor-pointer" onClick={() => onPartClick('pe-sensor')}>
              <rect x="-8" y="-40" width="16" height="50" fill="#334155" stroke="#475569" strokeWidth="1" />
              <rect x="-12" y="-55" width="24" height="15" rx="4" fill="#1E293B" stroke="#60A5FA" strokeWidth="1.5" />
              {/* Lens */}
              <circle cx="0" cy="-47" r="4" fill="#3B82F6" />
              {/* Sensor Signal Line (Laser) */}
              <line x1="0" y1="-47" x2="200" y2="40" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="4 4" className={isPlaying ? "animate-pulse" : ""} />
            </g>

            {/* Photoeye Stand Right */}
            <g transform="translate(250, 200)">
              <rect x="-8" y="-40" width="16" height="50" fill="#334155" stroke="#475569" strokeWidth="1" />
              <rect x="-12" y="-55" width="24" height="15" rx="4" fill="#1E293B" stroke="#64748B" strokeWidth="1" />
              <circle cx="0" cy="-47" r="4" fill="#3B82F6" />
            </g>

            {/* Gate Box */}
            <g transform="translate(180, 80)">
              <rect x="-15" y="-60" width="30" height="70" rx="4" fill="#1E293B" stroke="#475569" strokeWidth="2" />
              <circle cx="0" cy="-40" r="6" fill="#3B82F6" />
              
              {/* Gate Arm */}
              <g transform={`rotate(${isPlaying ? -45 : 0}, 0, -40)`} className="transition-transform duration-1000">
                <line x1="0" y1="0" x2="-140" y2="0" stroke="#EF4444" strokeWidth="8" strokeLinecap="round" />
                <line x1="-20" y1="0" x2="-140" y2="0" stroke="#FFFFFF" strokeWidth="6" strokeDasharray="15 15" />
              </g>
            </g>
          </g>
        );

      case 'prep-arch':
        return (
          <g transform="translate(100, 30)">
            {/* Concrete Pad */}
            <path d="M 150 50 L 350 150 L 150 250 L -50 150 Z" fill="#131B33" stroke="#25325C" strokeWidth="2" />

            {/* Spray Arch Tube */}
            <path d="M 20 180 L 20 60 L 280 60 L 280 180" fill="none" stroke="#475569" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 20 180 L 20 60 L 280 60 L 280 180" fill="none" stroke="#64748B" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />

            {/* Nozzles and Spray Emitters */}
            {[
              { x: 20, y: 80, dx: 40, dy: 30 },
              { x: 20, y: 130, dx: 40, dy: 30 },
              { x: 70, y: 60, dx: 10, dy: 50 },
              { x: 150, y: 60, dx: 0, dy: 50 },
              { x: 230, y: 60, dx: -10, dy: 50 },
              { x: 280, y: 80, dx: -40, dy: 30 },
              { x: 280, y: 130, dx: -40, dy: 30 }
            ].map((nz, i) => (
              <g key={i}>
                {/* Nozzle Tip */}
                <circle cx={nz.x} cy={nz.y} r="5" fill="#10B981" stroke="#FFFFFF" strokeWidth="1" />
                {/* Sprayed Water Particles */}
                {isPlaying && (
                  <path 
                    d={`M ${nz.x} ${nz.y} L ${nz.x + nz.dx * 1.5} ${nz.y + nz.dy * 1.5}`} 
                    stroke="rgba(96, 165, 250, 0.4)" 
                    strokeWidth="6" 
                    strokeLinecap="round" 
                    strokeDasharray="4 8"
                    className="animate-pulse"
                  />
                )}
              </g>
            ))}

            {/* Pump Unit sitting nearby */}
            <g transform="translate(240, 180)" className="cursor-pointer" onClick={() => onPartClick('pump-seal')}>
              <rect x="-20" y="-15" width="40" height="30" rx="3" fill="#1E293B" stroke="#10B981" strokeWidth="2" />
              <rect x="-15" y="-25" width="30" height="10" rx="2" fill="#0F172A" />
              <circle cx="-10" cy="0" r="4" fill="#3B82F6" />
              <text x="-15" y="25" fill="#10B981" fontSize="9" fontFamily="monospace">CAT PUMP</text>
            </g>
          </g>
        );

      case 'conveyor':
        return (
          <g transform="translate(100, 30)">
            {/* Floor Base */}
            <path d="M 150 50 L 350 150 L 150 250 L -50 150 Z" fill="#111625" stroke="#1E294B" strokeWidth="2" />

            {/* Main Conveyor Deck Structural Side Channels */}
            <path d="M -20 140 L 320 140 L 170 215 L -170 215 Z" fill="#1E293B" stroke="#334155" strokeWidth="2" />

            {/* Log Chain (Center Track) */}
            <path d="M -10 178 L 310 178 L 160 253 L -160 253 Z" fill="#0F172A" stroke="#1E293B" strokeWidth="1.5" />
            <g className="cursor-pointer" onClick={() => onPartClick('conveyor-chain')}>
              {node.status === 'Attention' && (
                <path 
                  d="M -150 215 L 150 215" 
                  stroke="rgba(249, 115, 22, 0.4)" 
                  strokeWidth="18" 
                  strokeLinecap="round"
                  className="animate-pulse" 
                />
              )}
              <path 
                d="M -150 215 L 150 215" 
                stroke={node.status === 'Attention' ? "#F97316" : "#3B82F6"} 
                strokeWidth="10" 
                strokeDasharray="20 15" 
                strokeLinecap="round"
                className={isPlaying ? "animate-pulse" : ""} 
              />
              <path d="M -150 215 L 150 215" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="5 30" />
              {node.status === 'Attention' && (
                <g transform="translate(0, 195)">
                  <circle cx="0" cy="0" r="10" fill="#0F172A" stroke="#F97316" strokeWidth="1.5" />
                  <text x="-3" y="3" fill="#F97316" fontSize="10" fontWeight="bold" fontFamily="monospace">!</text>
                </g>
              )}
            </g>

            {/* Rollers along the conveyor */}
            {[
              { x: -100, y: 215 },
              { x: -20, y: 215 },
              { x: 60, y: 215 },
              { x: 140, y: 215 }
            ].map((pt, i) => (
              <g key={i} transform={`translate(${pt.x}, ${pt.y})`} className="cursor-pointer" onClick={() => onPartClick('rollers')}>
                {/* Roller wheel */}
                <ellipse cx="0" cy="0" rx="8" ry="4" fill={node.status === 'Attention' ? "#F59E0B" : "#10B981"} stroke={node.status === 'Attention' ? "#D97706" : "#059669"} strokeWidth="1.5" />
                <ellipse cx="0" cy="3" rx="8" ry="4" fill={node.status === 'Attention' ? "#F59E0B" : "#10B981"} />
                <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
              </g>
            ))}

            {/* Front Take-Up Sprocket Wheel */}
            <g transform="translate(150, 215)" className="cursor-pointer" onClick={() => onPartClick('master-links')}>
              <ellipse cx="0" cy="0" rx="16" ry="10" fill="#475569" stroke={node.status === 'Attention' ? "#F59E0B" : "#94A3B8"} strokeWidth="2" />
              {/* Teeth */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <line 
                  key={angle}
                  x1="0" 
                  y1="0" 
                  x2={`${16 * Math.cos((angle * Math.PI) / 180)}`} 
                  y2={`${10 * Math.sin((angle * Math.PI) / 180)}`} 
                  stroke={node.status === 'Attention' ? "#F59E0B" : "#94A3B8"} 
                  strokeWidth="3.5" 
                />
              ))}
              <ellipse cx="0" cy="0" rx="6" ry="4" fill="#1E293B" />
            </g>

            {/* Label overlays */}
            <g transform="translate(-110, 175)">
              <rect x="-5" y="-12" width="130" height="18" rx="4" fill="#070A13" stroke={node.status === 'Attention' ? "#F97316" : "#3B82F6"} strokeWidth="1" />
              <text x="2" y="1" fill={node.status === 'Attention' ? "#F97316" : "#60A5FA"} fontSize="9" fontFamily="monospace">CV-120 PASSENGER TRACK</text>
            </g>
          </g>
        );

      case 'top-brush':
        return (
          <g transform="translate(100, 30)">
            <path d="M 150 50 L 350 150 L 150 250 L -50 150 Z" fill="#131B33" stroke="#25325C" strokeWidth="2" />

            {/* Overhead frame */}
            <path d="M 40 180 L 40 40 L 260 40 L 260 180" fill="none" stroke="#475569" strokeWidth="12" />

            {/* Brush Core Cylinder (Horizontal top-down positioner) */}
            <g transform="translate(150, 100)" className="cursor-pointer" onClick={() => onPartClick('foam-segments')}>
              {/* Rotating main cylinder */}
              <ellipse cx="0" cy="0" rx="70" ry="25" fill="#3B82F6" fillOpacity="0.4" stroke="#60A5FA" strokeWidth="2" strokeDasharray="6 3" className={isPlaying ? "animate-spin-slow" : ""} />
              <ellipse cx="0" cy="0" rx="55" ry="18" fill="#1E293B" stroke="#475569" strokeWidth="1" />
              
              {/* Horizontal shaft */}
              <line x1="-90" y1="0" x2="90" y2="0" stroke="#94A3B8" strokeWidth="6" />

              {/* Filament strands */}
              {[
                { x: -50, y: -10 }, { x: -30, y: 15 }, { x: -10, y: -20 },
                { x: 10, y: 20 }, { x: 30, y: -12 }, { x: 50, y: 10 }
              ].map((str, i) => (
                <path 
                  key={i} 
                  d={`M ${str.x} 0 Q ${str.x + 10} ${str.y} ${str.x + 5} ${str.y * 1.8}`} 
                  fill="none" 
                  stroke="#60A5FA" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                />
              ))}
            </g>

            {/* Motor Assembly */}
            <g transform="translate(240, 100)" className="cursor-pointer" onClick={() => onPartClick('brush-motor')}>
              <rect x="-10" y="-20" width="20" height="40" rx="3" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
              <rect x="-12" y="-15" width="4" height="30" fill="#F59E0B" />
              <text x="-5" y="30" fill="#94A3B8" fontSize="8" fontFamily="monospace">HP-180</text>
            </g>
          </g>
        );

      case 'wrap-brushes':
        return (
          <g transform="translate(100, 30)">
            <path d="M 150 50 L 350 150 L 150 250 L -50 150 Z" fill="#131B33" stroke="#25325C" strokeWidth="2" />

            {/* Left Vertical Brush (Driver-side) */}
            <g transform="translate(60, 120)">
              <line x1="0" y1="-80" x2="0" y2="60" stroke="#475569" strokeWidth="6" />
              {/* Outer foaming cylinder shape */}
              <ellipse cx="0" cy="-10" rx="30" ry="60" fill="#10B981" fillOpacity="0.25" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" />
              
              {/* Rotating foam details */}
              {[ -60, -40, -20, 0, 20, 40 ].map((y, i) => (
                <path 
                  key={i}
                  d={`M -25 ${y} Q -10 ${y+5} 0 ${y} Q 10 ${y+5} 25 ${y}`} 
                  fill="none" 
                  stroke="#34D399" 
                  strokeWidth="2.5" 
                  className={isPlaying ? "animate-pulse" : ""} 
                />
              ))}
            </g>

            {/* Right Vertical Brush (Passenger-side - Degraded attention) */}
            <g transform="translate(240, 120)" className="cursor-pointer" onClick={() => onPartClick('neoglide-foam')}>
              <line x1="0" y1="-80" x2="0" y2="60" stroke="#475569" strokeWidth="6" />
              {/* Warning halo representing degraded state */}
              <ellipse cx="0" cy="-10" rx="35" ry="65" fill="rgba(249, 115, 22, 0.15)" stroke="#F97316" strokeWidth="2" strokeDasharray="4 4" className={isPlaying ? "animate-pulse" : ""} />
              <ellipse cx="0" cy="-10" rx="30" ry="60" fill="#F97316" fillOpacity="0.25" stroke="#F97316" strokeWidth="1.5" />
              
              {/* Highlighting warning indicator */}
              <g transform="translate(0, -75)">
                <circle cx="0" cy="0" r="12" fill="#0F172A" stroke="#F97316" strokeWidth="1.5" />
                <text x="-4" y="3" fill="#F97316" fontSize="10" fontWeight="bold" fontFamily="monospace">!</text>
              </g>

              {/* Foam details */}
              {[ -60, -40, -20, 0, 20, 40 ].map((y, i) => (
                <path 
                  key={i}
                  d={`M -25 ${y} Q -10 ${y+5} 0 ${y} Q 10 ${y+5} 25 ${y}`} 
                  fill="none" 
                  stroke="#FB923C" 
                  strokeWidth="2.5" 
                />
              ))}
            </g>

            {/* Swing Pneumatic cylinder controller */}
            <g transform="translate(150, 50)" className="cursor-pointer" onClick={() => onPartClick('shock-absorber')}>
              <rect x="-35" y="-10" width="70" height="16" rx="3" fill="#1E293B" stroke="#475569" strokeWidth="1" />
              <line x1="-35" y1="-2" x2="35" y2="-2" stroke="#EF4444" strokeWidth="2" />
              <text x="-30" y="22" fill="#94A3B8" fontSize="8" fontFamily="monospace">PNEUMATIC RETRACT</text>
            </g>
          </g>
        );

      case 'dryers':
        return (
          <g transform="translate(100, 30)">
            <path d="M 150 50 L 350 150 L 150 250 L -50 150 Z" fill="#131B33" stroke="#25325C" strokeWidth="2" />

            {/* Heavy Dryer Arch Framework */}
            <path d="M 30 180 L 30 40 L 270 40 L 270 180" fill="none" stroke="#1E293B" strokeWidth="14" />

            {/* Blower Housing 1 */}
            <g transform="translate(60, 60)">
              <circle cx="0" cy="0" r="22" fill="#334155" stroke="#475569" strokeWidth="2" />
              {/* Air cone nozzle */}
              <path d="M -15 15 L -25 45 L 5 45 L 15 15 Z" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
              {/* Spinning rotor wheel */}
              <circle cx="0" cy="0" r="14" fill="#0F172A" stroke="#60A5FA" strokeWidth="1.5" strokeDasharray="4 4" className={isPlaying ? "animate-spin-slow" : ""} />
            </g>

            {/* Blower Housing 2 */}
            <g transform="translate(150, 45)">
              <circle cx="0" cy="0" r="22" fill="#334155" stroke="#475569" strokeWidth="2" />
              <path d="M -10 18 L -10 50 L 10 50 L 10 18 Z" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="14" fill="#0F172A" stroke="#60A5FA" strokeWidth="1.5" strokeDasharray="4 4" className={isPlaying ? "animate-spin-slow" : ""} />
            </g>

            {/* Blower Housing 3 (ANOMALOUS VIBRATION - Attention orange) */}
            <g transform="translate(240, 60)" className="cursor-pointer" onClick={() => onPartClick('dryer-impeller')}>
              {/* Heavy vibration visual shake effect */}
              <g className={isPlaying ? "animate-bounce" : ""}>
                <circle cx="0" cy="0" r="24" fill="#3E2B1E" stroke="#F97316" strokeWidth="2.5" />
                <path d="M -15 15 L -5 45 L 25 45 L 15 15 Z" fill="#1E1610" stroke="#F97316" strokeWidth="1.5" />
                <circle cx="0" cy="0" r="14" fill="#0F172A" stroke="#F97316" strokeWidth="2" strokeDasharray="3 3" className="animate-spin-fast" />
                {/* Warning flag */}
                <circle cx="20" cy="-15" r="10" fill="#0F172A" stroke="#EF4444" strokeWidth="1.5" />
                <text x="17" y="-11" fill="#EF4444" fontSize="11" fontWeight="bold" fontFamily="monospace">!</text>
              </g>
            </g>

            {/* Mounting Dampener Brackets */}
            <g transform="translate(240, 110)" className="cursor-pointer" onClick={() => onPartClick('vibration-mounts')}>
              <rect x="-18" y="-6" width="36" height="12" rx="2" fill="#1E293B" stroke="#F97316" strokeWidth="1.5" />
              <circle cx="-10" cy="0" r="3" fill="#F97316" />
              <circle cx="10" cy="0" r="3" fill="#F97316" />
              <text x="-25" y="20" fill="#F97316" fontSize="8" fontFamily="monospace">NEOPRENE DAMPENERS</text>
            </g>

            {/* Wind flow indicators (moving particles) */}
            {isPlaying && (
              <g opacity="0.6">
                <line x1="50" y1="110" x2="50" y2="180" stroke="#60A5FA" strokeWidth="1.5" strokeDasharray="10 30" className="animate-pulse" />
                <line x1="150" y1="100" x2="150" y2="180" stroke="#60A5FA" strokeWidth="1.5" strokeDasharray="15 25" className="animate-pulse" />
                <line x1="250" y1="110" x2="250" y2="180" stroke="#F97316" strokeWidth="1.5" strokeDasharray="8 20" className="animate-pulse" />
              </g>
            )}
          </g>
        );

      case 'hydraulic':
        return (
          <g transform="translate(100, 30)">
            <path d="M 150 50 L 350 150 L 150 250 L -50 150 Z" fill="#131B33" stroke="#25325C" strokeWidth="2" />

            {/* Hydraulic Reservoir Tank Box */}
            <g transform="translate(150, 140)">
              <rect x="-60" y="-40" width="120" height="70" rx="4" fill="#1E293B" stroke="#F59E0B" strokeWidth="1.5" />
              <rect x="-60" y="-40" width="120" height="30" fill="rgba(245, 158, 11, 0.1)" />
              {/* Fluid level indicator gauge line */}
              <line x1="-60" y1="-10" x2="60" y2="-10" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 3" />
              <text x="-50" y="-20" fill="#F59E0B" fontSize="8" fontFamily="monospace">FLUID AW46 LEVEL: OK</text>
            </g>

            {/* VFD Electric Pump Motor */}
            <g transform="translate(110, 80)">
              <rect x="-20" y="-30" width="40" height="50" rx="3" fill="#334155" stroke="#475569" strokeWidth="1.5" />
              {/* Cooling fins */}
              <line x1="-15" y1="-20" x2="15" y2="-20" stroke="#1E293B" strokeWidth="2" />
              <line x1="-15" y1="-10" x2="15" y2="-10" stroke="#1E293B" strokeWidth="2" />
              <line x1="-15" y1="0" x2="15" y2="0" stroke="#1E293B" strokeWidth="2" />
              <line x1="-15" y1="10" x2="15" y2="10" stroke="#1E293B" strokeWidth="2" />
            </g>

            {/* Return Filter assembly */}
            <g transform="translate(200, 85)" className="cursor-pointer" onClick={() => onPartClick('oil-filter')}>
              <rect x="-12" y="-25" width="24" height="40" rx="4" fill="#0F172A" stroke="#F59E0B" strokeWidth="2" />
              <circle cx="0" cy="-5" r="5" fill="#F59E0B" />
              <text x="-25" y="25" fill="#94A3B8" fontSize="8" fontFamily="monospace">10μ FILTER</text>
            </g>

            {/* Nitrile Cylinders / Hose fittings with dynamic leaking alarm */}
            <g transform="translate(60, 180)" className="cursor-pointer" onClick={() => onPartClick('hydraulic-seal')}>
              <rect x="-10" y="-10" width="40" height="15" rx="2" fill="#475569" stroke="#94A3B8" strokeWidth="1" />
              {/* High pressure hose line spline */}
              <path d="M 30 -2 Q 70 -40 90 -40" fill="none" stroke="#F59E0B" strokeWidth="4" />
              <path d="M 30 -2 Q 70 -40 90 -40" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 3" />
              <text x="-20" y="18" fill="#F59E0B" fontSize="8" fontFamily="monospace">SEALS</text>
            </g>
          </g>
        );

      case 'exit-arch':
        return (
          <g transform="translate(100, 30)">
            <path d="M 150 50 L 350 150 L 150 250 L -50 150 Z" fill="#131B33" stroke="#25325C" strokeWidth="2" />

            {/* Exit Arch structure */}
            <path d="M 30 180 L 30 50 L 270 50 L 270 180" fill="none" stroke="#334155" strokeWidth="12" />

            {/* Wax application nozzle bar */}
            <line x1="50" y1="65" x2="250" y2="65" stroke="#F59E0B" strokeWidth="4" className="cursor-pointer" onClick={() => onPartClick('vjet-nozzle')} />
            {/* Wax mist particles */}
            {isPlaying && (
              <g opacity="0.4">
                {[ 70, 100, 130, 160, 190, 220 ].map((x, i) => (
                  <path 
                    key={i}
                    d={`M ${x} 65 L ${x} 140`} 
                    stroke="rgba(253, 186, 116, 0.5)" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    strokeDasharray="3 9" 
                  />
                ))}
              </g>
            )}

            {/* Asco Solenoid valve body */}
            <g transform="translate(150, 45)" className="cursor-pointer" onClick={() => onPartClick('solenoid-rebuild')}>
              <rect x="-15" y="-12" width="30" height="18" rx="2" fill="#1E293B" stroke="#10B981" strokeWidth="1.5" />
              <rect x="-8" y="-22" width="16" height="10" fill="#F59E0B" />
              <circle cx="0" cy="-2" r="3" fill="#FFFFFF" />
              <text x="-25" y="-28" fill="#10B981" fontSize="8" fontFamily="monospace">ASCO SOLENOID</text>
            </g>

            {/* GREEN GLOWING EXIT SIGN */}
            <g transform="translate(150, 100)">
              <rect x="-30" y="-12" width="60" height="24" rx="4" fill="#064E3B" stroke="#10B981" strokeWidth="2" className="animate-pulse" />
              <text x="-16" y="4" fill="#34D399" fontSize="11" fontWeight="bold" fontFamily="monospace" letterSpacing="1">EXIT</text>
            </g>
          </g>
        );

      default:
        return (
          <g transform="translate(100, 50)">
            <ellipse cx="150" cy="100" rx="100" ry="40" fill="#131B33" stroke="#25325C" strokeWidth="2" />
            <text x="90" y="105" fill="#64748B" fontSize="12" fontFamily="monospace">GENERIC MODEL</text>
          </g>
        );
    }
  };

  return (
    <div id="visualizer-viewport" className="flex-1 min-h-[380px] md:min-h-[420px] bg-[#090D1C]/50 border border-white/5 rounded-2xl p-5 flex flex-col relative overflow-hidden select-none">
      {/* Visualizer Controls Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Activity className={`w-4 h-4 ${node.status === 'Healthy' ? 'text-emerald-400' : 'text-amber-400'} animate-pulse`} />
          <span className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider">{node.name} Schematic</span>
        </div>

        <div className="flex items-center gap-4 bg-[#070A13]/80 p-1 rounded-xl border border-white/5">
          {/* 2D / 3D Toggle */}
          <div className="flex rounded-lg overflow-hidden border border-white/5 p-0.5">
            <button
              onClick={() => setViewMode('2D')}
              className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                viewMode === '2D' 
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' 
                  : 'text-slate-500 hover:text-white'
              }`}
            >
              Tunnel Map
            </button>
            <button
              onClick={() => setViewMode('3D')}
              className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                viewMode === '3D' 
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' 
                  : 'text-slate-500 hover:text-white'
              }`}
            >
              Component Detail
            </button>
          </div>

          {/* Show Status Overlay */}
          <div className="flex items-center gap-2 pr-2 border-l border-white/5 pl-4">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Status Overlays</span>
            <button 
              onClick={() => setShowStatus(!showStatus)}
              className={`w-8 h-4 rounded-full p-0.5 transition-colors cursor-pointer ${
                showStatus ? 'bg-blue-600' : 'bg-slate-700'
              }`}
            >
              <div className={`w-3 h-3 rounded-full bg-white transition-transform ${
                showStatus ? 'translate-x-4' : 'translate-x-0'
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 relative border border-white/5 rounded-xl bg-gradient-to-b from-[#060914] to-[#0A0E1D] overflow-hidden flex items-center justify-center p-4">
        {/* Absolute Background Grid lines simulating high tech Blueprint */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle, #3B82F6 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} />

        {/* Floating CJ Welcome Speech Panel */}
        {node.id === 'conveyor' && isCJWelcomeOpen && (
          <div className="absolute top-4 right-4 max-w-[260px] bg-[#090D1C]/95 backdrop-blur-md border border-blue-500/30 p-4 rounded-2xl rounded-tr-none shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-20 animate-in fade-in slide-in-from-top-2 duration-500 flex gap-3 text-left">
            <div className="relative shrink-0">
              <div className="w-9 h-9 rounded-full border border-blue-500/40 overflow-hidden relative shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                <img 
                  src="/src/assets/images/cj_ai_avatar_1783109383873.jpg" 
                  alt="CJ AI" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full border border-[#090D1C]" />
            </div>

            <div className="flex-1 min-w-0 pr-2">
              <div className="flex items-center gap-1 mb-1">
                <span className="text-[9px] font-bold text-blue-400 font-mono uppercase tracking-widest leading-none">CJ AI</span>
                <Sparkles className="w-2.5 h-2.5 text-blue-400" />
              </div>
              <p className="text-[10px] text-slate-200 leading-normal font-semibold">
                "Welcome back. I found ABC Express Wash - Miami #3. How can I help today?"
              </p>
            </div>

            <button 
              onClick={() => setIsCJWelcomeOpen(false)}
              className="absolute top-2 right-2 p-1 rounded-md text-slate-500 hover:text-white hover:bg-white/5 transition-colors cursor-pointer shrink-0"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Dynamic Warning Watermark for attention-needed assets */}
        {node.status !== 'Healthy' && showStatus && (
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-lg p-2 animate-pulse">
            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
            <span className="text-[10px] font-mono font-bold text-orange-400 uppercase tracking-widest">
              TELEMETRY: DEGRADED HEALTH ({node.status})
            </span>
          </div>
        )}

        {/* View Mode Description Banner */}
        <div className="absolute bottom-4 left-4 text-[10px] font-mono text-slate-500 flex items-center gap-1">
          <Info className="w-3.5 h-3.5 text-blue-500/70" />
          <span>{viewMode === '2D' ? "Click nodes in the map above or components below to view live details." : "Interactive Component Model: Click highlighted elements to swap parts."}</span>
        </div>

        {/* Status Indicator Legend Overlay */}
        <div className="absolute bottom-4 right-4 flex items-center gap-3 bg-[#070A13]/60 px-3 py-1.5 rounded-lg border border-white/5 text-[9px] font-semibold font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>HEALTHY</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>MONITOR</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span>ATTENTION</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span>CRITICAL</span>
          </div>
        </div>

        {/* Main Isometric Model SVG */}
        <svg 
          viewBox="0 0 500 350" 
          className={`w-full max-w-lg h-auto transition-all duration-500 ${
            viewMode === '2D' ? 'scale-100' : 'scale-105'
          }`}
        >
          {viewMode === '2D' ? renderTunnelSkeleton() : renderIsometricModel()}
        </svg>

        {/* Play/Pause Animation button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
          title={isPlaying ? "Pause simulations" : "Resume simulations"}
        >
          {isPlaying ? <RotateCw className="w-4 h-4 animate-spin-slow" /> : <Play className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
