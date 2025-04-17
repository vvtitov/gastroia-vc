
import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  ChefHat, 
  MessageCircle, 
  Bell, 
  Check, 
  AlertTriangle, 
  MoreHorizontal,
  Users
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InternalChat } from "@/components/staff/InternalChat";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";

// Demo orders data
const KITCHEN_ORDERS = [
  {
    id: "ORD-1234",
    table: "Mesa 5",
    items: [
      { id: 1, name: "Milanesa napolitana", quantity: 2, notes: "Sin cebolla", status: "pending" },
      { id: 2, name: "Papas fritas", quantity: 2, status: "cooking" }
    ],
    timestamp: "12:30",
    priority: "normal"
  },
  {
    id: "ORD-1235",
    table: "Mesa 1",
    items: [
      { id: 3, name: "Ensalada César", quantity: 1, status: "ready" },
      { id: 4, name: "Pasta bolognesa", quantity: 1, notes: "Extra queso", status: "cooking" }
    ],
    timestamp: "12:15",
    priority: "high"
  },
  {
    id: "ORD-1236",
    table: "Barra 2",
    items: [
      { id: 5, name: "Hamburguesa completa", quantity: 1, status: "pending" },
      { id: 6, name: "Papas fritas", quantity: 1, status: "pending" }
    ],
    timestamp: "12:25",
    priority: "normal"
  }
];

// Demo staff
const KITCHEN_STAFF = [
  { id: 1, name: "Carlos López", role: "Chef principal", status: "active", avatar: "/placeholder.svg" },
  { id: 2, name: "Elena Rodríguez", role: "Chef de línea", status: "active", avatar: "/placeholder.svg" },
  { id: 3, name: "José Martínez", role: "Ayudante de cocina", status: "break", avatar: "/placeholder.svg" }
];

const Kitchen = () => {
  const [orders, setOrders] = useState(KITCHEN_ORDERS);
  const [activeTab, setActiveTab] = useState("orders");
  const [staff, setStaff] = useState(KITCHEN_STAFF);

  const updateOrderItemStatus = (orderId, itemId, newStatus) => {
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          items: order.items.map(item => {
            if (item.id === itemId) {
              return { ...item, status: newStatus };
            }
            return item;
          })
        };
      }
      return order;
    }));
  };

  const getOrderStatus = (items) => {
    if (items.every(item => item.status === "ready")) return "ready";
    if (items.some(item => item.status === "cooking")) return "cooking";
    return "pending";
  };

  const renderItemStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Pendiente</Badge>;
      case "cooking":
        return <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-200">Preparando</Badge>;
      case "ready":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Listo</Badge>;
      default:
        return null;
    }
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
            <h1 className="text-3xl font-bold">Cocina</h1>
            <p className="text-muted-foreground">Gestiona los pedidos y la comunicación con el personal</p>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
            <TabsList className="grid w-full grid-cols-2 h-10">
              <TabsTrigger value="orders" className="flex items-center gap-1">
                <ChefHat className="h-4 w-4" />
                <span className="hidden sm:inline">Pedidos</span>
              </TabsTrigger>
              <TabsTrigger value="chat" className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Chat</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "orders" ? (
              <>
                <div className="flex flex-wrap gap-3 mb-6">
                  {staff.map((member) => (
                    <Card key={member.id} className="flex items-center p-3 gap-3">
                      <Avatar>
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                      <Badge variant={member.status === "active" ? "default" : "outline"} className="ml-2">
                        {member.status === "active" ? "Activo" : "Descanso"}
                      </Badge>
                    </Card>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {orders.map((order) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className={order.priority === "high" ? "border-red-300 shadow-red-100" : ""}>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                          <CardTitle className="text-lg flex items-center">
                            {order.table}
                            {order.priority === "high" && (
                              <AlertTriangle className="ml-2 h-4 w-4 text-red-500" />
                            )}
                          </CardTitle>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100">
                              {order.id}
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {order.timestamp}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium">{item.quantity}x {item.name}</p>
                                  {item.notes && (
                                    <p className="text-sm text-muted-foreground">{item.notes}</p>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  {renderItemStatusBadge(item.status)}
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      {item.status === "pending" && (
                                        <DropdownMenuItem onClick={() => updateOrderItemStatus(order.id, item.id, "cooking")}>
                                          Empezar preparación
                                        </DropdownMenuItem>
                                      )}
                                      {item.status === "cooking" && (
                                        <DropdownMenuItem onClick={() => updateOrderItemStatus(order.id, item.id, "ready")}>
                                          Marcar como listo
                                        </DropdownMenuItem>
                                      )}
                                      <DropdownMenuItem>
                                        Agregar nota
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between pt-0">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-muted-foreground gap-1">
                                <MessageCircle className="h-4 w-4" />
                                <span>Mensaje</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Enviar mensaje sobre {order.id}</DialogTitle>
                              </DialogHeader>
                              <div className="flex gap-2 mt-4">
                                <Button variant="outline" className="flex-1">A Mesero</Button>
                                <Button variant="outline" className="flex-1">A Caja</Button>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Button 
                            variant="default" 
                            size="sm"
                            disabled={!order.items.every(item => item.status === "ready")}
                          >
                            <Bell className="mr-2 h-4 w-4" />
                            <span>Notificar</span>
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                <Card className="overflow-hidden border shadow-sm">
                  <CardHeader className="p-4 border-b bg-muted/30">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      Comunicación interna
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <InternalChat />
                  </CardContent>
                </Card>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
};

export default Kitchen;
