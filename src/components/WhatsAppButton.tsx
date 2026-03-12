import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { getGoUrl } from "@/lib/whatsapp";

const WhatsAppButton = () => {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      {/* Chat bubble */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 z-50 w-80 rounded-2xl border border-border/60 bg-background shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#25D366] px-5 py-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="font-body text-sm font-bold text-white">Artmonia</p>
                <p className="font-body text-[10px] text-white/80">Adətən 1 saat ərzində cavab verir</p>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-white/70 hover:text-white">
                <X size={18} />
              </button>
            </div>

            {/* Chat body */}
            <div className="p-4 bg-[#ECE5DD] min-h-[120px]">
              <div className="bg-white rounded-xl rounded-tl-none px-4 py-3 shadow-sm max-w-[85%]">
                <p className="font-body text-sm text-gray-800">
                  Salam! 👋 Artmonia-ya xoş gəldiniz. Sizə necə kömək edə bilərik?
                </p>
                <p className="font-body text-[10px] text-gray-400 text-right mt-1">İndi</p>
              </div>
            </div>

            {/* Input area */}
            <a
              href={getGoUrl("chat-widget", "whatsapp-chat")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3.5 border-t border-border/40 hover:bg-muted/30 transition-colors"
            >
              <span className="flex-1 font-body text-sm text-muted-foreground">Mesaj yazın...</span>
              <div className="h-9 w-9 rounded-full bg-[#25D366] flex items-center justify-center">
                <Send size={16} className="text-white" />
              </div>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110"
        style={{ background: "#25D366" }}
        whileTap={{ scale: 0.95 }}
        aria-label="WhatsApp-da yaz"
      >
        <AnimatePresence mode="wait">
          {chatOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={24} className="text-white" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle size={24} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
};

export default WhatsAppButton;
