import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import NodeMap from './components/NodeMap';
import Visualizer from './components/Visualizer';
import RecommendationBanner from './components/RecommendationBanner';
import DetailDrawer from './components/DetailDrawer';
import InstallBay from './components/InstallBay';
import AskCJOverlay from './components/AskCJOverlay';
import { EQUIPMENT_NODES } from './data';
import { EquipmentNode, Part, InstallStepState, HealthStatus } from './types';
import { Sparkles, CheckCircle2, ShieldAlert, FileText, AlertCircle, PhoneCall, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [hasOpenedTunnel, setHasOpenedTunnel] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('tunnel');
  const [nodes, setNodes] = React.useState<EquipmentNode[]>(EQUIPMENT_NODES);
  const [selectedNodeId, setSelectedNodeId] = React.useState('conveyor');
  const [searchVal, setSearchVal] = React.useState('');
  const [viewMode, setViewMode] = React.useState<'2D' | '3D'>('3D');
  const [showStatus, setShowStatus] = React.useState(true);
  
  // Install Bay overlay states
  const [isInstallBayOpen, setIsInstallBayOpen] = React.useState(false);
  const [stepState, setStepState] = React.useState<InstallStepState>({
    step: 1,
    selectedAssetId: 'conveyor',
    actionType: 'replace',
    selectedPartId: 'conveyor-chain',
    quantity: 1,
    vendor: 'Sonny\'s',
    distributor: 'Wash Equipment Co.',
    isSaved: false
  });

  // Ask CJ panel states
  const [isAskCJOpen, setIsAskCJOpen] = React.useState(false);

  // Active Node getter
  const activeNode = React.useMemo(() => {
    return nodes.find(n => n.id === selectedNodeId) || nodes[2]; // fallback to conveyor
  }, [nodes, selectedNodeId]);

  // Sync default part when active node changes
  React.useEffect(() => {
    if (!stepState.isSaved) {
      setStepState(prev => ({
        ...prev,
        selectedAssetId: activeNode.id,
        selectedPartId: activeNode.compatibleParts[0]?.id || '',
        vendor: activeNode.vendor,
        distributor: activeNode.distributor,
      }));
    }
  }, [activeNode]);

  // Handle auto-configuration when clicking "Install" on recommended cards
  const handleAutoConfigure = (part: Part) => {
    setStepState({
      step: 5, // Jump directly to Review & Save for speed, or let them review
      selectedAssetId: activeNode.id,
      actionType: 'replace',
      selectedPartId: part.id,
      quantity: part.qty,
      vendor: part.vendor || activeNode.vendor,
      distributor: activeNode.distributor,
      isSaved: false
    });
    setIsInstallBayOpen(true);
  };

  // Handle generic part click from visualizer
  const handlePartClickFromVisualizer = (partId: string) => {
    const matchingPart = activeNode.compatibleParts.find(p => p.id === partId);
    if (matchingPart) {
      handleAutoConfigure(matchingPart);
    }
  };

  const handleGenerateQuote = (part: Part) => {
    // Surface a beautiful custom notification showing quote generated successfully
    const notification = document.getElementById('global-alert');
    if (notification) {
      notification.innerText = `QUOTE GENERATED: Reference #${Math.floor(100000 + Math.random() * 900000)} for ${part.qty}x ${part.name} has been processed with ${part.vendor}.`;
      notification.classList.remove('translate-y-24', 'opacity-0');
      setTimeout(() => {
        notification.classList.add('translate-y-24', 'opacity-0');
      }, 5000);
    }
  };

  // Commit dynamic update back to our React state
  const handleCommitUpdate = (newLog: { date: string; action: string; technician: string; notes: string }) => {
    setNodes(prevNodes => {
      return prevNodes.map(node => {
        if (node.id === stepState.selectedAssetId) {
          return {
            ...node,
            status: 'Healthy', // Overhaul restores degraded systems instantly!
            serviceHistory: [newLog, ...node.serviceHistory],
            alertMessage: `System overhauled on ${newLog.date}. Baseline parameters restored to peak commercial operational values.`
          };
        }
        return node;
      });
    });
  };

  // Filter nodes based on search value (match component, vendor, distributor or part number)
  const filteredNodes = React.useMemo(() => {
    if (!searchVal.trim()) return nodes;
    const lower = searchVal.toLowerCase();
    return nodes.filter(node => {
      return (
        node.name.toLowerCase().includes(lower) ||
        node.model.toLowerCase().includes(lower) ||
        node.compatibleParts.some(p => p.name.toLowerCase().includes(lower) || p.compatibilityCode.toLowerCase().includes(lower))
      );
    });
  }, [nodes, searchVal]);

  return (
    <div className="w-screen h-screen bg-[#070A13] flex overflow-hidden font-sans text-white relative">
      <AnimatePresence mode="wait">
        {!hasOpenedTunnel ? (
          <motion.div
            key="call-screen"
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05, y: -10, filter: 'blur(8px)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-50 bg-gradient-to-tr from-[#050811] via-[#090D1C] to-[#0A0F21] flex flex-col items-center justify-center p-6 text-center select-none"
          >
            {/* Ambient High-End Glowing Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[120px]" />
              <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-emerald-600/5 blur-[120px]" />
              <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: 'radial-gradient(circle, #3B82F6 1px, transparent 1px)',
                backgroundSize: '32px 32px'
              }} />
            </div>

            {/* Apple-level glass-morphic call box card */}
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-md w-full bg-[#0A0F21]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col items-center gap-7 relative z-10"
            >
              {/* Pulsing Concentric Ring Telephone Ring Indicator */}
              <div className="relative">
                <div className="absolute -inset-4 rounded-full bg-emerald-500/20 animate-ping opacity-75" />
                <div className="absolute -inset-8 rounded-full bg-emerald-500/10 animate-pulse opacity-40" />
                <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center text-white relative z-10 shadow-[0_0_25px_rgba(16,185,129,0.5)]">
                  <PhoneCall className="w-8 h-8 animate-bounce" />
                </div>
              </div>

              {/* Call Details Container */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block font-mono">Incoming Customer Call</span>
                <h2 className="text-3xl font-black text-white tracking-tight">ABC Express Wash</h2>
                <div className="inline-flex items-center gap-1.5 text-[10px] font-bold bg-blue-500/10 text-blue-400 px-2.5 py-0.5 rounded-full border border-blue-500/20 font-mono uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                  <span>Miami #3</span>
                </div>
              </div>

              {/* Customer Problem Statement Quote Box */}
              <div className="w-full bg-[#070A13]/60 border border-white/5 rounded-2xl p-5 text-left relative">
                <span className="absolute -top-2.5 left-4 text-[9px] font-bold text-slate-500 uppercase tracking-wider bg-[#0A0F21] px-2 font-mono">
                  Reported Problem
                </span>
                <p className="text-xs text-slate-300 italic leading-relaxed mt-1">
                  "Hey, I think I need a new conveyor chain. We're not really sure which conveyor we have, how long the conveyor is, whether it has been replaced before, or which parts are currently installed in our track."
                </p>
              </div>

              {/* Operational Comparison Explainer */}
              <div className="w-full space-y-3 text-left border-t border-white/5 pt-5">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">The Legacy Search Trap</p>
                <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 font-semibold font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="text-rose-500 font-bold">✕</span>
                    <span>Query spreadsheets</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-rose-500 font-bold">✕</span>
                    <span>Audit order history</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-rose-500 font-bold">✕</span>
                    <span>Browse manufacturer PDFs</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-rose-500 font-bold">✕</span>
                    <span>Ask Technical Support</span>
                  </div>
                </div>

                {/* Tunnel Vision Advantage banner */}
                <div className="bg-blue-950/15 border border-blue-500/10 rounded-xl p-3 text-[10px] text-blue-300 leading-relaxed font-semibold mt-2 flex gap-2.5">
                  <Sparkles className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Tunnel Vision</strong> aggregates all telemetry data in one living operational model, bypassing disconnected systems.
                  </span>
                </div>
              </div>

              {/* Magical Open Tunnel CTA Button */}
              <button
                onClick={() => setHasOpenedTunnel(true)}
                className="w-full py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs tracking-widest uppercase transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(37,99,235,0.25)] hover:shadow-[0_0_35px_rgba(37,99,235,0.5)] flex items-center justify-center gap-2 cursor-pointer mt-2 group"
              >
                <span>Open Tunnel</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="main-app"
            initial={{ opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'none' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full flex overflow-hidden"
          >
            {/* Persistent Left Sidebar Navigation */}
            <Sidebar 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              openInstallBay={() => setIsInstallBayOpen(true)}
            />

            {/* Main Workspace Frame */}
            <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
              
              {/* Header Bar */}
              <Header 
                onSearchChange={setSearchVal} 
                onAskCJClick={() => setIsAskCJOpen(true)} 
                searchVal={searchVal}
                onResetCall={() => setHasOpenedTunnel(false)}
              />

              {/* Global Floating Action Notification Bar */}
              <div 
                id="global-alert"
                className="fixed bottom-16 left-1/2 -translate-x-1/2 px-4 py-2.5 rounded-xl bg-blue-600/90 border border-blue-400 text-xs font-semibold text-white shadow-xl pointer-events-none transition-all duration-300 translate-y-24 opacity-0 z-50 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-blue-100 animate-pulse" />
                <span>Quote processing complete...</span>
              </div>

              {/* Core Screen Router */}
              {activeTab === 'tunnel' ? (
                <div className="flex-1 flex min-h-0 overflow-hidden relative">
                  
                  {/* Center + Right Split viewport */}
                  <div className="flex-1 flex flex-col p-5 gap-5 min-h-0 overflow-y-auto scrollbar-thin">
                    
                    {/* Linear Equipment Node Map Sequence */}
                    <NodeMap 
                      nodes={filteredNodes} 
                      selectedNodeId={selectedNodeId} 
                      onSelectNode={setSelectedNodeId} 
                    />

                    {/* Isometric 2D/3D Viewer Section */}
                    <Visualizer 
                      node={activeNode} 
                      showStatus={showStatus}
                      setShowStatus={setShowStatus}
                      viewMode={viewMode}
                      setViewMode={setViewMode}
                      onPartClick={handlePartClickFromVisualizer}
                      onSelectNode={setSelectedNodeId}
                    />

                    {/* Dynamic Contextual Recommendations Banner */}
                    <RecommendationBanner 
                      node={activeNode} 
                      onOpenInstallBay={handleAutoConfigure}
                      onGenerateQuote={handleGenerateQuote}
                    />
                  </div>

                  {/* Right Technical Specification detail column */}
                  <DetailDrawer 
                    node={activeNode} 
                    onInstallClick={(partId) => {
                      const part = activeNode.compatibleParts.find(p => p.id === partId);
                      if (part) handleAutoConfigure(part);
                    }}
                  />

                  {/* Bottom-Docked Install Bay Stepper Wizard */}
                  <InstallBay 
                    nodes={nodes}
                    activeNode={activeNode}
                    stepState={stepState}
                    setStepState={setStepState}
                    isOpen={isInstallBayOpen}
                    setIsOpen={setIsInstallBayOpen}
                    onCommitUpdate={handleCommitUpdate}
                  />

                  {/* AI Assistant Chat Companion Overlay */}
                  <AskCJOverlay 
                    isOpen={isAskCJOpen} 
                    onClose={() => setIsAskCJOpen(false)} 
                    activeNode={activeNode}
                    onAutoConfigure={(partName) => {
                      const part = activeNode.compatibleParts.find(p => p.name.includes(partName));
                      if (part) handleAutoConfigure(part);
                    }}
                  />
                </div>
              ) : (
                /* Plain elegant fallback landing plates for secondary navigation indices */
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-lg mx-auto">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-500 mb-4">
                    <FileText className="w-6 h-6 text-blue-400" />
                  </div>
                  <h2 className="text-white text-lg font-bold uppercase tracking-wider">{activeTab} Database Ledger</h2>
                  <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                    Brittney K., you are currently viewing the live active Tunnel model view. Secondary reports, customer records, and ledger settings are indexed within the primary workspace map. Click **"Tunnel"** in the sidebar to return to the living physical schematics.
                  </p>
                  <button
                    onClick={() => setActiveTab('tunnel')}
                    className="mt-6 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold transition-all cursor-pointer"
                  >
                    Return to Tunnel Map
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
