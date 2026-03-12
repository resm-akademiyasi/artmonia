import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye } from "lucide-react";

const LiveViewerBadge = () => {
  const [viewers, setViewers] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show after 3 seconds
    const showTimer = setTimeout(() => {
      setViewers(Math.floor(Math.random() * 8) + 12); // 12-19
      setVisible(true);
    }, 3000);

    // Fluctuate viewers occasionally
    const interval = setInterval(() => {
      setViewers((prev) => {
        const delta = Math.floor(Math.random() * 3) - 1; // -1, 0, or +1
        return Math.max(8, Math.min(25, prev + delta));
      });
    }, 8000);

    // Hide after 15 seconds, show again after 40
    const cycleInterval = setInterval(() => {
      setVisible((v) => !v);
    }, 20000);

    return () => {
      clearTimeout(showTimer);
      clearInterval(interval);
      clearInterval(cycleInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: -100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -100, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="fixed bottom-6 left-6 z-40 flex items-center gap-2.5 rounded-full border border-border/60 bg-background/95 backdrop-blur-xl px-4 py-2.5 shadow-lg"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
          </span>
          <Eye size={14} className="text-muted-foreground" />
          <span className="font-body text-xs font-semibold text-foreground">
            {viewers} nəfər
          </span>
          <span className="font-body text-[10px] text-muted-foreground">
            hazırda baxır
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LiveViewerBadge;
