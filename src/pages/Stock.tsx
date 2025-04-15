
import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  PlusCircle,
  Package,
  FileText,
  ArrowUpDown,
  AlertCircle,
  Truck,
  Upload,
  Download
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for the MVP
const stockItems = [
  {
    id: 1,
    name: "Carne para hamburguesa",
    category: "Carnes",
    quantity: 5,
    unit: "unidad",
    price: 4.50,
    provider: "Carnes Premium S.A.",
    status: "low",
    lastUpdated: "2025-04-14"
  },
  {
    id: 2,
    name: "Queso cheddar",
    category: "Lácteos",
    quantity: 200,
    unit: "gramo",
    price: 0.02,
    provider: "Lácteos del Valle",
    status: "medium",
    lastUpdated: "2025-04-15"
  },
  {
    id: 3,
    name: "Cerveza IPA",
    category: "Bebidas",
    quantity: 3,
    unit: "botella",
    price: 3.25,
    provider: "Distribuidora de Bebidas",
    status: "low",
    lastUpdated: "2025-04-14"
  },
  {
    id: 4,
    name: "Pan de hamburguesa",
    category: "Panadería",
    quantity: 8,
    unit: "unidad",
    price: 0.75,
    provider: "Panadería López",
    status: "medium",
    lastUpdated: "2025-04-15"
  },
  {
    id: 5,
    name: "Lechuga",
    category: "Vegetales",
    quantity: 2,
    unit: "kg",
    price: 2.20,
    provider: "Distribuidora de Frutas y Verduras",
    status: "low",
    lastUpdated: "2025-04-13"
  },
  {
    id: 6,
    name: "Tomate",
    category: "Vegetales",
    quantity: 4,
    unit: "kg",
    price: 1.80,
    provider: "Distribuidora de Frutas y Verduras",
    status: "ok",
    lastUpdated: "2025-04-15"
  },
  {
    id: 7,
    name: "Aceite de oliva",
    category: "Condimentos",
    quantity: 3,
    unit: "litro",
    price: 7.50,
    provider: "Importadora de Alimentos",
    status: "ok",
    lastUpdated: "2025-04-12"
  },
  {
    id: 8,
    name: "Vino tinto",
    category: "Bebidas",
    quantity: 12,
    unit: "botella",
    price: 8.75,
    provider: "Distribuidora de Bebidas",
    status: "ok",
    lastUpdated: "2025-04-10"
  },
  {
    id: 9,
    name: "Azúcar",
    category: "Básicos",
    quantity: 5,
    unit: "kg",
    price: 1.20,
    provider: "Distribuidora de Abarrotes",
    status: "ok",
    lastUpdated: "2025-04-11"
  },
  {
    id: 10,
    name: "Café en grano",
    category: "Básicos",
    quantity: 2,
    unit: "kg",
    price: 15.90,
    provider: "Importadora de Café",
    status: "medium",
    lastUpdated: "2025-04-13"
  }
];

// Let's define our providers for easier reference
const providers = [
  {
    id: 1,
    name: "Carnes Premium S.A.",
    contact: "Juan Martínez",
    phone: "+34 612 345 678",
    email: "contacto@carnespremium.com"
  },
  {
    id: 2,
    name: "Lácteos del Valle",
    contact: "Ana López",
    phone: "+34 623 456 789",
    email: "pedidos@lacteosdelvalle.com"
  },
  {
    id: 3,
    name: "Distribuidora de Bebidas",
    contact: "Pedro Sánchez",
    phone: "+34 634 567 890",
    email: "ventas@distribebidas.com"
  },
  {
    id: 4,
    name: "Panadería López",
    contact: "María López",
    phone: "+34 645 678 901",
    email: "pedidos@panaderialopez.com"
  },
  {
    id: 5,
    name: "Distribuidora de Frutas y Verduras",
    contact: "Carmen Rodríguez",
    phone: "+34 656 789 012",
    email: "ventas@distrifruver.com"
  },
  {
    id: 6, 
    name: "Importadora de Alimentos",
    contact: "Alberto García",
    phone: "+34 667 890 123",
    email: "info@importalimentos.com"
  },
  {
    id: 7,
    name: "Distribuidora de Abarrotes",
    contact: "Roberto Fernández",
    phone: "+34 678 901 234",
    email: "ventas@distabarrotes.com"
  },
  {
    id: 8,
    name: "Importadora de Café",
    contact: "Laura Sánchez",
    phone: "+34 689 012 345",
    email: "pedidos@importacafe.com"
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "low":
      return {
        label: "Bajo",
        color: "bg-red-100 text-red-800 hover:bg-red-200",
        icon: <AlertCircle className="h-3 w-3" />,
      };
    case "medium":
      return {
        label: "Medio",
        color: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
        icon: null,
      };
    case "ok":
      return {
        label: "OK",
        color: "bg-green-100 text-green-800 hover:bg-green-200",
        icon: null,
      };
    default:
      return {
        label: "Desconocido",
        color: "bg-gray-100 text-gray-800 hover:bg-gray-200",
        icon: null,
      };
  }
};

