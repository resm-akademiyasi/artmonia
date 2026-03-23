# Artmonia — Online Rəssamlıq Akademiyası
## README for Claude Code / AI Agents

> Bu fayl Claude Code və digər AI instance-ları üçün hazırlanmışdır.
> Saytın tam texniki sənədidir — buradakı məlumat əsasında dəyişiklik edə bilərsiniz.

---

## 1. Saytın Məqsədi və Funksionallığı

**Artmonia** — Azərbaycanın ilk online rəssamlıq akademiyasıdır. Netflix modelində işləyir:

```
Ziyarətçi → Pulsuz dərs izləmək istəyir → Qeydiyyat tələb olunur →
Hesab yaradır → Pulsuz dərslər açılır → Abunəlik almaq istəyir →
₼29/ay → Bütün kurslara giriş
```

### Əsas xüsusiyyətlər:
- Video kurs platforması (Vimeo + YouTube dəstəyi)
- Aylıq abunəlik sistemi (₼29/ay)
- Email ilə qeydiyyat + Supabase Auth
- Sertifikat sistemi (kurs bitdikdə PDF)
- Tələbə icması (iş paylaşmaq, like, sual-cavab)
- Admin paneli (tam idarəetmə)
- Session guard (bir hesab = bir aktiv cihaz)
- İki dil dəstəyi (Azərbaycan 🇦🇿 / Rus 🇷🇺)
- Onboarding: xoş gəldin pəncərəsi + səviyyə testi + streak sistemi

---

## 2. İstifadə Olunan Texnologiyalar

| Texnologiya | Məqsəd | Qeyd |
|---|---|---|
| **HTML/CSS/JS** | Frontend | Tək fayl arxitekturası |
| **Supabase** | Backend, Auth, DB | PostgreSQL + Edge Functions |
| **Cloudflare Pages** | Hosting | Pulsuz, limitsiz bandwidth |
| **Resend.com** | Email göndərmə | SMTP, aylıq 3000 email pulsuz |
| **Vimeo** | Video hosting | Pro plan tələb olunur (qoruma üçün) |
| **Namecheap** | Domen | artmoniya.com |

### Xarici CDN kitabxanalar (HTML-in head-ında):
```html
<!-- Supabase JS -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<!-- Google Fonts: Cormorant Garamond, Nunito Sans -->
```

---

## 3. Fayl Strukturu

```
artmonia.html          ← Bütün sayt bu tək faylda (275KB, ~4300 sətir)
README.md              ← Bu fayl
supabase_setup.sql     ← Supabase cədvəllər (ilk qurulum üçün)
```

### `artmonia.html` daxili strukturu:
```
<head>
  CSS stilləri (~800 sətir)
  Google Fonts import

<body>
  <div id="app">  ← Bütün UI buraya render olunur
  <div class="toast">  ← Bildiriş sistemi

<script>
  TRANSLATIONS {}    ← AZ/RU tərcümə obyekti
  t(key)             ← Tərcümə funksiyası
  SUPABASE_URL, KEY  ← Konfiqurasiya
  ADMIN_PASSWORD     ← 'Artmonia@2025!'
  CATEGORIES[]       ← Kurs kateqoriyaları
  HERO_SLIDES[]      ← Ana səhifə slider
  INIT_COURSES[]     ← 7 kurs (başlanğıc məlumatlar)
  S = { ... }        ← Global state obyekti
  
  Funksiyalar (169 ədəd):
  - initSB()         ← Supabase başlat + email link tut
  - setUser()        ← Auth sonrası user state
  - render()         ← Bütün UI yenilə
  - navHTML()        ← Navbar
  - heroHTML()       ← Hero slider
  - videoPageHTML()  ← Video izləmə səhifəsi
  - authModalHTML()  ← Giriş/qeydiyyat modal
  - adminPageHTML()  ← Admin paneli
  - communityPageHTML() ← Tələbə icması
  - welcomeHTML()    ← Xoş gəldin pəncərəsi
  - levelTestHTML()  ← Səviyyə testi
  - boot()           ← Başlatma
```

