import { useState, useEffect, useCallback } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Target,
  Plus,
  Eye,
  EyeOff,
  Calendar,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  X,
  ChevronRight,
  ChevronDown,
  Award,
  Zap,
  BarChart3,
  ShoppingCart,
  Megaphone,
  GraduationCap,
  Wallet,
  PiggyBank,
} from "lucide-react";

const C = {
  bg: "#0F1117",
  navy: "#1A1F36",
  card: "#1A1D27",
  cardHover: "#22252F",
  border: "#2A2D3A",
  accent: "#E8A838",
  accentDim: "#C48A20",
  accentBg: "rgba(232,168,56,0.08)",
  white: "#F0F0F5",
  textPrimary: "#E8E9ED",
  textSecondary: "#8B8FA3",
  textMuted: "#5A5E72",
  green: "#22C55E",
  greenBg: "rgba(34,197,94,0.1)",
  red: "#EF4444",
  redBg: "rgba(239,68,68,0.1)",
  teal: "#0EA5E9",
  tealBg: "rgba(14,165,233,0.1)",
  purple: "#A78BFA",
  purpleBg: "rgba(167,139,250,0.1)",
  orange: "#F97316",
};
const PIE_C = [C.teal, C.accent, C.red, C.orange, C.purple, C.green, "#06B6D4", "#6366F1", "#94A3B8", "#64748B"];

const ROADMAP = [
  { month: 5, students: "150-180", studentsMax: 180, revenue: 18000 },
  { month: 6, students: "180-220", studentsMax: 220, revenue: 22000 },
  { month: 7, students: "220-250", studentsMax: 250, revenue: 25000 },
  { month: 8, students: "250-300", studentsMax: 300, revenue: 30000 },
  { month: 9, students: "300-400", studentsMax: 400, revenue: 40000 },
  { month: 10, students: "400-500", studentsMax: 500, revenue: 50000 },
];

