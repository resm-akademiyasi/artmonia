import { MessageCircle } from "lucide-react";
import { getGoUrl } from "@/lib/whatsapp";

const WhatsAppButton = () => {
  return (
    <a
      href={getGoUrl("floating", "whatsapp-fab")}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-gold text-primary-foreground shadow-lg transition-transform hover:scale-110 gold-glow"
      aria-label="WhatsApp-da yaz"
    >
      <MessageCircle size={24} />
    </a>
  );
};

export default WhatsAppButton;
