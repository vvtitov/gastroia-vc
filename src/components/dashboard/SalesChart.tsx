
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// Mock data for the MVP
const dailyData = [
  { name: "Lun", ventas: 2400 },
  { name: "Mar", ventas: 1398 },
  { name: "Mié", ventas: 9800 },
  { name: "Jue", ventas: 3908 },
  { name: "Vie", ventas: 4800 },
  { name: "Sáb", ventas: 3800 },
  { name: "Dom", ventas: 4300 },
];

const weeklyData = [
  { name: "Semana 1", ventas: 8400 },
  { name: "Semana 2", ventas: 7398 },
  { name: "Semana 3", ventas: 9800 },
  { name: "Semana 4", ventas: 13908 },
];

const monthlyData = [
  { name: "Ene", ventas: 24000 },
  { name: "Feb", ventas: 21398 },
  { name: "Mar", ventas: 29800 },
  { name: "Abr", ventas: 27908 },
  { name: "May", ventas: 34800 },
  { name: "Jun", ventas: 38000 },
];

export const SalesChart: React.FC = () => {
  const [period, setPeriod] = React.useState("daily");
  
  const data = React.useMemo(() => {
    switch (period) {
      case "weekly":
        return weeklyData;
      case "monthly":
        return monthlyData;
      default:
        return dailyData;
    }
  }, [period]);

  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base font-medium">Ventas</CardTitle>
        <Select defaultValue="daily" onValueChange={setPeriod}>
          <SelectTrigger className="w-[120px] h-8">
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Diario</SelectItem>
            <SelectItem value="weekly">Semanal</SelectItem>
            <SelectItem value="monthly">Mensual</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="pt-0">
        <ResponsiveContainer width="100%" height={250} className="mt-2">

          <BarChart data={data} margin={{ top: 20, right: 0, left: -20, bottom: 0 }} className="text-xs sm:text-sm">
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
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
              dataKey="ventas" 
              fill="#3182FF" 
              radius={[4, 4, 0, 0]}
              barSize={period === "daily" ? 20 : 30}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