const INIT = [
  {
    id: "2026-01",
    month: "Yanvar",
    year: 2026,
    rmMonth: 5,
    qaliq: 1095,
    revenue: 17586,
    expenses: 12990,
    net: 4596,
    balance: 5691,
    students: 155,
    consultations: 58,
    registrations: 48,
    marketingSpend: 3195,
    leadsFromIG: 500,
    notes: {
      summary:
        "İlk rübün ən güclü ayı. Müsbət net nəticə əldə edildi. Sistem hələ tam qurulmayıb, follow-up prosesi manual idarə olunur.",
      why: "Yanvar tətil mövsümündən sonra tələbat artımı ilə güclü başladı. Borcların böyük hissəsi bu ayda ödənildi.",
      plans: "Fevralda marketing gücləndirilir. İnventar təchizatı tamamlanır. CRM planlaşdırılır.",
    },
    expBreak: [
      {
        c: "Maaş",
        a: 1950,
        sub: [
          { n: "Müəllim maaşları", a: 1550 },
          { n: "Nicat (assistant)", a: 250 },
          { n: "Digər", a: 150 },
        ],
      },
      {
        c: "Marketing",
        a: 3195,
        sub: [
          { n: "Meta ads (5 kampaniya)", a: 1195 },
          { n: "Salut Agency (aylıq)", a: 2000 },
        ],
      },
      {
        c: "Borc ödəmə",
        a: 2470,
        sub: [
          { n: "Qalıq borc ödənişi", a: 1650 },
          { n: "Kassadan borc qaytarma", a: 820 },
        ],
      },
      {
        c: "DSMF/Vergi",
        a: 2879,
        sub: [
          { n: "DSMF", a: 2811 },
          { n: "Bank komisyonu", a: 68 },
        ],
      },
      {
        c: "Kommunal",
        a: 515,
        sub: [
          { n: "Kommunal xidmətlər", a: 500 },
          { n: "Azercell", a: 15 },
        ],
      },
      {
        c: "İnventar",
        a: 756,
        sub: [
          { n: "İnventar alışı", a: 601 },
          { n: "Ləvazimatlar", a: 65 },
          { n: "Ətir/Aksessuar", a: 90 },
        ],
      },
      {
        c: "Daxili xərc",
        a: 525,
        sub: [
          { n: "Daxili operativ xərclər", a: 320 },
          { n: "Komanda xərci", a: 190 },
          { n: "Terminal abone", a: 15 },
        ],
      },
      { c: "Geri qaytarma", a: 700, sub: [{ n: "Tələbə geri ödənişi", a: 700 }] },
    ],
  },
  {
    id: "2026-02",
    month: "Fevral",
    year: 2026,
    rmMonth: 6,
    qaliq: 5691,
    revenue: 20201,
    expenses: 21549,
    net: -1348,
    balance: 4343,
    students: 170,
    consultations: 40,
    registrations: 52,
    marketingSpend: 2855,
    leadsFromIG: 550,
    notes: {
      summary:
        "Gəlir artımı müsbət (+14.9%). Lakin investisiya xarakterli xərclər (inventar, sayt, mebel) net nəticəni mənfi etdi. Qeydiyyat sayı güclü idi (52).",
      why: "Maaş xərcləri kəskin artdı — yeni müəllimlərin tam ay maaşları hesablandı. İnventar yeniləndi, sayt üçün ödəniş edildi.",
      plans: "Mart — Novruz tətili olacaq, gəlir azalacaq. CRM sistemi qurulmasına start. Zara ilə müsahibə.",
    },
    expBreak: [
      {
        c: "Maaş",
        a: 7909,
        sub: [
          { n: "Müəllim maaşları (5 nəfər)", a: 6891 },
          { n: "Vaqif (40% pay)", a: 900 },
          { n: "Nicat (assistant)", a: 118 },
        ],
      },
      {
        c: "Marketing",
        a: 2855,
        sub: [
          { n: "Meta ads (3 kampaniya)", a: 605 },
          { n: "Salut Agency (aylıq)", a: 2000 },
          { n: "Əlavə reklam", a: 250 },
        ],
      },
      {
        c: "İnventar",
        a: 2745,
        sub: [
          { n: "Əsas inventar alışı", a: 2000 },
          { n: "İnventar təmiri", a: 105 },
          { n: "Kiçik inventar", a: 390 },
          { n: "Elnur mebel", a: 250 },
        ],
      },
      {
        c: "Geri qaytarma",
        a: 2460,
        sub: [
          { n: "Tələbə geri ödənişləri (6 nəfər)", a: 1960 },
          { n: "Geri ödəniş (köçürmə)", a: 500 },
        ],
      },
      { c: "İcarə", a: 1180, sub: [{ n: "Nizami Kino Teatr (icarə)", a: 1180 }] },
      {
        c: "DSMF/Vergi",
        a: 695,
        sub: [
          { n: "DSMF", a: 595 },
          { n: "Bank komisyonu", a: 100 },
        ],
      },
      {
        c: "Kommunal",
        a: 630,
        sub: [
          { n: "Kommunal xidmətlər", a: 600 },
          { n: "Azercell", a: 30 },
        ],
      },
      {
        c: "Daxili xərc",
        a: 656,
        sub: [
          { n: "Daxili operativ", a: 124 },
          { n: "Komanda xərci", a: 194 },
          { n: "Bazarlıq", a: 201 },
          { n: "Təmizlik", a: 100 },
          { n: "Su/Digər", a: 37 },
        ],
      },
      { c: "Texnologiya", a: 600, sub: [{ n: "Sayt inkişafı", a: 600 }] },
      { c: "Borc ödəmə", a: 600, sub: [{ n: "Kassadan borc", a: 600 }] },
      {
        c: "Digər",
        a: 219,
        sub: [
          { n: "Kontur (hesab-faktura)", a: 24 },
          { n: "Kassa çeki", a: 7 },
          { n: "İsmət m. xərc", a: 188 },
        ],
      },
    ],
  },
  {
    id: "2026-03",
    month: "Mart",
    year: 2026,
    rmMonth: 7,
    qaliq: 4343,
    revenue: 17401,
    expenses: 18924,
    net: -1523,
    balance: 2820,
    students: 186,
    consultations: 22,
    registrations: 16,
    marketingSpend: 1433,
    leadsFromIG: 480,
    notes: {
      summary:
        "Novruz bayramı (20-22 mart) iş dayanması yaratdı. Konsultasiya sayı 62% azaldı. Bununla belə, tələbə bazası 186-ya çatdı. CRM sistemi qurulmasına başlanıldı.",
      why: "Konsultasiya düşüşü: bayram + follow-up sisteminin olmaması. Kassadan borc ödəmələri (5,649 AZN) xərcləri şişirtdi. Marketing xərci azaldıldı (bayram səbəbilə).",
      plans:
        "Aprel — Google Sheets CRM tam işə salınır. Notion OS qurulur. Zara (AZ/RU/EN) satış mütəxəssisi kimi qoşulur. Ayşənin rolu daxili əməliyyatlara fokuslanır. Hədəf: aylıq 40+ konsultasiya.",
    },
    expBreak: [
      {
        c: "Maaş",
        a: 8045,
        sub: [
          { n: "Müəllim maaşları (hesab)", a: 1663 },
          { n: "Müəllim maaşları (cash)", a: 6132 },
          { n: "Maaş (digər)", a: 250 },
        ],
      },
      { c: "Borc ödəmə", a: 5649, sub: [{ n: "Kassadan borc qaytarma", a: 5649 }] },
      {
        c: "İnventar",
        a: 1828,
        sub: [
          { n: "Böyük inventar alışı", a: 1100 },
          { n: "İnventar (kiçik)", a: 430 },
          { n: "Ləvazimatlar", a: 18 },
          { n: "Digər inventar", a: 280 },
        ],
      },
      {
        c: "Marketing",
        a: 1433,
        sub: [
          { n: "Meta ads (4 kampaniya)", a: 1028 },
          { n: "Əlavə reklam", a: 100 },
          { n: "Meta ads (son həftə)", a: 305 },
        ],
      },
      {
        c: "Texnologiya",
        a: 805,
        sub: [
          { n: "AI alətlər", a: 390 },
          { n: "Sayt inkişafı", a: 240 },
          { n: "CRM sistemi", a: 100 },
          { n: "Domain", a: 75 },
        ],
      },
      {
        c: "Kommunal",
        a: 503,
        sub: [
          { n: "Kommunal xidmətlər", a: 500 },
          { n: "Azercell", a: 3 },
        ],
      },
      {
        c: "Daxili xərc",
        a: 310,
        sub: [
          { n: "Daxili operativ xərclər", a: 298 },
          { n: "Kontur", a: 12 },
        ],
      },
      {
        c: "İcarə",
        a: 220,
        sub: [
          { n: "Nizami Kino Teatr", a: 20 },
          { n: "Pasha Holding (bina)", a: 200 },
        ],
      },
      { c: "Geri qaytarma", a: 131, sub: [{ n: "Tələbə geri ödənişi", a: 131 }] },
    ],
  },
];

const SK = "artmonia-inv-v2";
const fmt = (n: number | string) => Number(n).toLocaleString("az-AZ");

function Metric({ label, value, sub, icon: Icon, color, trend }: { label: string; value: any; sub?: string; icon?: any; color: string; trend?: any }) {
  return (
    <div
      style={{ background: C.card, borderColor: C.border }}
      className="rounded-xl border p-4 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: color }} />
      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] uppercase tracking-widest" style={{ color: C.textMuted }}>
            {label}
          </p>
          <p className="text-xl font-bold mt-1" style={{ color: C.textPrimary }}>
            {value}
          </p>
          {sub && (
            <p className="text-[11px] mt-1" style={{ color: C.textSecondary }}>
              {sub}
            </p>
          )}
          {trend !== undefined && (
            <div
              className={`flex items-center gap-1 mt-1.5 text-[11px] font-medium ${trend >= 0 ? "text-emerald-400" : "text-red-400"}`}
            >
              {trend >= 0 ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
              {trend >= 0 ? "+" : ""}
              {trend}
            </div>
          )}
        </div>
        {Icon && (
          <div className="p-2 rounded-lg" style={{ background: color + "18" }}>
            <Icon size={18} style={{ color }} />
          </div>
        )}
      </div>
    </div>
  );
}

