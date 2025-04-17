
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { Plus, Users, Clock, Utensils, Receipt, CreditCard, MoreHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

// Define table types
type TableOrder = {
  items: number;
  total: number;
};

type TableData = {
  id: number;
  name: string;
  status: string;
  capacity: number;
  time?: string;
  order?: TableOrder;
  customer?: string;
};

// Demo data
const DEMO_TABLES: TableData[] = [
  { id: 1, name: 'Mesa 1', status: 'occupied', capacity: 4, time: '19:30', order: { items: 4, total: 3450 } },
  { id: 2, name: 'Mesa 2', status: 'available', capacity: 2 },
  { id: 3, name: 'Mesa 3', status: 'reserved', capacity: 6, time: '20:00', customer: 'Martinez' },
  { id: 4, name: 'Mesa 4', status: 'occupied', capacity: 4, time: '18:45', order: { items: 2, total: 1850 } },
  { id: 5, name: 'Mesa 5', status: 'cleaning', capacity: 4 },
  { id: 6, name: 'Mesa 6', status: 'bill', capacity: 8, time: '19:20', order: { items: 10, total: 12350 } },
  { id: 7, name: 'Mesa 7', status: 'available', capacity: 4 },
  { id: 8, name: 'Mesa 8', status: 'available', capacity: 2 },
  { id: 9, name: 'Barra 1', status: 'occupied', capacity: 1, time: '19:40', order: { items: 1, total: 650 } },
  { id: 10, name: 'Barra 2', status: 'occupied', capacity: 1, time: '19:45', order: { items: 2, total: 1200 } },
  { id: 11, name: 'Barra 3', status: 'available', capacity: 1 },
  { id: 12, name: 'Barra 4', status: 'available', capacity: 1 }
];

// Table status configuration
const TABLE_STATUS = {
  available: { label: 'Disponible', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' },
  occupied: { label: 'Ocupada', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' },
  reserved: { label: 'Reservada', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' },
  cleaning: { label: 'Limpieza', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' },
  bill: { label: 'Pidió cuenta', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300' }
};

// Table actions based on status
const getTableActions = (status: string) => {
  const actions = [];
  
  if (status === 'available') {
    actions.push({ icon: <Users size={16} />, label: 'Ocupar mesa', action: 'occupy' });
    actions.push({ icon: <Clock size={16} />, label: 'Reservar', action: 'reserve' });
  } 
  else if (status === 'occupied') {
    actions.push({ icon: <Utensils size={16} />, label: 'Ver/Editar pedido', action: 'order' });
    actions.push({ icon: <Receipt size={16} />, label: 'Pedir cuenta', action: 'bill' });
  } 
  else if (status === 'reserved') {
    actions.push({ icon: <Users size={16} />, label: 'Ocupar mesa', action: 'occupy' });
    actions.push({ icon: <Clock size={16} />, label: 'Cancelar reserva', action: 'cancel' });
  } 
  else if (status === 'bill') {
    actions.push({ icon: <CreditCard size={16} />, label: 'Cobrar', action: 'pay' });
    actions.push({ icon: <Users size={16} />, label: 'Liberar mesa', action: 'free' });
  } 
  else if (status === 'cleaning') {
    actions.push({ icon: <Users size={16} />, label: 'Marcar disponible', action: 'available' });
  }
  
  return actions;
};

interface TableItemProps {
  table: TableData;
  onTableAction: (table: TableData, action: string) => void;
}

const TableItem: React.FC<TableItemProps> = ({ table, onTableAction }) => {
  const status = TABLE_STATUS[table.status as keyof typeof TABLE_STATUS] || TABLE_STATUS.available;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full overflow-hidden hover:shadow-md transition-shadow duration-300">
        <CardHeader className="p-3 pb-0 flex flex-row items-start justify-between">
          <CardTitle className="text-base">{table.name}</CardTitle>
          <Badge className={status.color}>{status.label}</Badge>
        </CardHeader>
        <CardContent className="p-3 pt-2">
          <div className="text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users size={14} />
              <span>{table.capacity} personas</span>
            </div>
            {table.time && (
              <div className="flex items-center gap-1 mt-1">
                <Clock size={14} />
                <span>Desde {table.time}</span>
              </div>
            )}
            {table.customer && (
              <div className="flex items-center gap-1 mt-1">
                <span>Reserva: {table.customer}</span>
              </div>
            )}
            {table.order && (
              <div className="mt-1">
                <Badge variant="outline" className="text-xs mt-1">
                  {table.order.items} productos
                </Badge>
                <div className="font-semibold mt-1">
                  ${table.order.total.toLocaleString('es-AR')}
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-3 pt-0 flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {getTableActions(table.status).map((action, index) => (
                <DropdownMenuItem 
                  key={index} 
                  onClick={() => onTableAction(table, action.action)}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  {action.icon}
                  {action.label}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2 text-muted-foreground">
                <Plus size={16} />
                Cambiar mesa
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export const TablesGrid: React.FC = () => {
  const [tables, setTables] = useState<TableData[]>(DEMO_TABLES);
  const [selectedTable, setSelectedTable] = useState<TableData | null>(null);
  const [isNewOrderSheetOpen, setIsNewOrderSheetOpen] = useState(false);
  const [view, setView] = useState<'all' | 'available' | 'occupied' | 'reserved'>('all');
  
  const handleTableAction = (table: TableData, action: string) => {
    setSelectedTable(table);
    
    // Demo implementation of table actions
    if (action === 'occupy') {
      const updatedTables = tables.map(t => 
        t.id === table.id ? { ...t, status: 'occupied', time: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }) } : t
      );
      setTables(updatedTables);
      toast({ title: `${table.name} ocupada` });
    } 
    else if (action === 'reserve') {
      // Open a dialog for reservation details
      toast({ title: `Reserva creada para ${table.name}` });
    } 
    else if (action === 'order') {
      setIsNewOrderSheetOpen(true);
    } 
    else if (action === 'bill') {
      const updatedTables = tables.map(t => 
        t.id === table.id ? { ...t, status: 'bill' } : t
      );
      setTables(updatedTables);
      toast({ title: `Cuenta solicitada para ${table.name}` });
    } 
    else if (action === 'pay') {
      const updatedTables = tables.map(t => 
        t.id === table.id ? { ...t, status: 'cleaning', time: undefined, order: undefined } : t
      );
      setTables(updatedTables);
      toast({ title: `${table.name} pagada y pendiente de limpieza` });
    } 
    else if (action === 'free' || action === 'available') {
      const updatedTables = tables.map(t => 
        t.id === table.id ? { ...t, status: 'available', time: undefined, order: undefined, customer: undefined } : t
      );
      setTables(updatedTables);
      toast({ title: `${table.name} disponible` });
    } 
    else if (action === 'cancel') {
      const updatedTables = tables.map(t => 
        t.id === table.id ? { ...t, status: 'available', time: undefined, customer: undefined } : t
      );
      setTables(updatedTables);
      toast({ title: `Reserva cancelada para ${table.name}` });
    }
  };
  
  const filteredTables = view === 'all' ? tables : tables.filter(table => table.status === view);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <Tabs value={view} onValueChange={(v) => setView(v as any)} className="w-full sm:w-auto">
          <TabsList className="grid grid-cols-4 w-full sm:w-auto">
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="available">Disponibles</TabsTrigger>
            <TabsTrigger value="occupied">Ocupadas</TabsTrigger>
            <TabsTrigger value="reserved">Reservadas</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Nueva mesa
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar nueva mesa</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" placeholder="Mesa 10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacidad</Label>
                <Select defaultValue="4">
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar capacidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 persona</SelectItem>
                    <SelectItem value="2">2 personas</SelectItem>
                    <SelectItem value="4">4 personas</SelectItem>
                    <SelectItem value="6">6 personas</SelectItem>
                    <SelectItem value="8">8 personas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="zone">Zona</Label>
                <Select defaultValue="inside">
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar zona" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inside">Interior</SelectItem>
                    <SelectItem value="outside">Exterior</SelectItem>
                    <SelectItem value="bar">Barra</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button>Guardar mesa</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <AnimatePresence>
          {filteredTables.map(table => (
            <TableItem 
              key={table.id} 
              table={table} 
              onTableAction={handleTableAction} 
            />
          ))}
        </AnimatePresence>
      </div>
      
      <Sheet open={isNewOrderSheetOpen} onOpenChange={setIsNewOrderSheetOpen}>
        <SheetContent side="right" className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Pedido {selectedTable?.name}</SheetTitle>
          </SheetHeader>
          <div className="py-6">
            <Tabs defaultValue="items">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="items">Productos</TabsTrigger>
                <TabsTrigger value="details">Detalles</TabsTrigger>
              </TabsList>
              
              <TabsContent value="items" className="mt-4 space-y-4">
                <Input placeholder="Buscar producto..." />
                
                <div className="space-y-2">
                  {["Entradas", "Platos principales", "Bebidas", "Postres"].map((category) => (
                    <div key={category} className="space-y-2">
                      <h3 className="font-medium text-sm text-muted-foreground">{category}</h3>
                      <div className="space-y-2">
                        {[1, 2, 3].map((i) => (
                          <Card key={i}>
                            <CardContent className="p-3 flex items-center justify-between">
                              <div>
                                <div className="font-medium">Producto {i}</div>
                                <div className="text-sm text-muted-foreground">${(i * 750).toLocaleString('es-AR')}</div>
                              </div>
                              <Button size="sm" variant="outline">Agregar</Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="details" className="mt-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>1x Milanesa napolitana</span>
                        <span>$2,650</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>1x Hamburguesa completa</span>
                        <span>$2,400</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>2x Coca-Cola</span>
                        <span>$1,600</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>1x Flan con dulce</span>
                        <span>$800</span>
                      </div>
                    </div>
                    <div className="border-t mt-4 pt-4 flex justify-between font-medium">
                      <span>Total</span>
                      <span>$7,450</span>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="mt-6 space-y-2">
                  <Button className="w-full">Guardar pedido</Button>
                  <Button variant="outline" className="w-full">Imprimir comanda</Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