const Stock = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-3xl font-bold">Inventario</h1>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Nuevo producto
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Agregar nuevo producto</DialogTitle>
                  <DialogDescription>
                    Introduce los detalles del nuevo producto para el inventario.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="name" className="text-right">
                      Nombre
                    </label>
                    <Input
                      id="name"
                      placeholder="Nombre del producto"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="category" className="text-right">
                      Categoría
                    </label>
                    <Input
                      id="category"
                      placeholder="Categoría"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="quantity" className="text-right">
                      Cantidad
                    </label>
                    <Input
                      id="quantity"
                      type="number"
                      placeholder="0"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="unit" className="text-right">
                      Unidad
                    </label>
                    <Input
                      id="unit"
                      placeholder="kg, unidad, litro..."
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="price" className="text-right">
                      Precio
                    </label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="provider" className="text-right">
                      Proveedor
                    </label>
                    <Input
                      id="provider"
                      placeholder="Nombre del proveedor"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Guardar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Importar
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar productos..." className="pl-8" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="low">Bajo stock</TabsTrigger>
            <TabsTrigger value="medium">Medio</TabsTrigger>
            <TabsTrigger value="ok">OK</TabsTrigger>
          </TabsList>
          
          <div className="mt-4">
            <div className="rounded-lg border bg-white">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <div className="flex items-center gap-1 cursor-pointer">
                        Producto
                        <ArrowUpDown size={14} />
                      </div>
                    </TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead className="text-right">
                      <div className="flex items-center justify-end gap-1 cursor-pointer">
                        Cantidad
                        <ArrowUpDown size={14} />
                      </div>
                    </TableHead>
                    <TableHead className="text-right">
                      <div className="flex items-center justify-end gap-1 cursor-pointer">
                        Precio
                        <ArrowUpDown size={14} />
                      </div>
                    </TableHead>
                    <TableHead>Proveedor</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Actualizado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stockItems.map((item) => {
                    const statusBadge = getStatusBadge(item.status);
                    
                    return (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell className="text-right">
                          {item.quantity} {item.unit}
                        </TableCell>
                        <TableCell className="text-right">
                          ${item.price.toFixed(2)}
                        </TableCell>
                        <TableCell>{item.provider}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={cn(
                              "flex items-center gap-1 w-fit py-1", 
                              statusBadge.color
                            )}
                          >
                            {statusBadge.icon}
                            {statusBadge.label}
                          </Badge>
                        </TableCell>
                        <TableCell>{item.lastUpdated}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Package className="h-4 w-4" />
                Pedidos pendientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Producto</TableHead>
                    <TableHead>Proveedor</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Carne para hamburguesa</TableCell>
                    <TableCell>Carnes Premium S.A.</TableCell>
                    <TableCell>2025-04-16</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-100 text-blue-800">
                        <Truck className="h-3 w-3 mr-1" />
                        En camino
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Cerveza IPA</TableCell>
                    <TableCell>Distribuidora de Bebidas</TableCell>
                    <TableCell>2025-04-17</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                        Pendiente
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Lechuga</TableCell>
                    <TableCell>Distribuidora de Frutas y Verduras</TableCell>
                    <TableCell>2025-04-16</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-100 text-blue-800">
                        <Truck className="h-3 w-3 mr-1" />
                        En camino
                      </Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Proveedores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Proveedor</TableHead>
                    <TableHead>Contacto</TableHead>
                    <TableHead>Teléfono</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {providers.slice(0, 4).map((provider) => (
                    <TableRow key={provider.id}>
                      <TableCell className="font-medium">
                        {provider.name}
                      </TableCell>
                      <TableCell>{provider.contact}</TableCell>
                      <TableCell>{provider.phone}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button variant="ghost" className="w-full mt-2 text-sm">
                Ver todos los proveedores
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Stock;