---

## 4. Deploy Prosesi

### Hosting: Cloudflare Pages
- **Project adı:** `artmonia`
- **URL:** `https://artmonia.pages.dev`
- **Custom domain:** `https://online.artmoniya.com`
- **DNS:** Namecheap → CNAME `online` → `artmonia.pages.dev`

### Saytı yeniləmək üçün:
```
1. artmonia.html faylını dəyişdir
2. Faylın adını index.html et
3. Cloudflare → Workers & Pages → artmonia → "Create deployment"
4. index.html olan qovluğu yüklə
```

> ⚠️ Fayl mütləq `index.html` adında olmalıdır. `artmonia.html` adıyla 404 xətası verər.

---

## 5. Supabase Quraşdırması

### Əlaqə məlumatları:
```
URL: https://rugigxxhwbykcmbwcisk.supabase.co
Project: resm-akademiyasi
Admin email: artmoniaacademy@gmail.com
Admin şifrəsi: Artmonia@2025!
```

### Cədvəllər:

#### `profiles`
```sql
id uuid (FK → auth.users.id)
full_name text
phone text
created_at timestamptz
```

#### `subscriptions`
```sql
id uuid
user_id uuid (FK → auth.users)
plan text ('monthly' | 'yearly')
status text ('active' | 'expired')
expires_at timestamptz
started_at timestamptz
```

#### `progress`
```sql
id uuid
user_id uuid
course_id int
part_id text
completed boolean
```
Unique constraint: `(user_id, course_id, part_id)`

#### `certificates`
```sql
id uuid
user_id uuid
course_id int
created_at timestamptz
```

#### `comments`
```sql
id uuid
user_id uuid
course_id int
content text
created_at timestamptz
```

#### `active_sessions`
```sql
id uuid
user_id uuid UNIQUE  ← Mütləq UNIQUE olmalı (session guard üçün)
session_token text
device_info text
last_seen timestamptz
```
> ⚠️ `user_id` sütununda UNIQUE constraint mütləq olmalıdır. Olmasa upsert işləmir.

#### `video_progress`
```sql
user_id uuid
course_id int
part_id text
position_seconds float
duration_seconds float
updated_at timestamptz
```
Unique: `(user_id, course_id, part_id)`

#### `video_notes`
```sql
id uuid
user_id uuid
course_id int
part_id text
timestamp_seconds float
note_text text
created_at timestamptz
```

#### `student_works`
```sql
id uuid
user_id uuid
title text
description text
image_url text
likes_count int (default 0)
approved boolean (default true)
created_at timestamptz
```

#### `work_likes`
```sql
id uuid
user_id uuid
work_id uuid
```
Unique: `(user_id, work_id)`

#### `student_questions`
```sql
id uuid
user_id uuid
question_text text
answer_text text
status text ('pending' | 'answered')
answered_at timestamptz
created_at timestamptz
```

### Supabase Auth Ayarları:
```
Authentication → URL Configuration:
  Site URL: https://online.artmoniya.com
  Redirect URLs: https://online.artmoniya.com

Authentication → Sign In / Providers:
  Confirm email: ✅ Aktiv

Authentication → Email → SMTP Settings:
  Enable custom SMTP: ✅
  Host: smtp.resend.com
  Port: 465
  Username: resend
  Password: [Resend API key — re_xxxxxxx]
  Sender: noreply@artmoniya.com
  Sender name: Artmonia Akademiya
```

### Email Şablonları (Authentication → Email → Templates):
- **Confirm signup:** Azərbaycanca/gözəl HTML şablon qurulub
- **Reset password:** Azərbaycanca/gözəl HTML şablon qurulub

### Edge Functions:
```
video-token  ← Vimeo videoları üçün token yaradan funksiya
             ← URL: https://rugigxxhwbykcmbwcisk.supabase.co/functions/v1/video-token
```

