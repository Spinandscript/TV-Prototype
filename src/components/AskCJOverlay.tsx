import React from 'react';
import { Sparkles, Send, X, ArrowUpRight, MessageSquare, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { EquipmentNode } from '../types';

interface AskCJOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  activeNode: EquipmentNode;
  onAutoConfigure: (partName: string) => void;
}

interface Message {
  sender: 'user' | 'cj';
  text: string;
  timestamp: string;
}

export default function AskCJOverlay({ isOpen, onClose, activeNode, onAutoConfigure }: AskCJOverlayProps) {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      sender: 'cj',
      text: `Hello! I'm CJ, your predictive maintenance companion. I'm currently tracking telemetry for **${activeNode.name}** (${activeNode.model}). Let me know if you need schematics, compatibility verification, or step-by-step install advice.`,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  // Sync initial message when active node changes
  React.useEffect(() => {
    setMessages([
      {
        sender: 'cj',
        text: `Switched focus to **${activeNode.name}** (${activeNode.model}). Telemetry status is **${activeNode.status}**. ${
          activeNode.status !== 'Healthy' 
            ? `I detected: *"${activeNode.alertMessage}"*` 
            : "All systems are reporting optimal operating baseline parameters. What would you like to verify?"
        }`,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [activeNode]);

  const handleSend = async (textToSend?: string) => {
    const prompt = textToSend || input;
    if (!prompt.trim()) return;

    if (!textToSend) setInput('');

    // Add User message
    const userMsg: Message = {
      sender: 'user',
      text: prompt,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      // Query our server-side API!
      const systemContext = `You are CJ, a customer service and operational AI assistant for ABC Express Wash car wash facility. Give precise, highly technical, yet polite advice. You are currently looking at the equipment node: ${activeNode.name} (Model: ${activeNode.model}, current health: ${activeNode.status}). Use technical specifications in your answer (e.g. lengths, pressures, currents). Recommend specific certified parts if asked. Keep responses concise (under 250 words) and formatted with clean line breaks or lists.`;

      const response = await fetch("/api/ask-cj", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, systemContext }),
      });

      if (!response.ok) {
        throw new Error("Failed to communicate with CJ AI backend.");
      }

      const data = await response.json();
      
      const cjMsg: Message = {
        sender: 'cj',
        text: data.text || "I was unable to compile a telemetry recommendation at this second. Let's inspect the physical components in the schematic.",
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, cjMsg]);

    } catch (error: any) {
      console.error(error);
      const errorMsg: Message = {
        sender: 'cj',
        text: "System communication offline. I've initiated local diagnostic mode: Sonny's replacement guidelines suggest checking water pump seal kits or hydraulic pressure cylinders if you're experiencing anomalous conveyor slack or pressure loss.",
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const quickQueries = [
    { label: `Verify ${activeNode.name} compatibility`, q: `What replacement parts are fully certified and compatible with the ${activeNode.name} ${activeNode.model}?` },
    { label: 'Diagnose anomalous vibrations', q: 'The dryers/blowers are showing anomalous vibrations. How do I balance them and check neoprene dampeners?' },
    { label: 'Check VFD hydraulic parameters', q: 'Our variable frequency drive is trending high in operating temperature. How do I service the heat exchanger and seal gaskets?' }
  ];

  if (!isOpen) return null;

  // Custom inline Markdown-like parser for simple lists and bold words
  const parseResponseText = (text: string) => {
    return text.split('\n').map((line, index) => {
      let trimmed = line.trim();
      if (!trimmed) return <div key={index} className="h-2"></div>;

      // Handle simple lists
      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        return (
          <li key={index} className="ml-4 list-disc text-xs text-slate-300 mt-1 leading-relaxed">
            {formatBoldText(trimmed.substring(2))}
          </li>
        );
      }

      // Handle ordered lists
      if (/^\d+\.\s/.test(trimmed)) {
        const dotIndex = trimmed.indexOf('.');
        return (
          <li key={index} className="ml-4 list-decimal text-xs text-slate-300 mt-1 leading-relaxed">
            {formatBoldText(trimmed.substring(dotIndex + 1).trim())}
          </li>
        );
      }

      return (
        <p key={index} className="text-xs text-slate-300 leading-relaxed mb-1">
          {formatBoldText(trimmed)}
        </p>
      );
    });
  };

  // Helper to bold text between **
  const formatBoldText = (str: string) => {
    const parts = str.split('**');
    return parts.map((part, i) => {
      if (i % 2 === 1) {
        return <strong key={i} className="text-white font-bold">{part}</strong>;
      }
      return part;
    });
  };

  return (
    <div 
      id="ask-cj-overlay"
      className="fixed inset-y-0 right-8 w-96 bg-[#090D1C]/95 backdrop-blur-xl border-l border-white/10 shadow-2xl z-50 flex flex-col justify-between select-none animate-in slide-in-from-right duration-300"
    >
      {/* Header */}
      <div className="p-4 border-b border-white/5 flex items-center justify-between shrink-0 bg-[#070A13]">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-full border border-blue-500/30 overflow-hidden relative shadow-[0_0_10px_rgba(59,130,246,0.3)]">
              <img 
                src="/src/assets/images/cj_ai_avatar_1783109383873.jpg" 
                alt="CJ AI" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-[#070A13]"></span>
          </div>
          <div className="text-left">
            <h3 className="text-white text-xs font-extrabold uppercase tracking-widest flex items-center gap-1">
              Ask CJ AI
            </h3>
            <p className="text-[9px] font-bold text-slate-500 font-mono tracking-wider uppercase">Operational Assistant</p>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="p-1.5 rounded-lg bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Logs Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={`flex gap-2.5 max-w-[90%] ${
              msg.sender === 'user' ? 'ml-auto flex-row-reverse text-right' : 'mr-auto flex-row text-left'
            }`}
          >
            {/* CJ Profile icon on left of messages */}
            {msg.sender === 'cj' && (
              <div className="w-7 h-7 rounded-full border border-blue-500/20 overflow-hidden relative shrink-0 mt-0.5 shadow-sm">
                <img 
                  src="/src/assets/images/cj_ai_avatar_1783109383873.jpg" 
                  alt="CJ AI" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}

            <div className="flex flex-col">
              <div className={`p-3 rounded-2xl border ${
                msg.sender === 'user' 
                  ? 'bg-blue-600/20 border-blue-500/30 text-white rounded-tr-none text-left' 
                  : 'bg-white/5 border-white/5 text-slate-300 rounded-tl-none'
              }`}>
                {/* If CJ sender, parse customized Markdown elements */}
                {msg.sender === 'cj' ? (
                  <div className="space-y-1 text-left">
                    {parseResponseText(msg.text)}
                  </div>
                ) : (
                  <p className="text-xs leading-relaxed">{msg.text}</p>
                )}
              </div>
              <span className={`text-[8px] font-mono text-slate-600 mt-1 uppercase tracking-wider ${
                msg.sender === 'user' ? 'text-right' : 'text-left'
              }`}>{msg.timestamp}</span>
            </div>
          </div>
        ))}

        {/* Loading Spinner */}
        {loading && (
          <div className="flex items-start gap-2.5 mr-auto max-w-[85%]">
            <div className="w-7 h-7 rounded-full border border-blue-500/20 overflow-hidden relative shrink-0 mt-0.5">
              <img 
                src="/src/assets/images/cj_ai_avatar_1783109383873.jpg" 
                alt="CJ AI" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/5 p-3 rounded-2xl rounded-tl-none">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-150"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-300"></div>
              </div>
              <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">Analyzing...</span>
            </div>
          </div>
        )}
      </div>

      {/* Quick Queries Selector */}
      <div className="p-3 border-t border-white/5 bg-[#070A13]/40 space-y-2 shrink-0">
        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block px-1">Suggested Inquiries</span>
        <div className="space-y-1.5">
          {quickQueries.map((qq, i) => (
            <button
              key={i}
              onClick={() => handleSend(qq.q)}
              className="w-full text-left p-2 rounded-lg bg-white/5 border border-white/5 hover:border-blue-500/20 text-slate-400 hover:text-white text-[10px] font-semibold flex items-center justify-between group transition-all duration-200 cursor-pointer"
            >
              <span className="truncate pr-4">{qq.label}</span>
              <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-blue-400 shrink-0 transition-colors" />
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <div className="p-4 border-t border-white/5 bg-[#070A13] shrink-0">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex gap-2"
        >
          <input
            type="text"
            placeholder={`Ask CJ about ${activeNode.name}...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            className="flex-1 h-9 px-3 bg-white/5 border border-white/5 focus:border-blue-500/50 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:bg-white/10 transition-all"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="w-9 h-9 rounded-lg bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition-colors disabled:opacity-50 disabled:hover:bg-blue-600 cursor-pointer shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
