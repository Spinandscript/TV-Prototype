import React from 'react';
import { 
  Wrench, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle, 
  ChevronRight, 
  ChevronLeft, 
  Cpu, 
  Building, 
  Save, 
  RotateCcw,
  RefreshCw,
  FolderSync
} from 'lucide-react';
import { EquipmentNode, Part, InstallStepState } from '../types';

interface InstallBayProps {
  nodes: EquipmentNode[];
  activeNode: EquipmentNode;
  stepState: InstallStepState;
  setStepState: React.Dispatch<React.SetStateAction<InstallStepState>>;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  onCommitUpdate: (log: { date: string; action: string; technician: string; notes: string }) => void;
}

export default function InstallBay({
  nodes,
  activeNode,
  stepState,
  setStepState,
  isOpen,
  setIsOpen,
  onCommitUpdate
}: InstallBayProps) {
  
  const handleNext = () => {
    if (stepState.step < 5) {
      setStepState(prev => ({ ...prev, step: prev.step + 1 }));
    }
  };

  const handlePrev = () => {
    if (stepState.step > 1) {
      setStepState(prev => ({ ...prev, step: prev.step - 1 }));
    }
  };

  const handleSave = () => {
    // Commit the update back to the state log
    const targetAsset = nodes.find(n => n.id === stepState.selectedAssetId) || activeNode;
    const targetPart = targetAsset.compatibleParts.find(p => p.id === stepState.selectedPartId) || targetAsset.compatibleParts[0];

    onCommitUpdate({
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      action: stepState.actionType === 'replace' ? 'Component Replacement' : 'Operational Adjustments',
      technician: 'Brittney K. (Authorized CSR)',
      notes: `Successfully executed maintenance: ${stepState.actionType === 'replace' ? 'Replaced' : 'Serviced'} ${targetAsset.name} using component: ${targetPart ? targetPart.name : 'Manufacturer OEM Spares'}. Model database successfully updated.`
    });

    setStepState(prev => ({ ...prev, isSaved: true }));
  };

  const handleReset = () => {
    setStepState({
      step: 1,
      selectedAssetId: activeNode.id,
      actionType: 'replace',
      selectedPartId: activeNode.compatibleParts[0]?.id || '',
      quantity: 1,
      vendor: activeNode.vendor,
      distributor: activeNode.distributor,
      isSaved: false
    });
  };

  const selectedNode = nodes.find(n => n.id === stepState.selectedAssetId) || activeNode;
  const selectedPart = selectedNode.compatibleParts.find(p => p.id === stepState.selectedPartId) || selectedNode.compatibleParts[0];

  return (
    <div 
      id="install-bay-panel" 
      className={`fixed bottom-0 left-64 right-80 bg-[#0A0F21]/95 backdrop-blur-lg border-t border-white/5 transition-all duration-300 z-40 flex flex-col select-none ${
        isOpen ? 'h-80 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]' : 'h-11'
      }`}
    >
      {/* Collapsible Header bar */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="h-11 px-6 border-b border-white/5 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-all"
      >
        <div className="flex items-center gap-2">
          <Wrench className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-bold text-white tracking-wide uppercase">Install Bay Workspace Wizard</span>
          {!isOpen && (
            <div className="flex items-center gap-2 ml-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="text-[10px] text-slate-500 font-mono">
                Asset: {selectedNode.name} • Step {stepState.step}/5
              </span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          {stepState.isSaved && (
            <span className="text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
              TUNNEL MODEL SYNCED
            </span>
          )}
          {isOpen ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronUp className="w-4 h-4 text-slate-400" />}
        </div>
      </div>

      {/* Main Wizard Content Area */}
      {isOpen && (
        <div className="flex-1 flex overflow-hidden">
          {/* Stepper Sidebar indicators */}
          <div className="w-44 border-r border-white/5 p-4 flex flex-col justify-between shrink-0 bg-[#070A13]/40">
            <div className="space-y-1.5">
              {[
                { s: 1, label: 'Select Asset' },
                { s: 2, label: 'Select Action' },
                { s: 3, label: 'New Component' },
                { s: 4, label: 'Confirm Vendor' },
                { s: 5, label: 'Review & Save' }
              ].map((st) => (
                <div 
                  key={st.s}
                  className={`flex items-center gap-2 px-2 py-1 rounded text-[11px] font-semibold transition-all ${
                    stepState.step === st.s 
                      ? 'bg-blue-600/10 text-white' 
                      : stepState.step > st.s 
                        ? 'text-emerald-400' 
                        : 'text-slate-500'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-mono ${
                    stepState.step === st.s 
                      ? 'bg-blue-500 text-white font-bold' 
                      : stepState.step > st.s 
                        ? 'bg-emerald-500/20 text-emerald-400' 
                        : 'bg-white/5 text-slate-500'
                  }`}>
                    {stepState.step > st.s ? '✓' : st.s}
                  </div>
                  <span>{st.label}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={handleReset}
              className="w-full py-1.5 rounded-lg border border-white/5 bg-white/5 text-[10px] font-bold text-slate-400 hover:text-white hover:bg-white/10 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Wizard</span>
            </button>
          </div>

          {/* Stepper Body Frame */}
          <div className="flex-1 p-5 flex flex-col justify-between overflow-y-auto">
            {stepState.isSaved ? (
              /* Step success completion view */
              <div className="flex-1 flex flex-col items-center justify-center text-center max-w-md mx-auto">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3 animate-bounce">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-white font-bold text-sm">Tunnel Model Updated!</h3>
                <p className="text-slate-400 text-[11px] leading-relaxed mt-1">
                  The component swap is logged. The 3D isometric operational model and technical logs for <span className="text-white font-semibold font-mono">{selectedNode.name}</span> have been synchronized.
                </p>
                <div className="flex gap-2 mt-4">
                  <button 
                    onClick={handleReset}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[11px] cursor-pointer"
                  >
                    Configure Another
                  </button>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-slate-400 hover:text-white text-[11px] font-semibold cursor-pointer"
                  >
                    Close Bay
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Active step display */}
                <div className="flex-1 overflow-y-auto">
                  {stepState.step === 1 && (
                    <div className="space-y-3">
                      <h4 className="text-white text-xs font-bold uppercase tracking-wider text-slate-400">Step 1: Select Active Asset</h4>
                      <p className="text-slate-400 text-[11px]">Select which equipment node requires operational or part modifications:</p>
                      <div className="grid grid-cols-4 gap-2">
                        {nodes.map(node => (
                          <button
                            key={node.id}
                            onClick={() => setStepState(prev => ({ ...prev, selectedAssetId: node.id }))}
                            className={`p-2 rounded-xl text-left border text-xs font-semibold transition-all ${
                              stepState.selectedAssetId === node.id 
                                ? 'bg-blue-600/15 border-blue-500 text-white' 
                                : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/10'
                            }`}
                          >
                            <p className="truncate">{node.name}</p>
                            <span className="text-[9px] font-mono font-medium text-slate-500">{node.model}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {stepState.step === 2 && (
                    <div className="space-y-3">
                      <h4 className="text-white text-xs font-bold uppercase tracking-wider text-slate-400">Step 2: Select Maintenance Action</h4>
                      <p className="text-slate-400 text-[11px]">Specify the physical engineering procedure being executed:</p>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setStepState(prev => ({ ...prev, actionType: 'replace' }))}
                          className={`flex-1 p-3 rounded-xl border text-left transition-all ${
                            stepState.actionType === 'replace'
                              ? 'bg-blue-600/15 border-blue-500 text-white'
                              : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/10'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Cpu className="w-4 h-4 text-blue-400" />
                            <span className="text-xs font-bold">Replace Component / Part</span>
                          </div>
                          <p className="text-[10px] text-slate-500 mt-1">Replacing worn parts with dynamic model matching and inventory logs.</p>
                        </button>

                        <button
                          onClick={() => setStepState(prev => ({ ...prev, actionType: 'calibrate' }))}
                          className={`flex-1 p-3 rounded-xl border text-left transition-all ${
                            stepState.actionType === 'calibrate'
                              ? 'bg-blue-600/15 border-blue-500 text-white'
                              : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/10'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-blue-400" />
                            <span className="text-xs font-bold">Tune-Up & Calibrate</span>
                          </div>
                          <p className="text-[10px] text-slate-500 mt-1">Recalibrating sensors, spray nozzles, or adjusting electrical VFD parameters.</p>
                        </button>
                      </div>
                    </div>
                  )}

                  {stepState.step === 3 && (
                    <div className="space-y-3">
                      <h4 className="text-white text-xs font-bold uppercase tracking-wider text-slate-400">Step 3: Select New Compatible Component</h4>
                      <p className="text-slate-400 text-[11px]">Select a certified replacement component compatible with <span className="text-white font-semibold">{selectedNode.name}</span>:</p>
                      
                      {selectedNode.compatibleParts.length > 0 ? (
                        <div className="flex gap-3">
                          {selectedNode.compatibleParts.map(part => (
                            <button
                              key={part.id}
                              onClick={() => setStepState(prev => ({ ...prev, selectedPartId: part.id }))}
                              className={`flex-1 p-3 rounded-xl border text-left transition-all ${
                                stepState.selectedPartId === part.id
                                  ? 'bg-blue-600/15 border-blue-500 text-white'
                                  : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/10'
                              }`}
                            >
                              <div className="flex justify-between items-start">
                                <span className="text-xs font-bold">{part.name}</span>
                                <span className="text-xs font-mono font-bold text-slate-300">{part.price}</span>
                              </div>
                              <p className="text-[10px] text-slate-500 mt-1">Compatible model code: {part.compatibilityCode}</p>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-rose-400">No recommended matching replacement components loaded in stock for this asset.</p>
                      )}

                      {/* Quantity input selector */}
                      <div className="flex items-center gap-3 pt-2">
                        <span className="text-xs font-semibold text-slate-500">Execution Quantity:</span>
                        <div className="flex items-center rounded-lg overflow-hidden border border-white/5 bg-white/5 p-0.5">
                          <button 
                            onClick={() => setStepState(prev => ({ ...prev, quantity: Math.max(1, prev.quantity - 1) }))}
                            className="px-2 py-0.5 text-xs font-bold text-slate-400 hover:text-white"
                          >
                            -
                          </button>
                          <span className="px-3 text-xs font-bold font-mono text-white">{stepState.quantity}</span>
                          <button 
                            onClick={() => setStepState(prev => ({ ...prev, quantity: prev.quantity + 1 }))}
                            className="px-2 py-0.5 text-xs font-bold text-slate-400 hover:text-white"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {stepState.step === 4 && (
                    <div className="space-y-3">
                      <h4 className="text-white text-xs font-bold uppercase tracking-wider text-slate-400">Step 4: Confirm Logistics & Vendor details</h4>
                      <p className="text-slate-400 text-[11px]">Confirm procurement and supplier parameters for audit traceability:</p>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">OEM Sourcing Manufacturer</label>
                          <div className="relative">
                            <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input 
                              type="text" 
                              value={stepState.vendor} 
                              onChange={(e) => setStepState(prev => ({ ...prev, vendor: e.target.value }))}
                              className="w-full h-9 pl-9 pr-3 rounded-lg border border-white/5 bg-white/5 text-xs text-white focus:outline-none focus:border-blue-500"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Local Logistics Distributor</label>
                          <div className="relative">
                            <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input 
                              type="text" 
                              value={stepState.distributor} 
                              onChange={(e) => setStepState(prev => ({ ...prev, distributor: e.target.value }))}
                              className="w-full h-9 pl-9 pr-3 rounded-lg border border-white/5 bg-white/5 text-xs text-white focus:outline-none focus:border-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {stepState.step === 5 && (
                    <div className="space-y-3">
                      <h4 className="text-white text-xs font-bold uppercase tracking-wider text-slate-400">Step 5: Review changes & Update model</h4>
                      <p className="text-slate-400 text-[11px]">Please review specifications. Proceeding will apply these changes directly to the live facility model:</p>
                      
                      <div className="bg-white/5 rounded-xl border border-white/5 p-3 grid grid-cols-3 gap-4 text-xs">
                        <div className="space-y-0.5">
                          <span className="text-slate-500 font-medium">Target Machinery:</span>
                          <p className="text-white font-bold font-mono">{selectedNode.name}</p>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-slate-500 font-medium">Installed Component:</span>
                          <p className="text-white font-bold truncate">{selectedPart ? selectedPart.name : 'Manufacturer OEM Spares'}</p>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-slate-500 font-medium">Logistics Supplier:</span>
                          <p className="text-white font-bold">{stepState.vendor} / {stepState.distributor}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Back and Next Controls footer */}
                <div className="flex items-center justify-between border-t border-white/5 pt-3 shrink-0">
                  <button
                    onClick={handlePrev}
                    disabled={stepState.step === 1}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 cursor-pointer ${
                      stepState.step === 1 
                        ? 'border-white/5 text-slate-600 bg-white/5 cursor-not-allowed' 
                        : 'border-white/5 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  {stepState.step === 5 ? (
                    <button
                      onClick={handleSave}
                      className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/10 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Review & Save</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleNext}
                      className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1 shadow-lg shadow-blue-500/10 cursor-pointer"
                    >
                      <span>Continue</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
