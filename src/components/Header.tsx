import React from 'react';
import { Search, Bell, Sparkles, MapPin, ChevronDown, RotateCcw } from 'lucide-react';

interface HeaderProps {
  onSearchChange: (val: string) => void;
  onAskCJClick: () => void;
  searchVal: string;
  onResetCall?: () => void;
}

export default function Header({ onSearchChange, onAskCJClick, searchVal, onResetCall }: HeaderProps) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('global-search') as HTMLInputElement;
        if (searchInput) searchInput.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header id="header-bar" className="h-24 bg-[#070A13] px-6 flex items-center justify-between shrink-0 select-none relative z-10">
      {/* Brand & Location block matching reference */}
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1 text-slate-400 text-[11px] font-bold uppercase tracking-wider cursor-pointer hover:text-white transition-colors">
          <span>ABC Express Wash</span>
          <ChevronDown className="w-3 h-3 text-slate-500" />
        </div>
        
        <div className="flex items-center gap-2.5 mt-1">
          <h2 className="text-white text-2xl font-extrabold tracking-tight leading-none">Miami #3</h2>
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-extrabold font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 uppercase tracking-widest">
            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse"></span>
            Active
          </span>
        </div>
        
        <div className="flex items-center gap-1 mt-1.5 text-slate-500 text-[10px] font-medium font-mono">
          <MapPin className="w-3 h-3 text-slate-600" />
          <span>1234 SW 8th St, Miami, FL 33130</span>
        </div>
      </div>

      {/* Center Search Input */}
      <div className="relative w-80">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          id="global-search"
          type="text"
          placeholder="Search anything..."
          value={searchVal}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full h-9 pl-10 pr-12 bg-white/5 border border-white/5 hover:border-white/10 focus:border-blue-500/30 focus:bg-white/10 rounded-full text-xs text-white placeholder-slate-500 focus:outline-none transition-all duration-200"
        />
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-[9px] text-slate-600 font-mono select-none pointer-events-none">
          <span>⌘</span>
          <span>K</span>
        </div>
      </div>

      {/* Right User Actions Block */}
      <div className="flex items-center gap-5">
        {/* Reset Simulator Button */}
        {onResetCall && (
          <button
            onClick={onResetCall}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-[11px] font-bold transition-all duration-200 cursor-pointer border border-white/5 hover:border-white/10"
            title="Return to the incoming call screen"
          >
            <RotateCcw className="w-3.5 h-3.5 text-blue-400" />
            <span>Simulate Call</span>
          </button>
        )}

        {/* Ask CJ Trigger Button */}
        <button
          onClick={onAskCJClick}
          className="flex items-center gap-1.5 text-slate-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
          <span>Ask CJ</span>
        </button>

        {/* Notification Bell Icon */}
        <button className="relative p-1.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-all cursor-pointer">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose-500 text-[9px] font-bold text-white rounded-full flex items-center justify-center border border-[#070A13]">
            9
          </span>
        </button>

        {/* User Portrait Avatar */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full border border-white/10 overflow-hidden relative shadow-inner cursor-pointer hover:border-blue-400/50 transition-colors">
            <img 
              src="/src/assets/images/brittney_profile_1783109432669.jpg" 
              alt="Brittney K." 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-500 cursor-pointer hover:text-white" />
        </div>
      </div>
    </header>
  );
}
