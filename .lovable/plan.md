

## Plan: Signup funksiyasını bağlamaq

**Məqsəd:** `/auth` səhifəsindən signup seçimini silmək ki, yalnız mövcud admin hesabları ilə giriş mümkün olsun.

### Dəyişikliklər

**1. `src/pages/AuthPage.tsx`**
- `mode` state-ini və signup ilə bağlı bütün kodu silmək
- Yalnız login formu saxlamaq (email + şifrə + "Daxil ol" düyməsi)
- "Hesabınız yoxdur? Yarat →" toggle düyməsini silmək

### Nəticə
- `/auth` səhifəsində yalnız giriş formu olacaq
- Yeni hesab yaratmaq mümkün olmayacaq
- Mövcud admin hesabı ilə giriş işləməyə davam edəcək