### SMTP — Resend.com:
```
Hesab: ressamismat@gmail.com
Domain: artmoniya.com (Verified ✅)
DNS qeydləri (Namecheap-də):
  TXT resend._domainkey → [DKIM dəyəri]
  MX send → feedback-smtp.eu-west-1.amazonses.com (priority 10)
  TXT send → v=spf1 include:amazonses.com ~all
  TXT _dmarc → v=DMARC1; p=none; rua=mailto:artmoniaacademy@gmail.com
```

---

## 6. Tamamlanmış Xüsusiyyətlər

### Auth Sistemi:
- [x] Email + şifrə ilə qeydiyyat
- [x] Email təsdiq (link kliklədikdə avtomatik giriş)
- [x] Şifrə sıfırlama (email link → saytda yeni şifrə forması)
- [x] "Məni xatırla" checkbox
- [x] Şifrə güc göstəricisi
- [x] Real vaxtda email format yoxlaması
- [x] Azərbaycanca xəta mesajları
- [x] Session guard (1 hesab = 1 aktiv cihaz)

### Video Sistemi:
- [x] Vimeo + YouTube embed dəstəyi
- [x] Edge Function token qoruma (Vimeo)
- [x] Video resume (çıxıb girəndə davam edir)
- [x] Video qeydlər (timestamp ilə)
- [x] Sağ klik + F12 bloku
- [x] 30 saniyə izlədikdən sonra "izləndi" işarəsi

### Kurs Sistemi:
- [x] 7 kurs (admin paneldən əlavə/silmə)
- [x] 4 kateqoriya (Pulsuz, Başlanğıc, Orta, İrəli)
- [x] Proqres izləmə (%)
- [x] Sertifikat generasiyası (canvas → PNG yükləmə)
- [x] "Bu kurs nə üçündür" məlumatı
- [x] Kurs müddəti göstəricisi
- [x] Materiallar siyahısı
- [x] Referans foto yükləmə linki
- [x] FOMO göstəricisi ("Son 24 saatda X nəfər izlədi")

### Onboarding / Retention:
- [x] Xoş gəldin pəncərəsi (2 addım)
- [x] Səviyyə testi (3 sual → kurs tövsiyəsi)
- [x] "Davam et" kartı (ana səhifədə son izlənən kurs)
- [x] Streak sistemi (ardıcıl günlər)
- [x] Həftəlik dəqiqə sayacı
- [x] Badge sistemi (sertifikat + streak)
- [x] Lead magnet (pulsuz video üçün qeydiyyat tələbi)

### Admin Paneli (`?admin` URL ilə açılır, şifrə: `Artmonia@2025!`):
- [x] Statistika
- [x] Sayt rəqəmləri (manual/real)
- [x] Mətn redaktoru (bütün sayt yazıları)
- [x] Hero şəkilləri
- [x] Promo popup (timer, limit, aktivləşdirmə)
- [x] Tələbə rəyləri (CRUD)
- [x] Müəllimlər (CRUD)
- [x] Kurslar idarəetməsi
- [x] Kurs məlumatları (purpose, materiallar, FOMO sayı)
- [x] Tələbə sualları (cavablamaq)
- [x] Paylaşılan işlər (silmək)
- [x] Manual abunəlik vermə

### Dizayn / UX:
- [x] Tünd tema (dark mode)
- [x] Responsive (mobile + desktop)
- [x] Mobile alt navbar (4 tab)
- [x] Hero slider (3 slayd, animasiya)
- [x] Animasiyalı sayaçlar
- [x] WhatsApp düyməsi (sağ alt)
- [x] FAQ accordion
- [x] Bloq bölməsi

### Çox dil:
- [x] Azərbaycan dili 🇦🇿
- [x] Rus dili 🇷🇺
- [x] Navbarda dil seçici düyməsi
- [x] localStorage-da dil yadda saxlanır

