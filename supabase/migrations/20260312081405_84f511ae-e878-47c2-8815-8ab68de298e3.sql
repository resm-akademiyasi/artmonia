
-- Site settings table for configurable values
CREATE TABLE public.site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text NOT NULL,
  label text,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read settings" ON public.site_settings FOR SELECT TO public USING (true);
CREATE POLICY "Admins can manage settings" ON public.site_settings FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- Insert default settings
INSERT INTO public.site_settings (key, value, label) VALUES
  ('google_review_rating', '4.9', 'Google Reviews reytinq'),
  ('google_review_count', '127', 'Google Reviews rəy sayı'),
  ('price_mini', '99', 'Mini paket qiyməti (AZN)'),
  ('price_standard', '199', 'Standart paket qiyməti (AZN)'),
  ('price_premium', '349', 'Premium paket qiyməti (AZN)'),
  ('whatsapp_number', '994501234567', 'WhatsApp nömrəsi'),
  ('calc_base_price', '149', 'Kalkulyator baza qiyməti (AZN)');

-- Blog posts table (separate from news)
CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  excerpt text,
  image_url text,
  category text DEFAULT 'Ümumi',
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published blog posts" ON public.blog_posts FOR SELECT TO public USING (is_published = true);
CREATE POLICY "Admins can manage blog posts" ON public.blog_posts FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- Insert sample blog posts
INSERT INTO public.blog_posts (title, slug, content, excerpt, category, image_url) VALUES
(
  'Rəsm sənətinin tarixi: Mağara rəsmlərindən müasir sənətə',
  'resm-senetinin-tarixi',
  E'# Rəsm sənətinin tarixi\n\nRəsm sənəti insanlığın ən qədim ifadə formalarından biridir. Təxminən 40.000 il əvvəl mağara divarlarında çəkilmiş ilk rəsmlər, insanın yaradıcılıq instinktinin nə qədər dərin olduğunu göstərir.\n\n## Qədim dövr\n\nMisir, Yunan və Roma sivilizasiyaları rəsm sənətini yeni səviyyəyə qaldırdılar. Misir fresk rəsmləri, Yunan vaza rəsmləri və Roma mozaikaları bu dövrün parlaq nümunələridir.\n\n## İntibah dövrü\n\nLeonardo da Vinçi, Mikelancelo və Rafaelin əsərləri rəsm sənətində inqilab yaratdı. Perspektiv, anatomiya və işıq-kölgə texnikaları bu dövrdə təkmilləşdirildi.\n\n## İmpressionism\n\nClaude Monet, Pierre-Auguste Renoir və Edgar Degas kimi rəssamlar işığın anlıq effektlərini tutmağa çalışaraq yeni bir cərəyan yaratdılar.\n\n## Müasir sənət\n\nPablo Pikasso, Salvador Dali və Frida Kalonun əsərləri sənətin sərhədlərini genişləndirdi. Bu gün rəqəmsal sənət və NFT-lər yeni dövrün başlanğıcını müjdələyir.',
  'Rəsm sənəti insanlığın ən qədim ifadə formalarından biridir. Mağara rəsmlərindən İntibah dövrünə, impressionizmdən müasir sənətə qədər uzun bir yol keçib.',
  'Sənət tarixi',
  'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800'
),
(
  'Rəng nəzəriyyəsi: Hər rəssamın bilməli olduğu əsaslar',
  'reng-nezeriyyesi-esaslar',
  E'# Rəng nəzəriyyəsi\n\nRəng nəzəriyyəsi rəssamlığın ən vacib təməl biliklərindən biridir. Düzgün rəng seçimi əsərin emosional təsirini müəyyən edir.\n\n## Əsas rənglər\n\nQırmızı, sarı və mavi — bu üç rəng digər bütün rənglərin əsasını təşkil edir. Onları qarışdırmaqla sonsuz çalar yaratmaq mümkündür.\n\n## Rəng çarxı\n\nRəng çarxı rənglərin bir-biri ilə əlaqəsini göstərən ən vacib alətdir. Komplementar (əks), analoq (yaxın) və triadik rəng sxemləri ən çox istifadə olunan kombinasiyalardır.\n\n## Sıcaq və soyuq rənglər\n\nSıcaq rənglər (qırmızı, narıncı, sarı) enerji və həyəcan ifadə edir. Soyuq rənglər (mavi, yaşıl, bənövşəyi) sakitlik və dərinlik hissi yaradır.',
  'Rəng nəzəriyyəsi rəssamlığın ən vacib təməl biliklərindən biridir. Əsas rənglər, rəng çarxı və rəng psixologiyası haqqında ətraflı öyrənin.',
  'Texnika',
  'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800'
),
(
  'Akril boya ilə rəsm çəkmək: Yeni başlayanlar üçün bələdçi',
  'akril-boya-ile-resm',
  E'# Akril boya ilə rəsm çəkmək\n\nAkril boya, çox yönlü və istifadəsi asan olan materiallardan biridir. Həm yeni başlayanlar, həm də peşəkar rəssamlar üçün ideal seçimdir.\n\n## Niyə akril boya?\n\n- Tez quruyur\n- Su ilə təmizlənir\n- Müxtəlif səthlərə tətbiq olunur\n- Qatı və ya sulu istifadə edilə bilər\n\n## Lazımi materiallar\n\n1. Akril boya dəsti (əsas rənglər)\n2. Fırçalar (yastı, yuvarlaq, fan)\n3. Kətan və ya akril kağız\n4. Palitra\n5. Su qabı\n6. Palitra bıçağı',
  'Akril boya ilə rəsm çəkməyə başlamaq istəyirsiniz? Bu bələdçi sizə lazımi materiallar, texnikalar və ilk addımlar haqqında məlumat verəcək.',
  'Texnika',
  'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800'
),
(
  'Portre rəsm texnikası: Üz proporsiyalarını düzgün çəkmək',
  'portre-resm-texnikasi',
  E'# Portre rəsm texnikası\n\nPortre çəkmək rəssamlığın ən çətin və eyni zamanda ən mükafatlandırıcı sahələrindən biridir.\n\n## Üzün proporsiyaları\n\nİnsan üzü müəyyən universal proporsiyalara malikdir:\n\n- Gözlər üzün ortasında yerləşir\n- Burun gözlər ilə çənə arasının ortasındadır\n- Ağız burun ilə çənə arasının yuxarı üçdə birindədir\n- İki göz arasındakı məsafə bir göz genişliyinə bərabərdir',
  'Portre çəkmək sənətini öyrənin — üz proporsiyaları, işıq-kölgə texnikası və peşəkar məsləhətlər bu məqalədə.',
  'Texnika',
  'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800'
),
(
  'Dünyaca məşhur 10 rəsm əsəri və onların hekayələri',
  'meshur-resm-eserleri',
  E'# Dünyaca məşhur 10 rəsm əsəri\n\n## 1. Mona Liza — Leonardo da Vinçi (1503)\nDünyanın ən tanınmış rəsm əsəri. Müəmmalı gülüşü ilə əsrlər boyu insanları heyrətə salıb.\n\n## 2. Ulduzlu gecə — Vincent van Gogh (1889)\nVan Gogh bu əsəri psixiatrik xəstəxanada olarkən çəkib.\n\n## 3. Qışqırıq — Edvard Munch (1893)\nModern sənətin ən ikonik əsərlərindən biri.\n\n## 4. İnci sırğalı qız — Johannes Vermeer (1665)\nŞimalın Mona Lizası adlanan bu əsər sadə gözəlliyi ilə seçilir.\n\n## 5. Guernica — Pablo Pikasso (1937)\nMüharibə əleyhinə ən güclü sənət əsərlərindən biridir.',
  'Leonardo da Vinçinin Mona Lizasından Van Goghun Ulduzlu gecəsinə qədər — dünyaca məşhur 10 rəsm əsəri və onların maraqlı hekayələri.',
  'Sənət tarixi',
  'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800'
);
