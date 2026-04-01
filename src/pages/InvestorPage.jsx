import { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import {
  TrendingUp, Users, DollarSign, Target, ArrowUpRight, ArrowDownRight,
  Briefcase, GraduationCap, Calendar, Percent,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const revenueData = [
  { month: "Yan", revenue: 12400, expenses: 8200, profit: 4200 },
  { month: "Fev", revenue: 14800, expenses: 8800, profit: 6000 },
  { month: "Mar", revenue: 18200, expenses: 9400, profit: 8800 },
  { month: "Apr", revenue: 22600, expenses: 10200, profit: 12400 },
  { month: "May", revenue: 26400, expenses: 11000, profit: 15400 },
  { month: "İyn", revenue: 31200, expenses: 12400, profit: 18800 },
  { month: "İyl", revenue: 28800, expenses: 11800, profit: 17000 },
  { month: "Avq", revenue: 34600, expenses: 13200, profit: 21400 },
  { month: "Sen", revenue: 38400, expenses: 14000, profit: 24400 },
  { month: "Okt", revenue: 42200, expenses: 14800, profit: 27400 },
  { month: "Noy", revenue: 46800, expenses: 15600, profit: 31200 },
  { month: "Dek", revenue: 52400, expenses: 16800, profit: 35600 },
];

const studentGrowth = [
  { month: "Yan", students: 45 },
  { month: "Fev", students: 62 },
  { month: "Mar", students: 78 },
  { month: "Apr", students: 95 },
  { month: "May", students: 118 },
  { month: "İyn", students: 142 },
  { month: "İyl", students: 134 },
  { month: "Avq", students: 168 },
  { month: "Sen", students: 195 },
  { month: "Okt", students: 224 },
  { month: "Noy", students: 256 },
  { month: "Dek", students: 290 },
];

const revenueBreakdown = [
  { name: "Standart Paket", value: 45, color: "hsl(33, 89%, 51%)" },
  { name: "Premium Paket", value: 30, color: "hsl(250, 70%, 40%)" },
  { name: "Online Kurslar", value: 15, color: "hsl(33, 89%, 70%)" },
  { name: "Workshop & Masterclass", value: 10, color: "hsl(250, 50%, 60%)" },
];

const quarterlyMetrics = [
  { quarter: "Q1", retention: 87, satisfaction: 92, completion: 78 },
  { quarter: "Q2", retention: 89, satisfaction: 94, completion: 82 },
  { quarter: "Q3", retention: 91, satisfaction: 95, completion: 85 },
  { quarter: "Q4", retention: 93, satisfaction: 96, completion: 88 },
];

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ElementType;
  prefix?: string;
}

const KPICard = ({ title, value, change, icon: Icon, prefix = "" }: KPICardProps) => {
  const isPositive = change > 0;
  return (
    <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2.5 rounded-xl bg-primary/10">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
            isPositive ? "text-green-600 bg-green-50" : "text-red-500 bg-red-50"
          }`}>
            {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {Math.abs(change)}%
          </span>
        </div>
        <p className="text-2xl font-bold text-foreground">{prefix}{value}</p>
        <p className="text-sm text-muted-foreground mt-1">{title}</p>
      </CardContent>
    </Card>
  );
};

const InvestorPage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Artmonia — İnvestor Dashboard</h1>
            <p className="text-sm text-muted-foreground">Maliyyə & Böyümə Hesabatı — 2026</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar size={14} />
            Son yenilənmə: {new Date().toLocaleDateString("az-AZ")}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard icon={DollarSign} title="İllik Gəlir" value="368K" change={34} prefix="₼" />
          <KPICard icon={Users} title="Aktiv Tələbə" value="290" change={28} />
          <KPICard icon={Target} title="Saxlama Dərəcəsi" value="93%" change={6} />
          <KPICard icon={Percent} title="Mənfəət Marjası" value="68%" change={12} />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-muted/50">
            <TabsTrigger value="overview">Ümumi Baxış</TabsTrigger>
            <TabsTrigger value="revenue">Gəlir</TabsTrigger>
            <TabsTrigger value="growth">Böyümə</TabsTrigger>
            <TabsTrigger value="metrics">Metrikalar</TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Revenue Chart */}
              <Card className="lg:col-span-2 border-border/50">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <TrendingUp size={18} className="text-primary" />
                    Gəlir vs Xərc
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(33, 89%, 51%)" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(33, 89%, 51%)" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(250, 70%, 40%)" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="hsl(250, 70%, 40%)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                      <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          background: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                          fontSize: "12px",
                        }}
                        formatter={(value: number) => [`₼${value.toLocaleString()}`, ""]}
                      />
                      <Area type="monotone" dataKey="revenue" stroke="hsl(33, 89%, 51%)" fill="url(#colorRevenue)" name="Gəlir" strokeWidth={2} />
                      <Area type="monotone" dataKey="expenses" stroke="hsl(250, 70%, 40%)" fill="url(#colorExpenses)" name="Xərc" strokeWidth={2} />
                      <Legend />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Pie Chart */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Briefcase size={18} className="text-primary" />
                    Gəlir Paylanması
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie data={revenueBreakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={4}>
                        {revenueBreakdown.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => [`${value}%`, ""]} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2 mt-2">
                    {revenueBreakdown.map((item) => (
                      <div key={item.name} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                          <span className="text-muted-foreground">{item.name}</span>
                        </div>
                        <span className="font-semibold text-foreground">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Revenue */}
          <TabsContent value="revenue" className="mt-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base">Aylıq Mənfəət</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                    <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => [`₼${value.toLocaleString()}`, ""]}
                    />
                    <Bar dataKey="profit" fill="hsl(33, 89%, 51%)" radius={[6, 6, 0, 0]} name="Mənfəət" />
                    <Legend />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Growth */}
          <TabsContent value="growth" className="mt-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <GraduationCap size={18} className="text-primary" />
                  Tələbə Artımı
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={studentGrowth}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                    <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Line type="monotone" dataKey="students" stroke="hsl(33, 89%, 51%)" strokeWidth={3} dot={{ r: 4, fill: "hsl(33, 89%, 51%)" }} name="Tələbələr" />
                    <Legend />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Metrics */}
          <TabsContent value="metrics" className="mt-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base">Rüblük Performans Metrikaları</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={quarterlyMetrics}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="quarter" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                    <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" domain={[60, 100]} />
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => [`${value}%`, ""]}
                    />
                    <Bar dataKey="retention" fill="hsl(33, 89%, 51%)" radius={[4, 4, 0, 0]} name="Saxlama" />
                    <Bar dataKey="satisfaction" fill="hsl(250, 70%, 40%)" radius={[4, 4, 0, 0]} name="Məmnuniyyət" />
                    <Bar dataKey="completion" fill="hsl(33, 89%, 70%)" radius={[4, 4, 0, 0]} name="Bitirmə" />
                    <Legend />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default InvestorPage;
