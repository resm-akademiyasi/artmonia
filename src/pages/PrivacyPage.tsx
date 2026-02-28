import { BRAND } from "@/lib/whatsapp";

const PrivacyPage = () => {
  return (
    <main className="pt-20">
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl prose prose-invert">
            <h1 className="font-display text-4xl font-bold mb-8">Məxfilik <span className="text-gradient-gold">Siyasəti</span></h1>
            
            <div className="space-y-6 font-body text-muted-foreground leading-relaxed">
              <p>Bu Məxfilik Siyasəti {BRAND} ("biz") tərəfindən toplanılan şəxsi məlumatların necə istifadə və qorunduğunu izah edir.</p>
              
              <h2 className="font-display text-xl font-bold text-foreground mt-8">Toplanan Məlumatlar</h2>
              <p>Qeydiyyat formu vasitəsilə ad, telefon, email (isteğe bağlı) və maraq sahələriniz toplanır.</p>

              <h2 className="font-display text-xl font-bold text-foreground mt-8">Məlumatların İstifadəsi</h2>
              <p>Topladığımız məlumatlar yalnız sizinlə əlaqə saxlamaq, proqram haqqında məlumat vermək və xidmətlərimizi təkmilləşdirmək üçün istifadə olunur.</p>

              <h2 className="font-display text-xl font-bold text-foreground mt-8">Məlumatların Paylaşılması</h2>
              <p>Şəxsi məlumatlarınız üçüncü tərəflərlə paylaşılmır, satılmır və ya icarəyə verilmir.</p>

              <h2 className="font-display text-xl font-bold text-foreground mt-8">Təhlükəsizlik</h2>
              <p>Məlumatlarınızın qorunması üçün müasir təhlükəsizlik tədbirləri tətbiq olunur.</p>

              <h2 className="font-display text-xl font-bold text-foreground mt-8">Əlaqə</h2>
              <p>Hər hansı sualınız varsa, bizimlə info@artmonia.az ünvanı üzərindən əlaqə saxlaya bilərsiniz.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPage;