### Email:
- [x] Resend.com SMTP
- [x] `noreply@artmoniya.com` adından göndərmə
- [x] Azərbaycanca gözəl HTML şablonlar
- [x] DMARC, SPF, DKIM qurulub (spam önlənib)

---

## 7. Davam Edən / Planlaşdırılan İşlər

### 🔴 Kritik (gəlir üçün vacib):
- [ ] **Stripe ödəniş sistemi** — indiki axın: WhatsApp → əl ilə ödəniş → admin manual abunəlik. 50+ müştəridən sonra çətin olacaq.
- [ ] **Vimeo Pro** — videolar qorunmur. Token sistemi hazır, sadəcə Vimeo Pro lazımdır.

### 🟡 Planlaşdırılan:
- [ ] Google/Apple ilə giriş (OAuth) — pulsuz, rahat
- [ ] Email bildirişləri (yeni dərs əlavə olduqda abunəçilərə)
- [ ] Admin-dən email göndərmə (toplu)
- [ ] Bloq məqalələri (statik HTML → real məzmun)
- [ ] Forum bölməsi ("tezliklə" yazır)
- [ ] Streak bildirişi (email ilə)

### 🟢 Kiçik:
- [ ] Admin paneldəki mətn dəyişiklikləri Supabase-ə yazılmır (refresh-dən sonra sıfırlanır)
- [ ] Tələbə rəyləri Supabase-ə yazılmır (state-də saxlanır)

---

## 8. Vacib Qeydlər

### Global State (`S` obyekti):
Bütün UI state `S` adlı global obyektdə saxlanır. `render()` çağırıldığında bütün DOM yenilənir. React/Vue yoxdur — vanilla JS.

```javascript
S = {
  page: 'browse',          // aktiv səhifə
  user: null,              // giriş etmiş istifadəçi
  courses: [...],          // kurs massivi
  selectedCourse: null,    // açıq kurs
  authMode: null,          // 'login'|'register'|'confirm'|'forgot'
  lang: 'az',              // 'az' | 'ru'
  subscription: null,      // aktiv abunəlik
  progress: {},            // {courseId: {partId: true}}
  // ... 40+ sahə
}
```

### Çox dil sistemi:
```javascript
t('key')  // S.lang-a görə AZ və ya RU qaytarır
```
Bütün UI mətnlər `t()` funksiyası vasitəsilə göstərilir.

### Admin Paneli:
URL: `https://online.artmoniya.com?admin`
Şifrə: `Artmonia@2025!`
Giriş etdikdən sonra URL avtomatik təmizlənir.

### Session Guard:
- Hər 45 saniyədə `checkSession()` çağırılır
- Başqa cihazdan giriş olarsa, köhnə cihaz "Hesabınıza başqa cihazdan giriş edildi" ekranı ilə çıxarılır
- Admin hesabı session guard-dan muafdır
- Şəbəkə xətasında kick etmir (false positive yoxdur)

### Video Token Sistemi:
```javascript
// Hər qorunan video üçün Edge Function çağırılır
POST /functions/v1/video-token
Body: { vimeo_id, course_id, part_id, is_free }
Response: { embed_url, expires_at }
```

### Lead Magnet Axını:
```
İstifadəçi pulsuz video kliklər →
Hesabı yoxdursa → openAuth('register') açılır →
S._pendingFreePart = {courseId, partId} yadda saxlanır →
Qeydiyyat bitdikdən sonra → setUser() → _pendingFreePart yoxlanır →
Video avtomatik açılır
```

### Email Təsdiq Axını:
```
Qeydiyyat → Email gəlir → Link kliklənir →
URL: https://online.artmoniya.com#access_token=...&type=signup →
initSB() hash-i tutır → session yaranır → avtomatik giriş
```

