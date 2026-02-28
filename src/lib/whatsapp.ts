const WHATSAPP_PHONE = "994501112233";
const BRAND_NAME = "Artmonia Academy";

export const getWhatsAppUrl = (name?: string): string => {
  const text = name
    ? `Salam, ${BRAND_NAME} online proqramı ilə maraqlanıram. Adım: ${name}. Hansı paket uyğundur? Mənə məlumat verin.`
    : `Salam, ${BRAND_NAME} online proqramı ilə maraqlanıram. Mənə məlumat verin.`;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
};

export const getGoUrl = (src: string, cta: string, name?: string): string => {
  const params = new URLSearchParams({ src, cta });
  if (name) params.set("name", name);
  return `/go?${params.toString()}`;
};

export const WHATSAPP_PHONE_NUMBER = WHATSAPP_PHONE;
export const BRAND = BRAND_NAME;
