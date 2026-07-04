import React from 'react';
import { 
  Home, 
  Layers, 
  Wrench, 
  ShoppingCart, 
  Truck, 
  Users, 
  FileText, 
  Settings, 
  Gauge,
  Activity
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openInstallBay: () => void;
}

export default function Sidebar({ activeTab, setActiveTab, openInstallBay }: SidebarProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'tunnel', label: 'Tunnel', icon: Activity },
    { id: 'install-bay', label: 'Install Bay', icon: Wrench },
    { id: 'assets', label: 'Assets', icon: Layers },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'vendors', label: 'Vendors', icon: Truck },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (id: string) => {
    if (id === 'install-bay') {
      openInstallBay();
    } else {
      setActiveTab(id);
    }
  };

  return (
    <aside id="sidebar-nav" className="w-64 bg-[#070A13] border-r border-white/5 flex flex-col justify-between h-full py-6 select-none shrink-0 relative z-20">
      {/* Brand Header with custom geometric blue logo */}
      <div className="px-6">
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center justify-center">
            {/* Layered custom circular glowing shapes representing tunnel gear */}
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center relative shadow-[0_0_15px_rgba(37,99,235,0.4)]">
              <Gauge className="w-5 h-5 text-white" />
              <div className="absolute -inset-1 rounded-full border border-blue-500/30 animate-pulse"></div>
            </div>
          </div>
          <div className="flex flex-col text-left">
            <h1 className="text-white font-black tracking-widest text-base uppercase leading-none">Tunnel</h1>
            <h1 className="text-blue-500 font-black tracking-widest text-base uppercase leading-none mt-0.5">Vision</h1>
          </div>
        </div>
      </div>

      {/* Nav List */}
      <nav className="mt-8 px-3 flex-1 space-y-1">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group relative ${
                isActive 
                  ? 'bg-blue-600/10 text-white border border-white/5' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {isActive && (
                <div className="absolute left-0 w-1 h-5 bg-blue-500 rounded-r-md"></div>
              )}
              <IconComponent className={`w-4 h-4 transition-transform duration-300 ${
                isActive ? 'text-blue-400 scale-110' : 'text-slate-500 group-hover:text-slate-300 group-hover:scale-105'
              }`} />
              <span>{item.label}</span>
              {item.id === 'install-bay' && (
                <span className="ml-auto text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-mono font-bold uppercase tracking-wider">
                  Bay
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Profile Card matching reference with BK initials badge */}
      <div className="px-4 border-t border-white/5 pt-6">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
          {/* Circular BK initials badge */}
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-extrabold flex items-center justify-center text-sm shadow-[0_0_10px_rgba(37,99,235,0.3)]">
            BK
          </div>
          <div className="min-w-0 text-left">
            <h4 className="text-white text-xs font-bold truncate">Brittney K.</h4>
            <p className="text-[10px] text-slate-500 truncate font-semibold">Customer Service</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
