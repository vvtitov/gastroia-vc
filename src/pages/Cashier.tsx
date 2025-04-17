import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { 
  BadgePlus, 
  BadgeMinus, 
  Search, 
  Calendar, 
  Filter, 
  GridIcon, 
  Users, 
  Receipt, 
  CreditCard, 
  Clock, 
  MonitorSmartphone 
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogContent, Dialog } from "@/components/ui/dialog";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { TableManagement } from "@/components/restaurant/TableManagement";
import { RestaurantOrders } from "@/components/restaurant/RestaurantOrders";
import { TablesGrid } from "@/components/restaurant/TablesGrid";
import { motion, AnimatePresence } from "framer-motion";

const Cashier = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totals, setTotals] = useState({ income: 0, expenses: 0, balance: 0 });
  const [mainTab, setMainTab] = useState("tables"); // "tables", "transactions", "orders"
  
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('business_id', user?.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setTransactions(data || []);
      calculateTotals(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las transacciones",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateTotals = (transactions) => {
    const totals = transactions.reduce(
      (acc, transaction) => {
        if (transaction.transaction_type === 'income') {
          acc.income += parseFloat(transaction.amount);
        } else {
          acc.expenses += parseFloat(transaction.amount);
        }
        return acc;
      },
      { income: 0, expenses: 0 }
    );
    
    totals.balance = totals.income - totals.expenses;
    setTotals(totals);
  };

  const handleNewTransaction = async (type) => {
    try {
      const mockTransaction = {
        amount: type === 'income' ? 150.00 : 50.00,
        transaction_type: type,
        payment_method: 'cash',
        description: `${type === 'income' ? 'Venta' : 'Compra'} de prueba`,
        business_id: user?.id
      };
      
      const { data, error } = await supabase
        .from('transactions')
        .insert([mockTransaction])
        .select();
        
      if (error) throw error;
      
      toast({
        title: "Éxito",
        description: `La transacción se ha registrado correctamente`,
      });
      
      fetchTransactions();
      
    } catch (error) {
      console.error('Error creating transaction:', error);
      toast({
        title: "Error",
        description: "No se pudo registrar la transacción",
        variant: "destructive",
      });
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <motion.div 
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div>
            <h1 className="text-3xl font-bold">Caja y Salón</h1>
            <p className="text-muted-foreground">Gestiona mesas, pedidos, ingresos y egresos</p>
          </div>
          <Tabs value={mainTab} onValueChange={setMainTab} className="w-full sm:w-auto">
            <TabsList className="grid w-full sm:w-auto grid-cols-3 h-10">
              <TabsTrigger value="tables" className="flex items-center gap-1">
                <GridIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Mesas</span>
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center gap-1">
                <Receipt className="h-4 w-4" />
                <span className="hidden sm:inline">Pedidos</span>
              </TabsTrigger>
              <TabsTrigger value="transactions" className="flex items-center gap-1">
                <CreditCard className="h-4 w-4" />
                <span className="hidden sm:inline">Caja</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={mainTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {mainTab === "tables" && (
              <TablesGrid />
            )}

            {mainTab === "orders" && (
              <RestaurantOrders />
            )}

            {mainTab === "transactions" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-green-700 dark:text-green-400">INGRESOS TOTALES</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold text-green-700 dark:text-green-400">{formatCurrency(totals.income)}</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-red-700 dark:text-red-400">EGRESOS TOTALES</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold text-red-700 dark:text-red-400">{formatCurrency(totals.expenses)}</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-blue-700 dark:text-blue-400">BALANCE</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">{formatCurrency(totals.balance)}</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex flex-col-reverse sm:flex-row justify-between items-start sm:items-center gap-4 mt-6">
                  <Tabs defaultValue="todas" className="w-full">
                    <TabsList className="w-full sm:w-auto">
                      <TabsTrigger value="todas" className="flex-1">Todas</TabsTrigger>
                      <TabsTrigger value="ingresos" className="flex-1">Ingresos</TabsTrigger>
                      <TabsTrigger value="egresos" className="flex-1">Egresos</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <div className="flex w-full sm:w-auto gap-2">
                    <Button onClick={() => handleNewTransaction('income')} variant="default" size="sm" className="flex-1 sm:flex-auto">
                      <BadgePlus className="mr-2 h-4 w-4" />
                      Nuevo Ingreso
                    </Button>
                    <Button onClick={() => handleNewTransaction('expense')} variant="outline" size="sm" className="flex-1 sm:flex-auto">
                      <BadgeMinus className="mr-2 h-4 w-4" />
                      Nuevo Egreso
                    </Button>
                  </div>
                </div>
                
                <div className="flex w-full gap-2 mt-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Buscar transacciones..." className="pl-8" />
                  </div>
                  <Button variant="outline" size="icon">
                    <Calendar className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
                
                <Card className="mt-4">
                  <TabsContent value="todas" className="m-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Fecha</TableHead>
                          <TableHead>Descripción</TableHead>
                          <TableHead>Método</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead className="text-right">Monto</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {loading ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center h-24">Cargando transacciones...</TableCell>
                          </TableRow>
                        ) : transactions.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center h-24">No hay transacciones registradas</TableCell>
                          </TableRow>
                        ) : (
                          transactions.map((transaction) => (
                            <TableRow key={transaction.id}>
                              <TableCell>{formatDate(transaction.created_at)}</TableCell>
                              <TableCell>{transaction.description}</TableCell>
                              <TableCell className="capitalize">{transaction.payment_method}</TableCell>
                              <TableCell>
                                <Badge variant={transaction.transaction_type === 'income' ? 'default' : 'outline'} className={transaction.transaction_type === 'income' ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-red-100 text-red-800 hover:bg-red-200'}>
                                  {transaction.transaction_type === 'income' ? 'Ingreso' : 'Egreso'}
                                </Badge>
                              </TableCell>
                              <TableCell className={`text-right font-medium ${transaction.transaction_type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                                {transaction.transaction_type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </TabsContent>
                  
                  <TabsContent value="ingresos" className="m-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Fecha</TableHead>
                          <TableHead>Descripción</TableHead>
                          <TableHead>Método</TableHead>
                          <TableHead className="text-right">Monto</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {loading ? (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center h-24">Cargando transacciones...</TableCell>
                          </TableRow>
                        ) : transactions.filter(t => t.transaction_type === 'income').length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center h-24">No hay ingresos registrados</TableCell>
                          </TableRow>
                        ) : (
                          transactions
                            .filter(t => t.transaction_type === 'income')
                            .map((transaction) => (
                              <TableRow key={transaction.id}>
                                <TableCell>{formatDate(transaction.created_at)}</TableCell>
                                <TableCell>{transaction.description}</TableCell>
                                <TableCell className="capitalize">{transaction.payment_method}</TableCell>
                                <TableCell className="text-right font-medium text-green-600">
                                  +{formatCurrency(transaction.amount)}
                                </TableCell>
                              </TableRow>
                            ))
                        )}
                      </TableBody>
                    </Table>
                  </TabsContent>
                  
                  <TabsContent value="egresos" className="m-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Fecha</TableHead>
                          <TableHead>Descripción</TableHead>
                          <TableHead>Método</TableHead>
                          <TableHead className="text-right">Monto</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {loading ? (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center h-24">Cargando transacciones...</TableCell>
                          </TableRow>
                        ) : transactions.filter(t => t.transaction_type === 'expense').length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center h-24">No hay egresos registrados</TableCell>
                          </TableRow>
                        ) : (
                          transactions
                            .filter(t => t.transaction_type === 'expense')
                            .map((transaction) => (
                              <TableRow key={transaction.id}>
                                <TableCell>{formatDate(transaction.created_at)}</TableCell>
                                <TableCell>{transaction.description}</TableCell>
                                <TableCell className="capitalize">{transaction.payment_method}</TableCell>
                                <TableCell className="text-right font-medium text-red-600">
                                  -{formatCurrency(transaction.amount)}
                                </TableCell>
                              </TableRow>
                            ))
                        )}
                      </TableBody>
                    </Table>
                  </TabsContent>
                </Card>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
};

export default Cashier;