function SectionTitle({ children, icon: Icon }: { children: React.ReactNode; icon?: any }) {
  return (
    <div className="flex items-center gap-2 mb-4 mt-6">
      {Icon && <Icon size={16} style={{ color: C.accent }} />}
      <h3 className="text-sm font-bold" style={{ color: C.textPrimary }}>
        {children}
      </h3>
    </div>
  );
}

function TT({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) {
  if (!active || !payload) return null;
  return (
    <div style={{ background: C.card, borderColor: C.border }} className="p-3 rounded-lg shadow-xl border text-[11px]">
      <p className="font-semibold mb-1" style={{ color: C.textPrimary }}>
        {label}
      </p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }}>
          {p.name}: <span className="font-bold">{fmt(p.value)}</span>
        </p>
      ))}
    </div>
  );
}

function Overview({ data }) {
  const totRev = data.reduce((s, d) => s + d.revenue, 0);
  const totExp = data.reduce((s, d) => s + d.expenses, 0);
  const totNet = totRev - totExp;
  const totReg = data.reduce((s, d) => s + d.registrations, 0);
  const totCons = data.reduce((s, d) => s + d.consultations, 0);
  const last = data[data.length - 1];
  const prev = data.length > 1 ? data[data.length - 2] : null;
  const revTrend = prev ? `${(((last.revenue - prev.revenue) / prev.revenue) * 100).toFixed(1)}%` : null;
  const studTrend = prev ? `${last.students - prev.students} nəfər` : null;

  const chartData = data.map((d) => ({ name: d.month, Gəlir: d.revenue, Xərc: d.expenses, Net: d.net }));
  const studData = data.map((d) => ({
    name: d.month,
    Tələbə: d.students,
    "Gəlir/Tələbə": Math.round(d.revenue / (d.students || 1)),
  }));
  const consData = data.map((d) => ({ name: d.month, Konsultasiya: d.consultations, Qeydiyyat: d.registrations }));

  // Expense category across months
  const allCats = new Set<string>();
  data.forEach((d: any) => (d.expBreak || []).forEach((e: any) => allCats.add(e.c)));
  const expByMonth = data.map((d: any) => {
    const row: Record<string, any> = { name: d.month };
    const map: Record<string, number> = {};
    (d.expBreak || []).forEach((e: any) => {
      map[e.c] = e.a;
    });
    allCats.forEach((c) => {
      row[c] = map[c] || 0;
    });
    return row;
  });
  const catTotals: Record<string, number> = {};
  data.forEach((d: any) =>
    (d.expBreak || []).forEach((e: any) => {
      catTotals[e.c] = (catTotals[e.c] || 0) + e.a;
    }),
  );
  const topCats = Object.entries(catTotals)
    .sort((a, b) => (b[1] as number) - (a[1] as number))
    .map(([c]) => c);

  const achievements = [
    { text: "4 il fəaliyyət təcrübəsi", done: true },
    { text: "186 aktiv tələbə", done: true },
    { text: "Google Sheets CRM sistemi quruldu", done: true },
    { text: "Notion OS (SOP, Metodologiya) başladıldı", done: true },
    { text: "online.artmoniya.com platforması inkişafda", done: false },
    { text: "Zara — üçdilli satış mütəxəssisi işə götürülməyə hazır", done: false },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <Metric
          icon={DollarSign}
          label="Ümumi Gəlir"
          value={`${fmt(totRev)} ₼`}
          sub={`${data.length} ay`}
          color={C.teal}
          trend={revTrend}
        />
        <Metric
          icon={Users}
          label="Aktiv Tələbə"
          value={last?.students || 0}
          sub={`${last?.month} sonu`}
          color={C.accent}
          trend={studTrend}
        />
        <Metric
          icon={PiggyBank}
          label="Net Nəticə"
          value={`${totNet >= 0 ? "+" : ""}${fmt(totNet)} ₼`}
          sub={`Margin: ${((totNet / totRev) * 100).toFixed(1)}%`}
          color={totNet >= 0 ? C.green : C.red}
        />
        <Metric
          icon={Target}
          label="Yeni Qeydiyyat"
          value={totReg}
          sub={`Ort. konversiya: ${totCons > 0 ? Math.round((totReg / totCons) * 100) : 0}%`}
          color={C.purple}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div style={{ background: C.card, borderColor: C.border }} className="rounded-xl border p-5">
          <SectionTitle icon={BarChart3}>Gəlir vs Xərc vs Net</SectionTitle>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={chartData} barGap={3}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: C.textMuted }} axisLine={{ stroke: C.border }} />
              <YAxis tick={{ fontSize: 10, fill: C.textMuted }} axisLine={false} tickLine={false} />
              <Tooltip content={<TT />} />
              <Legend wrapperStyle={{ fontSize: 11, color: C.textSecondary }} />
              <Bar dataKey="Gəlir" fill={C.teal} radius={[4, 4, 0, 0]} />
              <Bar dataKey="Xərc" fill={C.red} radius={[4, 4, 0, 0]} opacity={0.55} />
              <Bar dataKey="Net" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={entry.Net >= 0 ? C.green : C.red} opacity={0.85} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: C.card, borderColor: C.border }} className="rounded-xl border p-5">
          <SectionTitle icon={GraduationCap}>Tələbə Artımı & Gəlir/Tələbə</SectionTitle>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={studData}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: C.textMuted }} />
              <YAxis yAxisId="left" tick={{ fontSize: 10, fill: C.textMuted }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: C.textMuted }} />
              <Tooltip content={<TT />} />
              <Legend wrapperStyle={{ fontSize: 11, color: C.textSecondary }} />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="Tələbə"
                stroke={C.accent}
                strokeWidth={2.5}
                dot={{ r: 4, fill: C.accent }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="Gəlir/Tələbə"
                stroke={C.purple}
                strokeWidth={2}
                dot={{ r: 3, fill: C.purple }}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div style={{ background: C.card, borderColor: C.border }} className="rounded-xl border p-5">
          <SectionTitle icon={ShoppingCart}>Konsultasiya & Satış Funnel</SectionTitle>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={consData}>
              <defs>
                <linearGradient id="gCons" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={C.teal} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={C.teal} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gReg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={C.accent} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={C.accent} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: C.textMuted }} />
              <YAxis tick={{ fontSize: 10, fill: C.textMuted }} />
              <Tooltip content={<TT />} />
              <Legend wrapperStyle={{ fontSize: 11, color: C.textSecondary }} />
              <Area type="monotone" dataKey="Konsultasiya" stroke={C.teal} fill="url(#gCons)" strokeWidth={2} />
              <Area type="monotone" dataKey="Qeydiyyat" stroke={C.accent} fill="url(#gReg)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
          {last && prev && last.consultations < prev.consultations && (
            <div className="flex items-center gap-2 mt-3 px-3 py-2 rounded-lg" style={{ background: C.redBg }}>
              <AlertTriangle size={13} className="text-red-400" />
              <span className="text-[11px] text-red-400">
                Konsultasiya sayı azalma trendindədir — ön-konsultasiya prosesi gücləndirilməlidir
              </span>
            </div>
          )}
        </div>

        <div style={{ background: C.card, borderColor: C.border }} className="rounded-xl border p-5">
          <SectionTitle icon={Award}>Nailiyyətlər & Növbəti Addımlar</SectionTitle>
          <div className="space-y-2.5">
            {achievements.map((a, i) => (
              <div key={i} className="flex items-start gap-2.5">
                {a.done ? (
                  <CheckCircle size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                ) : (
                  <div
                    className="w-3.5 h-3.5 rounded-full border-2 mt-0.5 shrink-0"
                    style={{ borderColor: C.accent }}
                  />
                )}
                <span className="text-[12px]" style={{ color: a.done ? C.textPrimary : C.textSecondary }}>
                  {a.text}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-lg" style={{ background: C.accentBg }}>
            <p className="text-[11px] font-semibold" style={{ color: C.accent }}>
              Q2 Hədəf
            </p>
            <p className="text-[11px] mt-1" style={{ color: C.textSecondary }}>
              CRM tam işə düşür → aylıq 25-35K gəlir → Q3-də investisiya geri ödənişi başlayır
            </p>
          </div>
        </div>
      </div>

      {/* Expense categories across months */}
      <div style={{ background: C.card, borderColor: C.border }} className="rounded-xl border p-5 mb-4">
        <SectionTitle icon={Wallet}>Xərc Kateqoriyaları — Aylıq Müqayisə</SectionTitle>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={expByMonth} barGap={1}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: C.textMuted }} axisLine={{ stroke: C.border }} />
            <YAxis tick={{ fontSize: 10, fill: C.textMuted }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                background: C.card,
                border: `1px solid ${C.border}`,
                borderRadius: 8,
                fontSize: 11,
                color: C.textPrimary,
              }}
              formatter={(v) => `${fmt(v)} ₼`}
            />
            <Legend wrapperStyle={{ fontSize: 10, color: C.textSecondary }} />
            {topCats.slice(0, 8).map((cat, i) => (
              <Bar key={cat} dataKey={cat} stackId="a" fill={PIE_C[i % PIE_C.length]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Roadmap comparison */}
      <div style={{ background: C.card, borderColor: C.border }} className="rounded-xl border p-5">
        <SectionTitle icon={Target}>Roadmap vs Real</SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full text-[11px]">
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                {["Ay", "Hədəf Tələbə", "Real Tələbə", "Hədəf Gəlir", "Real Gəlir", "Fərq"].map((h) => (
                  <th key={h} className="px-3 py-2.5 text-left font-semibold" style={{ color: C.textMuted }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((d) => {
                const rm = ROADMAP.find((r) => r.month === d.rmMonth);
                const gap = rm ? (((d.revenue - rm.revenue) / rm.revenue) * 100).toFixed(1) : null;
                return (
                  <tr key={d.id} style={{ borderBottom: `1px solid ${C.border}` }}>
                    <td className="px-3 py-2.5 font-semibold" style={{ color: C.textPrimary }}>
                      {d.month}
                    </td>
                    <td className="px-3 py-2.5" style={{ color: C.textSecondary }}>
                      {rm?.students || "—"}
                    </td>
                    <td className="px-3 py-2.5 font-medium" style={{ color: C.textPrimary }}>
                      {d.students}
                    </td>
                    <td className="px-3 py-2.5" style={{ color: C.textSecondary }}>
                      {rm ? fmt(rm.revenue) : "—"}
                    </td>
                    <td className="px-3 py-2.5 font-medium" style={{ color: C.textPrimary }}>
                      {fmt(d.revenue)}
                    </td>
                    <td
                      className={`px-3 py-2.5 font-bold ${parseFloat(gap) >= 0 ? "text-emerald-400" : "text-red-400"}`}
                    >
                      {gap}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function MonthDetail({ d, prev }) {
  const [expanded, setExpanded] = useState(null);
  const margin = d.revenue > 0 ? ((d.net / d.revenue) * 100).toFixed(1) : 0;
  const rps = d.students > 0 ? Math.round(d.revenue / d.students) : 0;
  const conv = d.consultations > 0 ? Math.round((d.registrations / d.consultations) * 100) : 0;
  const rm = ROADMAP.find((r) => r.month === d.rmMonth);
  const revGap = rm ? (((d.revenue - rm.revenue) / rm.revenue) * 100).toFixed(1) : null;
  const studGap = rm ? d.students - rm.studentsMax : null;
  const costPerReg = d.registrations > 0 ? Math.round(d.marketingSpend / d.registrations) : 0;
  const costPerCons = d.consultations > 0 ? Math.round(d.marketingSpend / d.consultations) : 0;
  const leadToConsRate = d.leadsFromIG > 0 ? ((d.consultations / d.leadsFromIG) * 100).toFixed(1) : 0;
  const leadsLost = d.leadsFromIG ? d.leadsFromIG - d.consultations : 0;

  const expData = (d.expBreak || []).sort((a, b) => b.a - a.a);
  const maxExp = expData.length > 0 ? expData[0].a : 1;

  const expTypes = {
    Maaş: { type: "Əməliyyat", icon: "💼" },
    Marketing: { type: "Marketing", icon: "📣" },
    "Borc ödəmə": { type: "Borc/Ödəniş", icon: "🏦" },
    "DSMF/Vergi": { type: "Vergi/Dövlət", icon: "🏛" },
    Kommunal: { type: "Əməliyyat", icon: "⚡" },
    İnventar: { type: "İnvestisiya", icon: "🛒" },
    "Daxili xərc": { type: "Əməliyyat", icon: "🔧" },
    "Geri qaytarma": { type: "Borc/Ödəniş", icon: "↩️" },
    İcarə: { type: "Əməliyyat", icon: "🏢" },
    Texnologiya: { type: "İnvestisiya", icon: "💻" },
    Digər: { type: "Digər", icon: "📋" },
  };
  const typeColors = {
    Əməliyyat: C.teal,
    Marketing: C.orange,
    "Borc/Ödəniş": C.red,
    "Vergi/Dövlət": C.purple,
    İnvestisiya: C.accent,
    Digər: C.textMuted,
  };

  const prevExpMap = {};
  if (prev)
    (prev.expBreak || []).forEach((e) => {
      prevExpMap[e.c] = e.a;
    });

  // Group totals by type
  const grouped = {};
  expData.forEach((e) => {
    const t = (expTypes[e.c] || {}).type || "Digər";
    grouped[t] = (grouped[t] || 0) + e.a;
  });
  const groupedArr = Object.entries(grouped).sort((a, b) => b[1] - a[1]);

  return (
    <div>
      {/* Header banner */}
      <div
        className="rounded-xl p-5 mb-6 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${C.card} 0%, ${C.border} 100%)` }}
      >
        <div className="absolute top-0 left-0 w-1.5 h-full" style={{ background: d.net >= 0 ? C.green : C.red }} />
        <div className="flex flex-wrap items-center justify-between gap-4 ml-3">
          <div>
            <p className="text-[11px] uppercase tracking-widest" style={{ color: C.textMuted }}>
              {d.year}
            </p>
            <h2 className="text-2xl font-bold" style={{ color: C.textPrimary }}>
              {d.month}
            </h2>
          </div>
          <div className="flex gap-6">
            <div className="text-center">
              <p className="text-[10px] uppercase" style={{ color: C.textMuted }}>
                Qalıq
              </p>
              <p className="text-lg font-bold" style={{ color: C.textSecondary }}>
                {fmt(d.qaliq || 0)} ₼
              </p>
            </div>
            <div className="text-center">
              <p className="text-[10px] uppercase" style={{ color: C.textMuted }}>
                Gəlir
              </p>
              <p className="text-lg font-bold" style={{ color: C.teal }}>
                {fmt(d.revenue)} ₼
              </p>
            </div>
            <div className="text-center">
              <p className="text-[10px] uppercase" style={{ color: C.textMuted }}>
                Xərc
              </p>
              <p className="text-lg font-bold" style={{ color: C.textSecondary }}>
                {fmt(d.expenses)} ₼
              </p>
            </div>
            <div className="text-center">
              <p className="text-[10px] uppercase" style={{ color: C.textMuted }}>
                Net
              </p>
              <p className={`text-lg font-bold ${d.net >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                {d.net >= 0 ? "+" : ""}
                {fmt(d.net)} ₼
              </p>
            </div>
            <div className="text-center">
              <p className="text-[10px] uppercase" style={{ color: C.textMuted }}>
                Qalıq (son)
              </p>
              <p className="text-lg font-bold" style={{ color: C.accent }}>
                {fmt(d.balance)} ₼
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Maliyyə */}
      <SectionTitle icon={Wallet}>Maliyyə</SectionTitle>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
        <Metric label="Əvvəlki qalıq" value={`${fmt(d.qaliq || 0)} ₼`} sub="Ay başı kassa" color={C.orange} />
        <Metric
          label="Gəlir"
          value={`${fmt(d.revenue)} ₼`}
          color={C.teal}
          trend={prev ? `${(((d.revenue - prev.revenue) / prev.revenue) * 100).toFixed(1)}%` : undefined}
        />
        <Metric label="Xərc" value={`${fmt(d.expenses)} ₼`} color={C.red} />
        <Metric label="Ay sonu qalıq" value={`${fmt(d.balance)} ₼`} sub="Kassa qalığı" color={C.accent} />
        <Metric label="Gəlir/Tələbə" value={`${rps} ₼`} sub={`Margin: ${margin}%`} color={C.purple} />
      </div>

      {/* XƏRC ANALİZİ */}
      <div style={{ background: C.card, borderColor: C.border }} className="rounded-xl border p-5 mb-4">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Wallet size={16} style={{ color: C.accent }} />
            <h3 className="text-sm font-bold" style={{ color: C.textPrimary }}>
              Xərc Analizi
            </h3>
          </div>
          {prev && (
            <span
              className={`text-[11px] px-2.5 py-1 rounded-full ${d.expenses > prev.expenses ? "text-red-400" : "text-emerald-400"}`}
              style={{ background: d.expenses > prev.expenses ? C.redBg : C.greenBg }}
            >
              {d.expenses > prev.expenses ? "+" : ""}
              {fmt(d.expenses - prev.expenses)} ₼ vs {prev.month}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Donut */}
          <div className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={210}>
              <PieChart>
                <Pie
                  data={groupedArr.map(([n, v]) => ({ name: n, value: v }))}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={82}
                  paddingAngle={3}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                >
                  {groupedArr.map(([n], i) => (
                    <Cell key={n} fill={typeColors[n] || C.textMuted} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v) => `${fmt(v)} ₼`}
                  contentStyle={{
                    background: C.navy || "#1A1F36",
                    border: `1px solid ${C.border}`,
                    borderRadius: 8,
                    fontSize: 11,
                    color: "#FFFFFF",
                  }}
                  itemStyle={{ color: "#FFFFFF" }}
                  labelStyle={{ color: "#FFFFFF", fontWeight: "bold" }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-2 justify-center mt-1">
              {groupedArr.map(([n]) => (
                <div key={n} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: typeColors[n] || C.textMuted }} />
                  <span className="text-[10px]" style={{ color: C.textSecondary }}>
                    {n}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Expandable bars */}
          <div className="lg:col-span-2 space-y-0.5">
            {expData.map((e) => {
              const info = expTypes[e.c] || { type: "Digər", icon: "📋" };
              const tc = typeColors[info.type] || C.textMuted;
              const pct = ((e.a / d.expenses) * 100).toFixed(1);
              const barW = (e.a / maxExp) * 100;
              const prevVal = prevExpMap[e.c];
              const diff = prevVal ? e.a - prevVal : null;
              const isOpen = expanded === e.c;
              const hasSub = e.sub && e.sub.length > 0;

              return (
                <div key={e.c}>
                  <div
                    className="rounded-lg px-3 py-2.5 cursor-pointer transition-colors"
                    style={{ background: isOpen ? C.cardHover : "transparent" }}
                    onClick={() => hasSub && setExpanded(isOpen ? null : e.c)}
                    onMouseEnter={(ev) => {
                      if (!isOpen) ev.currentTarget.style.background = C.cardHover;
                    }}
                    onMouseLeave={(ev) => {
                      if (!isOpen) ev.currentTarget.style.background = "transparent";
                    }}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-[13px]">{info.icon}</span>
                        <span className="text-[12px] font-medium" style={{ color: C.textPrimary }}>
                          {e.c}
                        </span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded" style={{ background: tc + "18", color: tc }}>
                          {info.type}
                        </span>
                        {hasSub && (
                          <ChevronDown
                            size={12}
                            style={{
                              color: C.textMuted,
                              transform: isOpen ? "rotate(180deg)" : "rotate(0)",
                              transition: "transform 0.2s",
                            }}
                          />
                        )}
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        {diff !== null && (
                          <span
                            className={`text-[10px] font-medium ${diff > 0 ? "text-red-400" : diff < 0 ? "text-emerald-400" : ""}`}
                            style={{ color: diff === 0 ? C.textMuted : undefined }}
                          >
                            {diff > 0 ? "↑" : diff < 0 ? "↓" : "="}
                            {diff !== 0 ? ` ${fmt(Math.abs(diff))}` : ""}
                          </span>
                        )}
                        <span className="text-[12px] font-bold tabular-nums" style={{ color: C.textPrimary }}>
                          {fmt(e.a)} ₼
                        </span>
                        <span className="text-[10px] tabular-nums w-10 text-right" style={{ color: C.textMuted }}>
                          {pct}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full h-1.5 rounded-full" style={{ background: C.border }}>
                      <div
                        className="h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${barW}%`, background: tc, opacity: 0.75 }}
                      />
                    </div>
                  </div>
                  {/* Subcategory expansion */}
                  {isOpen && hasSub && (
                    <div className="ml-8 mr-3 mb-2 mt-1 space-y-1 pl-3" style={{ borderLeft: `2px solid ${tc}30` }}>
                      {e.sub.map((s, si) => (
                        <div key={si} className="flex items-center justify-between py-1.5">
                          <div className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full" style={{ background: tc }} />
                            <span className="text-[11px]" style={{ color: C.textSecondary }}>
                              {s.n}
                            </span>
                          </div>
                          <span className="text-[11px] font-semibold tabular-nums" style={{ color: C.textPrimary }}>
                            {fmt(s.a)} ₼
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Type chips */}
            <div className="flex flex-wrap gap-2 px-3 mt-3 pt-3" style={{ borderTop: `1px solid ${C.border}` }}>
              {groupedArr.map(([n, v]) => (
                <div
                  key={n}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"
                  style={{
                    background: (typeColors[n] || C.textMuted) + "10",
                    border: `1px solid ${typeColors[n] || C.textMuted}25`,
                  }}
                >
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: typeColors[n] || C.textMuted }} />
                  <span className="text-[10px] font-medium" style={{ color: typeColors[n] || C.textMuted }}>
                    {n}
                  </span>
                  <span className="text-[10px] font-bold" style={{ color: C.textPrimary }}>
                    {fmt(v)} ₼
                  </span>
                  <span className="text-[9px]" style={{ color: C.textMuted }}>
                    {((v / d.expenses) * 100).toFixed(0)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pul axını */}
        <div className="mt-5 pt-4" style={{ borderTop: `1px solid ${C.border}` }}>
          <p className="text-[10px] uppercase tracking-widest mb-3" style={{ color: C.textMuted }}>
            Pul axını
          </p>
          <div className="flex items-center gap-1 overflow-x-auto">
            {[
              { label: "Qalıq", value: d.qaliq || 0, color: C.textSecondary, op: "" },
              { label: "Gəlir", value: d.revenue, color: C.green, op: "+" },
              { label: "Xərc", value: d.expenses, color: C.red, op: "−" },
              { label: "Nəticə", value: d.balance, color: C.accent, op: "=" },
            ].map((item, i) => (
              <div key={item.label} className="flex items-center gap-1">
                {i > 0 && (
                  <span className="text-lg font-bold px-1" style={{ color: C.textMuted }}>
                    {item.op}
                  </span>
                )}
                <div
                  className="text-center px-4 py-2.5 rounded-lg min-w-[90px]"
                  style={{ background: item.color + "12", border: `1px solid ${item.color}30` }}
                >
                  <p className="text-[9px] uppercase" style={{ color: C.textMuted }}>
                    {item.label}
                  </p>
                  <p className="text-sm font-bold tabular-nums" style={{ color: item.color }}>
                    {fmt(item.value)} ₼
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Satış */}
      <SectionTitle icon={ShoppingCart}>Satış</SectionTitle>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <Metric
          label="Konsultasiya"
          value={d.consultations}
          color={C.teal}
          trend={prev ? `${d.consultations - prev.consultations}` : undefined}
        />
        <Metric
          label="Yeni Qeydiyyat"
          value={d.registrations}
          color={C.accent}
          trend={prev ? `${d.registrations - prev.registrations}` : undefined}
        />
        <Metric
          label="Konversiya"
          value={`${conv}%`}
          sub="Konsultasiya → Qeydiyyat"
          color={conv >= 70 ? C.green : C.red}
        />
        <Metric
          label="Lead → Kons."
          value={`${leadToConsRate}%`}
          sub={`${fmt(leadsLost)} lead itirildi`}
          color={parseFloat(leadToConsRate) < 10 ? C.red : C.green}
        />
      </div>
      {d.consultations < 30 && (
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg mb-4" style={{ background: C.redBg }}>
          <AlertTriangle size={14} className="text-red-400 shrink-0" />
          <span className="text-[11px] text-red-400">
            Konsultasiya sayı kritik aşağıdır. {d.leadsFromIG} IG lead-dən yalnız {d.consultations} nəfər konsultasiyaya
            çatıb ({leadToConsRate}%).
          </span>
        </div>
      )}

      {/* Marketing */}
      <SectionTitle icon={Megaphone}>Marketing</SectionTitle>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
        <Metric
          label="Marketing Xərci"
          value={`${fmt(d.marketingSpend)} ₼`}
          sub={`Xərcin ${((d.marketingSpend / d.expenses) * 100).toFixed(0)}%-i`}
          color={C.orange}
        />
        <Metric label="IG Lead" value={fmt(d.leadsFromIG || 0)} sub="Instagram-dan gələn" color={C.purple} />
        <Metric
          label="İtirilən Lead"
          value={fmt(leadsLost)}
          sub={`${(100 - parseFloat(leadToConsRate)).toFixed(0)}% itirilir`}
          color={C.red}
        />
        <Metric label="CAC" value={`${fmt(costPerReg)} ₼`} sub="Xərc / Qeydiyyat" color={C.teal} />
        <Metric label="Xərc/Konsult." value={`${fmt(costPerCons)} ₼`} sub="Xərc / Konsultasiya" color={C.accent} />
      </div>

      {/* Tələbə */}
      <SectionTitle icon={GraduationCap}>Tələbə</SectionTitle>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
        <Metric
          label="Aktiv Tələbə"
          value={d.students}
          color={C.accent}
          trend={prev ? `${d.students - prev.students} nəfər` : undefined}
        />
        <Metric label="Gəlir/Tələbə" value={`${rps} ₼`} color={C.teal} />
        <Metric
          label="Roadmap Fərq"
          value={rm ? `${studGap >= 0 ? "+" : ""}${studGap}` : "—"}
          sub={rm ? `Hədəf: ${rm.students} | Real: ${d.students}` : ""}
          color={studGap >= 0 ? C.green : C.red}
        />
      </div>

      {/* Roadmap progress */}
      {rm && (
        <div style={{ background: C.card, borderColor: C.border }} className="rounded-xl border p-5 mb-4">
          <p className="text-xs font-semibold mb-3" style={{ color: C.textPrimary }}>
            Roadmap Ay {d.rmMonth} — Hədəf vs Real
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span style={{ color: C.textMuted }}>Gəlir hədəfi</span>
                <span style={{ color: C.textPrimary }}>{fmt(rm.revenue)} ₼</span>
              </div>
              <div className="w-full h-2 rounded-full" style={{ background: C.border }}>
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${Math.min(100, (d.revenue / rm.revenue) * 100)}%`,
                    background: d.revenue >= rm.revenue ? C.green : C.accent,
                  }}
                />
              </div>
              <p className="text-[10px] mt-1" style={{ color: d.revenue >= rm.revenue ? C.green : C.red }}>
                Real: {fmt(d.revenue)} ₼ ({revGap}%)
              </p>
            </div>
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span style={{ color: C.textMuted }}>Tələbə hədəfi</span>
                <span style={{ color: C.textPrimary }}>{rm.studentsMax}</span>
              </div>
              <div className="w-full h-2 rounded-full" style={{ background: C.border }}>
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${Math.min(100, (d.students / rm.studentsMax) * 100)}%`,
                    background: d.students >= rm.studentsMax ? C.green : C.accent,
                  }}
                />
              </div>
              <p className="text-[10px] mt-1" style={{ color: studGap >= 0 ? C.green : C.red }}>
                Real: {d.students} ({studGap >= 0 ? "+" : ""}
                {studGap})
              </p>
            </div>
          </div>
        </div>
      )}

      {/* INVESTOR NOTES PANEL */}
      {d.notes && (
        <div style={{ background: C.card, borderColor: C.border }} className="rounded-xl border overflow-hidden mb-4">
          <div
            className="px-5 py-3 flex items-center gap-2"
            style={{ background: C.accentBg, borderBottom: `1px solid ${C.border}` }}
          >
            <Calendar size={14} style={{ color: C.accent }} />
            <h3 className="text-sm font-bold" style={{ color: C.accent }}>
              Ayın Qeydi — İnvestor üçün
            </h3>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <p className="text-[10px] uppercase tracking-widest mb-1.5" style={{ color: C.teal }}>
                Xülasə
              </p>
              <p className="text-[12px] leading-relaxed" style={{ color: C.textPrimary }}>
                {d.notes.summary}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest mb-1.5" style={{ color: C.orange }}>
                Niyə belə nəticə?
              </p>
              <p className="text-[12px] leading-relaxed" style={{ color: C.textSecondary }}>
                {d.notes.why}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest mb-1.5" style={{ color: C.green }}>
                Növbəti addımlar
              </p>
              <p className="text-[12px] leading-relaxed" style={{ color: C.textPrimary }}>
                {d.notes.plans}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AddForm({ onAdd, onCancel, ids }) {
  const [f, sF] = useState({
    month: "",
    year: 2026,
    revenue: "",
    expenses: "",
    students: "",
    consultations: "",
    registrations: "",
    balance: "",
    qaliq: "",
    marketingSpend: "",
    leadsFromIG: "",
  });
  const ms = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "İyun",
    "İyul",
    "Avqust",
    "Sentyabr",
    "Oktyabr",
    "Noyabr",
    "Dekabr",
  ];
  const submit = () => {
    if (!f.month || !f.revenue) return;
    const mi = ms.indexOf(f.month) + 1;
    const id = `${f.year}-${String(mi).padStart(2, "0")}`;
    if (ids.includes(id)) {
      alert("Bu ay artıq var!");
      return;
    }
    const r = parseFloat(f.revenue) || 0,
      e = parseFloat(f.expenses) || 0;
    onAdd({
      id,
      month: f.month,
      year: +f.year,
      rmMonth: ids.length + 5,
      qaliq: parseFloat(f.qaliq) || 0,
      revenue: r,
      expenses: e,
      net: r - e,
      balance: parseFloat(f.balance) || 0,
      students: +f.students || 0,
      consultations: +f.consultations || 0,
      registrations: +f.registrations || 0,
      marketingSpend: parseFloat(f.marketingSpend) || 0,
      leadsFromIG: +f.leadsFromIG || 0,
      expBreak: [],
    });
  };
  const ic = "w-full px-3 py-2 rounded-lg text-sm border focus:outline-none focus:ring-2 focus:ring-amber-500/30";
  return (
    <div style={{ background: C.card, borderColor: C.border }} className="rounded-xl border p-5 mb-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-bold" style={{ color: C.textPrimary }}>
          Yeni Ay Əlavə Et
        </h3>
        <button onClick={onCancel}>
          <X size={16} style={{ color: C.textMuted }} />
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { l: "Ay", k: "month", type: "select", opts: ms },
          { l: "İl", k: "year" },
          { l: "Əvvəlki qalıq (₼)", k: "qaliq" },
          { l: "Gəlir (₼)", k: "revenue" },
          { l: "Xərc (₼)", k: "expenses" },
          { l: "Tələbə", k: "students" },
          { l: "Konsultasiya", k: "consultations" },
          { l: "Qeydiyyat", k: "registrations" },
          { l: "Ay sonu qalıq (₼)", k: "balance" },
          { l: "Marketing (₼)", k: "marketingSpend" },
          { l: "IG Lead", k: "leadsFromIG" },
        ].map(({ l, k, type, opts }) => (
          <div key={k}>
            <label className="text-[10px] uppercase tracking-wider block mb-1" style={{ color: C.textMuted }}>
              {l}
            </label>
            {type === "select" ? (
              <select
                value={f[k]}
                onChange={(e) => sF({ ...f, [k]: e.target.value })}
                className={ic}
                style={{ background: C.bg, color: C.textPrimary, borderColor: C.border }}
              >
                <option value="">Seç</option>
                {opts.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="number"
                value={f[k]}
                onChange={(e) => sF({ ...f, [k]: e.target.value })}
                className={ic}
                style={{ background: C.bg, color: C.textPrimary, borderColor: C.border }}
              />
            )}
          </div>
        ))}
      </div>
      <button
        onClick={submit}
        className="mt-4 px-5 py-2 rounded-lg text-sm font-medium text-white"
        style={{ background: C.accent }}
      >
        Əlavə Et
      </button>
    </div>
  );
}

export default function Dashboard() {
  const [data, setData] = useState(INIT);
  const [tab, setTab] = useState("overview");
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const r = await window.storage.get(SK);
        if (r?.value) {
          const p = JSON.parse(r.value);
          if (Array.isArray(p) && p.length) setData(p);
        }
      } catch {}
      setLoading(false);
    })();
  }, []);

  const save = useCallback(async (nd) => {
    setData(nd);
    try {
      await window.storage.set(SK, JSON.stringify(nd));
    } catch {}
  }, []);
  const addMonth = useCallback(
    (m) => {
      save([...data, m].sort((a, b) => a.id.localeCompare(b.id)));
      setShowAdd(false);
      setTab(m.id);
    },
    [data, save],
  );
  const delMonth = useCallback(
    (id) => {
      if (confirm("Silmək istəyirsiniz?")) {
        save(data.filter((d) => d.id !== id));
        setTab("overview");
      }
    },
    [data, save],
  );

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: C.bg }}>
        <div
          className="w-6 h-6 border-2 rounded-full animate-spin"
          style={{ borderColor: C.accent, borderTopColor: "transparent" }}
        />
      </div>
    );

  const activeMonth = data.find((d) => d.id === tab);
  const prevMonth = activeMonth ? data[data.indexOf(activeMonth) - 1] : null;

  return (
    <div className="min-h-screen" style={{ background: C.bg, fontFamily: "'Inter',-apple-system,sans-serif" }}>
      {/* Header */}
      <div className="px-4 py-4 border-b" style={{ borderColor: C.border, background: C.card }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-7 rounded-full" style={{ background: C.accent }} />
            <div>
              <h1 className="text-base font-bold tracking-tight" style={{ color: C.textPrimary }}>
                ARTMONIA ACADEMY
              </h1>
              <p className="text-[10px] uppercase tracking-widest" style={{ color: C.textMuted }}>
                İnvestor Dashboard
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium"
            style={{ background: C.accent, color: C.bg }}
          >
            <Plus size={13} /> Yeni Ay
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b overflow-x-auto" style={{ borderColor: C.border, background: C.card }}>
        <div className="max-w-6xl mx-auto flex">
          <button
            onClick={() => setTab("overview")}
            className="px-5 py-3 text-[12px] font-medium border-b-2 transition-colors whitespace-nowrap"
            style={{
              borderColor: tab === "overview" ? C.accent : "transparent",
              color: tab === "overview" ? C.accent : C.textMuted,
            }}
          >
            Ümumi
          </button>
          {data.map((d) => (
            <button
              key={d.id}
              onClick={() => setTab(d.id)}
              className="px-4 py-3 text-[12px] font-medium border-b-2 transition-colors whitespace-nowrap"
              style={{
                borderColor: tab === d.id ? C.accent : "transparent",
                color: tab === d.id ? C.accent : C.textMuted,
              }}
            >
              {d.month} {d.year !== 2026 ? d.year : ""}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-5">
        {showAdd && <AddForm onAdd={addMonth} onCancel={() => setShowAdd(false)} ids={data.map((d) => d.id)} />}

        {tab === "overview" ? (
          <Overview data={data} />
        ) : activeMonth ? (
          <div>
            <MonthDetail d={activeMonth} prev={prevMonth} />
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => delMonth(activeMonth.id)}
                className="text-[11px] px-3 py-1.5 rounded-lg border"
                style={{ color: C.textMuted, borderColor: C.border }}
              >
                Bu ayı sil
              </button>
            </div>
          </div>
        ) : null}

        <div className="text-center py-8 mt-4 border-t" style={{ borderColor: C.border }}>
          <p className="text-[11px]" style={{ color: C.textMuted }}>
            Artmonia Academy — İnvestor Dashboard
          </p>
          <p className="text-[10px] mt-1" style={{ color: C.textMuted }}>
            Son yenilənmə: {new Date().toLocaleDateString("az-AZ")}
          </p>
        </div>
      </div>
    </div>
  );
}
