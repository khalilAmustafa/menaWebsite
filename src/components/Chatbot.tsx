import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, RotateCcw, AlertTriangle, ChevronDown } from 'lucide-react';

interface ChatbotProps {
  isArabic: boolean;
}

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

const API_KEY = (import.meta as any).env?.VITE_GEMINI_API_KEY || "";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

export default function Chatbot({ isArabic }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [kb, setKb] = useState<string>('');
  const [kbError, setKbError] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggested questions in English and Arabic
  const suggestions = isArabic
    ? [
        { text: "ما هي مؤسسة مِنا؟", query: "What is MENA Organization?" },
        { text: "من هو مؤسس المؤسسة؟", query: "Who is the founder of MENA?" },
        { text: "ما هي محاكاة المريخ؟", query: "Tell me about Jordan Analog Mars Missions in Wadi Rum" },
        { text: "كيف يمكنني التطوع؟", query: "How can I join or volunteer for MENA?" }
      ]
    : [
        { text: "What is MENA?", query: "What is MENA Organization?" },
        { text: "Who is the founder?", query: "Who is the founder and CEO of MENA?" },
        { text: "What is an analog mission?", query: "What are the analog Mars missions in Wadi Rum?" },
        { text: "How can I join?", query: "How can I join or volunteer for MENA?" }
      ];

  // Load knowledge base
  useEffect(() => {
    if (isOpen && !kb) {
      fetch('/mena_kb.txt')
        .then((res) => {
          if (!res.ok) throw new Error('Failed to load KB');
          return res.text();
        })
        .then((text) => {
          setKb(text);
          setKbError(false);
        })
        .catch((err) => {
          console.error('Error fetching knowledge base:', err);
          setKbError(true);
        });
    }
  }, [isOpen, kb]);

  // Set greeting when starting
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          sender: 'bot',
          text: isArabic
            ? "مرحباً بك! أنا مساعد مِنا الفضائي الذكي. كيف يمكنني مساعدتك اليوم بخصوص برامج الفضاء والتدريب الخاصة بنا؟"
            : "Hello! I am the MENA Space AI Assistant. How can I help you today regarding our aerospace training, analog missions, and STEM programs?",
          timestamp: new Date()
        }
      ]);
    }
  }, [isArabic, messages.length]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (textToSend: string) => {
    const query = textToSend.trim();
    if (!query) return;

    // Add user message
    const userMsg: Message = {
      id: Math.random().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Create conversation history string for context
      const chatHistory = messages
        .filter((m) => m.id !== 'welcome')
        .slice(-6) // Take last 6 messages for context
        .map((m) => `${m.sender === 'user' ? 'User' : 'Assistant'}: ${m.text}`)
        .join('\n');

      const systemPrompt = `You are the official AI assistant for MENA (Middle East and North Africa Engineering Education and Training Organization).

Rules:
- Answer only using the provided knowledge base. Do not make up any information.
- Be concise, professional, and precise.
- If the information is not in the knowledge base, respond exactly with:
  ${isArabic 
    ? `"لم أتمكن من العثور على هذه المعلومات في قاعدة بيانات مِنا، يرجى التواصل مع مستشار مِنا للحصول على مزيد من المعلومات."`
    : `"I could not find that information in the MENA knowledge base, please contact a MENA advisor for more information."`
  }
- Keep responses professional and well-structured, using bullet points where helpful.
- Respond in the language of the user's question (Arabic if they ask in Arabic, English if in English).

Knowledge Base:
${kb || "MENA Organization is a space-related analog mission training organization in Jordan led by Salam Abu Alhayjaa."}

Conversation History:
${chatHistory}

User: ${query}
Assistant:`;

      const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: systemPrompt }]
            }
          ],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 800
          }
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      const answerText = data.candidates?.[0]?.content?.parts?.[0]?.text || 
        (isArabic ? "معذرة، لم أتمكن من معالجة هذا الطلب." : "Sorry, I couldn't process this request.");

      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: 'bot',
          text: answerText,
          timestamp: new Date()
        }
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: 'bot',
          text: isArabic
            ? "عذراً، واجهت مشكلة في الاتصال بنظام الذكاء الاصطناعي. يرجى التحقق من اتصالك بالإنترنت."
            : "Sorry, I encountered a connection issue with the AI system. Please verify your internet connection.",
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'bot',
        text: isArabic
          ? "مرحباً بك! أنا مساعد مِنا الفضائي الذكي. كيف يمكنني مساعدتك اليوم بخصوص برامج الفضاء والتدريب الخاصة بنا؟"
          : "Hello! I am the MENA Space AI Assistant. How can I help you today regarding our aerospace training, analog missions, and STEM programs?",
        timestamp: new Date()
      }
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans flex flex-col items-end">
      
      {/* Floating Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="w-[360px] sm:w-[400px] h-[550px] bg-neutral-950/95 border border-brand-teal/20 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(203,173,142,0.1)] flex flex-col overflow-hidden backdrop-blur-lg mb-4 text-left rtl:text-right"
          >
            {/* Header */}
            <div className="bg-neutral-900 border-b border-brand-teal/10 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-brand-teal/10 border border-brand-teal/30 flex items-center justify-center text-brand-teal">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold tracking-wider text-white uppercase">
                    {isArabic ? "مساعد مِنا الذكي" : "MENA Space AI Assistant"}
                  </h4>
                  <span className="text-[9px] font-mono text-brand-teal flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-ping" />
                    {isArabic ? "متصل بالنظام" : "TELEMETRY LINK ACTIVE"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  title={isArabic ? "إعادة بدء المحادثة" : "Reset Chat"}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Warning if Knowledge Base fails to load */}
            {kbError && (
              <div className="bg-red-950/40 border-b border-red-500/20 px-4 py-2 flex items-center gap-2 text-red-400 text-[10px] font-mono">
                <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{isArabic ? "فشل تحميل قاعدة المعرفة الفضائية." : "Failed to sync flight knowledge base."}</span>
              </div>
            )}

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-brand-teal/20">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-brand-teal text-black font-semibold rounded-tr-none'
                        : 'bg-neutral-900 border border-neutral-800 text-neutral-200 rounded-tl-none whitespace-pre-wrap'
                    }`}
                  >
                    {msg.text}
                    <div
                      className={`text-[8px] mt-1 text-right ${
                        msg.sender === 'user' ? 'text-black/60' : 'text-neutral-500'
                      }`}
                    >
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}

              {/* Suggestions */}
              {messages.length === 1 && (
                <div className="space-y-1.5 pt-2">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wide block mb-1">
                    {isArabic ? "أسئلة مقترحة:" : "Suggested Systems:"}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {suggestions.map((sug, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(sug.query)}
                        className="text-[10px] bg-neutral-900 hover:bg-brand-teal/10 hover:border-brand-teal/30 border border-neutral-800 text-neutral-300 hover:text-white px-2.5 py-1.5 rounded-lg transition-all text-left rtl:text-right cursor-pointer"
                      >
                        {sug.text}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Typing Indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-neutral-900 border border-neutral-800 text-neutral-400 rounded-2xl rounded-tl-none px-3.5 py-3.5 text-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="p-3 bg-neutral-900 border-t border-brand-teal/10 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  isArabic
                    ? "اسأل عن مهام مِنا الفضائية..."
                    : "Ask about MENA missions..."
                }
                className="flex-1 bg-neutral-950 border border-neutral-850 hover:border-brand-teal/20 focus:border-brand-teal/60 focus:ring-0 focus:outline-none rounded-2xl px-3 py-2 text-xs text-white placeholder-neutral-500 font-sans transition-all"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-2 rounded-2xl bg-brand-teal text-black hover:bg-brand-teal/80 disabled:bg-neutral-800 disabled:text-neutral-600 transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-tr from-brand-teal to-brand-teal-hover text-black rounded-full shadow-[0_4px_20px_rgba(203,173,142,0.4)] flex items-center justify-center cursor-pointer border border-brand-teal/20 relative group"
        aria-label="Toggle Chatbot"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-6 h-6 text-black font-extrabold" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageSquare className="w-6 h-6 text-black fill-black" />
              {/* Notification dot */}
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-brand-red border border-black rounded-full animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hover label */}
        {!isOpen && (
          <div className="absolute right-16 bg-neutral-950/90 border border-brand-teal/20 text-brand-teal font-mono text-[9px] font-bold px-2.5 py-1.5 rounded-lg shadow-lg tracking-wider opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase pointer-events-none">
            {isArabic ? "مساعد مِنا الفضائي //" : "MENA SPACE AI //"}
          </div>
        )}
      </motion.button>

    </div>
  );
}
