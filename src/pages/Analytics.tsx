
import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { Separator } from "@/components/ui/separator";
import { 
  BarChart3, LineChart, PieChart, TrendingUp, 
  Calendar, Users, Utensils, Sparkles, ArrowRight, 
  ChevronsUp, ChevronsDown, Lightbulb, Clock
} from "lucide-react";
import { motion } from "framer-motion";
import { 
  Bar, 
  BarChart, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis,
  Line,
  LineChart as RechartsLineChart,
  Cell,
  Pie,
  PieChart as RechartsPieChart,
  Legend
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { toast } from "@/components/ui/use-toast";

// Mock data
const salesByHourData = [
  { hour: "10:00", sales: 420 },
  { hour: "11:00", sales: 680 },
  { hour: "12:00", sales: 1200 },
  { hour: "13:00", sales: 1890 },
  { hour: "14:00", sales: 2100 },
  { hour: "15:00", sales: 980 },
  { hour: "16:00", sales: 750 },
  { hour: "17:00", sales: 870 },
  { hour: "18:00", sales: 1250 },
  { hour: "19:00", sales: 1950 },
  { hour: "20:00", sales: 2450 },
  { hour: "21:00", sales: 2100 },
  { hour: "22:00", sales: 1650 },
  { hour: "23:00", sales: 820 },
];

const categoryData = [
  { name: "Entradas", value: 18 },
  { name: "Platos Principales", value: 42 },
  { name: "Bebidas", value: 28 },
  { name: "Postres", value: 12 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const topSellingItems = [
  { name: "Milanesa Napolitana", category: "Platos Principales", sales: 124, trend: "up" },
  { name: "Cerveza Artesanal", category: "Bebidas", sales: 98, trend: "up" },
  { name: "Tiramisú", category: "Postres", sales: 67, trend: "down" },
  { name: "Ensalada César", category: "Entradas", sales: 62, trend: "up" },
  { name: "Coca Cola", category: "Bebidas", sales: 54, trend: "neutral" },
];

const aiRecommendations = [
  {
    id: 1,
    title: "Optimiza tus horarios de apertura",
    description: "Basado en tus datos de ventas, puedes aumentar la rentabilidad adelantando la apertura 1 hora los fines de semana.",
    impact: "Alto",
    icon: Clock,
  },
  {
    id: 2,
    title: "Promoción de combos sugeridos",
    description: "Crear un combo con los 3 productos más vendidos podría aumentar el ticket promedio en un 15%.",
    impact: "Medio",
    icon: TrendingUp,
  },
  {
    id: 3,
    title: "Menú de mediodía optimizado",
    description: "Incluir más opciones vegetarianas en el menú de mediodía podría atraer a un nuevo segmento de clientes.",
    impact: "Medio",
    icon: Utensils,
  },
  {
    id: 4,
    title: "Campaña de fidelización",
    description: "Implementa un sistema de puntos para clientes frecuentes en base a los patrones de visita identificados.",
    impact: "Alto",
    icon: Users,
  },
];

const ImpactBadge = ({ impact }: { impact: string }) => {
  const color = 
    impact === "Alto"
      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      : impact === "Medio"
      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
  
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${color}`}>
    {impact}
  </span>;
};

const Analytics = () => {
  const [period, setPeriod] = useState("week");
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <motion.h1 
            className="text-3xl font-bold"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            Estadísticas
          </motion.h1>
          
          <div className="flex items-center gap-2">
            <Select defaultValue={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Hoy</SelectItem>
                <SelectItem value="week">Esta semana</SelectItem>
                <SelectItem value="month">Este mes</SelectItem>
                <SelectItem value="year">Este año</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon">
              <Calendar className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="sales">
          <TabsList>
            <TabsTrigger value="sales" className="flex items-center gap-1">
              <BarChart3 className="h-4 w-4" />
              <span>Ventas</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-1">
              <Utensils className="h-4 w-4" />
              <span>Productos</span>
            </TabsTrigger>
            <TabsTrigger value="customers" className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>Clientes</span>
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-1">
              <Sparkles className="h-4 w-4" />
              <span>IA Insights</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sales" className="space-y-6 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Ventas del día</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">$4,329.00</div>
                    <p className="text-sm text-muted-foreground mt-1">+12% vs. ayer</p>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Ticket promedio</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">$875.30</div>
                    <p className="text-sm text-muted-foreground mt-1">-3% vs. ayer</p>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Cantidad de pedidos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">48</div>
                    <p className="text-sm text-muted-foreground mt-1">+8% vs. ayer</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
            
            <SalesChart />
            
            <Card>
              <CardHeader>
                <CardTitle>Ventas por hora</CardTitle>
                <CardDescription>Analiza las horas pico de tu negocio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesByHourData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis 
                        dataKey="hour"
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value}`}
                      />
                      <Tooltip
                        formatter={(value) => [`$${value}`, "Ventas"]}
                        cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                      />
                      <Bar
                        dataKey="sales"
                        fill="#3182FF"
                        radius={[4, 4, 0, 0]}
                        barSize={30}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <div className="text-sm text-muted-foreground">
                  Horario pico: <span className="font-medium text-foreground">20:00 - 21:00</span>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-6 pt-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Productos más vendidos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topSellingItems.map((item, i) => (
                      <div 
                        key={i} 
                        className="flex items-center justify-between p-3 rounded-lg border"
                      >
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">{item.category}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{item.sales} vendidos</span>
                          {item.trend === "up" && <ChevronsUp className="text-green-500 h-5 w-5" />}
                          {item.trend === "down" && <ChevronsDown className="text-red-500 h-5 w-5" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Ventas por categoría</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center">
                  <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Legend />
                        <Tooltip formatter={(value) => [`${value}%`, "Porcentaje"]} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="customers" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Análisis de clientes</CardTitle>
                <CardDescription>Datos próximamente disponibles</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <p className="text-muted-foreground">Estamos trabajando para traerte estadísticas detalladas de clientes</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-gastro" />
                  <span>Recomendaciones Inteligentes</span>
                </CardTitle>
                <CardDescription>
                  Sugerencias personalizadas basadas en el análisis de tus datos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  {aiRecommendations.map((recommendation, index) => (
                    <motion.div
                      key={recommendation.id}
                      className="border rounded-lg p-4 shadow-sm relative overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="absolute top-0 right-0 bg-gastro/5 rounded-bl-xl p-2">
                        <recommendation.icon className="h-6 w-6 text-gastro" />
                      </div>
                      <div className="pt-8">
                        <h3 className="font-medium mb-1">{recommendation.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{recommendation.description}</p>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-xs text-muted-foreground mr-2">Impacto:</span>
                            <ImpactBadge impact={recommendation.impact} />
                          </div>
                          <Button variant="ghost" size="sm" className="h-8" onClick={() => {
                            toast({
                              title: "Recomendación aplicada",
                              description: `Has aplicado "${recommendation.title}" a tu estrategia.`,
                            });
                          }}>
                            <span>Ver detalles</span>
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center border-t pt-6">
                <div className="flex items-center text-sm">
                  <Lightbulb className="h-4 w-4 mr-2 text-amber-500" />
                  <span>Las recomendaciones se actualizan cada 24 horas con nuevos datos</span>
                </div>
                <Button>Ver todas</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