### Şifrə Sıfırlama Axını:
```
"Şifrəni unutdum" → Email daxil → sendResetLink() →
Email gəlir → Link kliklənir →
URL: https://online.artmoniya.com#type=recovery →
initSB() tutır → 'new-password' modal açılır → setNewPassword()
```

### Kurs Məlumatları Strukturu:
```javascript
{
  id: 1,
  title: 'Payız Ağacı — Başlanğıc',
  category: 'Pulsuz Dərslər',
  level: 'Başlanğıc',
  thumb: 'https://...',
  desc: 'Uzun təsvir...',
  purpose: 'Bu kurs nə üçündür (2 sətir)',
  totalDuration: '63 dəqiqə',
  materials: 'Yağlı boya, fırça...',
  downloadUrl: '',        // Referans foto URL
  viewerCount: 47,        // FOMO sayı (manual)
  free: true,
  parts: [
    { id: 'p1-1', name: 'Hissə 1', duration: '28:14', vimeo: '', free: true }
  ]
}
```

### Stripe İnteqrasiyası Üçün Nə Lazımdır:
Gəlecəkdə Stripe əlavə etmək üçün:
1. Stripe Edge Function yaratmaq (checkout session)
2. `subscriptions` cədvəlinə `stripe_subscription_id` sütunu əlavə etmək
3. Webhook handler (subscription cancel/renew üçün)
4. Frontend-də "Abunə ol" düyməsini Stripe Checkout-a bağlamaq

---

## 9. Domen və DNS (Namecheap)

```
artmoniya.com DNS qeydləri:
  A Record    @         → 185.158.133.1
  A Record    www       → 185.158.133.1
  CNAME       online    → artmonia.pages.dev  (sayt)
  TXT         resend._domainkey → [DKIM]
  MX          send      → feedback-smtp.eu-west-1.amazonses.com (10)
  TXT         send      → v=spf1 include:amazonses.com ~all
  TXT         _dmarc    → v=DMARC1; p=none; rua=mailto:artmoniaacademy@gmail.com
```

---

## 10. Aylıq Xərclər

| Xidmət | Qiymət |
|---|---|
| Cloudflare Pages | Pulsuz |
| Supabase Free | Pulsuz (500MB, 50K istifadəçiyə qədər) |
| Resend.com | Pulsuz (3000 email/ay) |
| Namecheap domen | ~$15/il |
| **Vimeo Pro** | ~$20/ay (hələ alınmayıb) |
| **Supabase Pro** (100+ istifadəçidən sonra) | $25/ay |

---

## 11. Tez İstifadə Olunan Əmrlər

### İstifadəçi silmək (tam):
```sql
DO $$
DECLARE uid uuid;
BEGIN
  SELECT id INTO uid FROM auth.users WHERE email = 'EMAIL_BURAYA';
  DELETE FROM active_sessions WHERE user_id = uid;
  DELETE FROM subscriptions WHERE user_id = uid;
  DELETE FROM progress WHERE user_id = uid;
  DELETE FROM certificates WHERE user_id = uid;
  DELETE FROM video_progress WHERE user_id = uid;
  DELETE FROM video_notes WHERE user_id = uid;
  DELETE FROM student_works WHERE user_id = uid;
  DELETE FROM student_questions WHERE user_id = uid;
  DELETE FROM comments WHERE user_id = uid;
  DELETE FROM profiles WHERE id = uid;
END $$;
-- Sonra Authentication → Users-dən də sil
```

### Manual abunəlik vermək:
```sql
INSERT INTO subscriptions (user_id, plan, status, expires_at, started_at)
VALUES ('USER_ID', 'monthly', 'active', NOW() + INTERVAL '30 days', NOW());
```

### Active sessions yoxlamaq:
```sql
SELECT u.email, s.session_token, s.last_seen, s.device_info
FROM active_sessions s
JOIN auth.users u ON s.user_id = u.id
ORDER BY s.last_seen DESC;
```

---

*Son yenilənmə: Mart 2026*
*Hazırlayan: Claude (Anthropic)*
