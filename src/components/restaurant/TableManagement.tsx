
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2, MoveRight, Eye } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Demo table zones
const DEMO_ZONES = [
  { id: 1, name: "Interior", tables: 8 },
  { id: 2, name: "Exterior", tables: 4 },
  { id: 3, name: "Barra", tables: 4 },
  { id: 4, name: "VIP", tables: 2 }
];

// Demo tables
const DEMO_TABLES = [
  { id: 1, name: "Mesa 1", zone: "Interior", capacity: 4 },
  { id: 2, name: "Mesa 2", zone: "Interior", capacity: 2 },
  { id: 3, name: "Mesa 3", zone: "Interior", capacity: 6 },
  { id: 4, name: "Mesa 4", zone: "Interior", capacity: 4 },
  { id: 5, name: "Mesa 5", zone: "Interior", capacity: 4 },
  { id: 6, name: "Mesa 6", zone: "Interior", capacity: 8 },
  { id: 7, name: "Mesa 7", zone: "Interior", capacity: 4 },
  { id: 8, name: "Mesa 8", zone: "Interior", capacity: 2 },
  { id: 9, name: "Mesa 9", zone: "Exterior", capacity: 4 },
  { id: 10, name: "Mesa 10", zone: "Exterior", capacity: 4 },
  { id: 11, name: "Mesa 11", zone: "Exterior", capacity: 6 },
  { id: 12, name: "Mesa 12", zone: "Exterior", capacity: 2 },
  { id: 13, name: "Barra 1", zone: "Barra", capacity: 1 },
  { id: 14, name: "Barra 2", zone: "Barra", capacity: 1 },
  { id: 15, name: "Barra 3", zone: "Barra", capacity: 1 },
  { id: 16, name: "Barra 4", zone: "Barra", capacity: 1 },
  { id: 17, name: "VIP 1", zone: "VIP", capacity: 8 },
  { id: 18, name: "VIP 2", zone: "VIP", capacity: 10 }
];

export const TableManagement: React.FC = () => {
  const [zones, setZones] = useState(DEMO_ZONES);
  const [tables, setTables] = useState(DEMO_TABLES);
  const [selectedTab, setSelectedTab] = useState("tables");
  const [editingTable, setEditingTable] = useState<any>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [newTableData, setNewTableData] = useState({
    name: "",
    zone: "Interior",
    capacity: "4"
  });

  const handleAddTable = () => {
    if (!newTableData.name) {
      toast({
        title: "Error",
        description: "Debes ingresar un nombre para la mesa",
        variant: "destructive"
      });
      return;
    }

    const newTable = {
      id: tables.length + 1,
      name: newTableData.name,
      zone: newTableData.zone,
      capacity: parseInt(newTableData.capacity)
    };

    setTables([...tables, newTable]);
    setNewTableData({ name: "", zone: "Interior", capacity: "4" });
    toast({
      title: "Mesa creada",
      description: `${newTable.name} ha sido creada exitosamente`
    });
  };

  const handleEditTable = () => {
    if (!editingTable) return;

    const updatedTables = tables.map(table =>
      table.id === editingTable.id ? editingTable : table
    );

    setTables(updatedTables);
    setEditingTable(null);
    setEditDialogOpen(false);
    toast({
      title: "Mesa actualizada",
      description: `${editingTable.name} ha sido actualizada exitosamente`
    });
  };

  const handleDeleteTable = (tableId: number) => {
    const updatedTables = tables.filter(table => table.id !== tableId);
    setTables(updatedTables);
    toast({
      title: "Mesa eliminada",
      description: "La mesa ha sido eliminada exitosamente"
    });
  };

  return (
    <div className="space-y-6">
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="tables">Mesas</TabsTrigger>
          <TabsTrigger value="zones">Zonas</TabsTrigger>
        </TabsList>

        <TabsContent value="tables" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex justify-between items-center">
                <span>Mesas configuradas</span>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="flex items-center gap-1">
                      <Plus className="h-4 w-4" />
                      <span>Nueva mesa</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Crear nueva mesa</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="table-name">Nombre</Label>
                        <Input 
                          id="table-name" 
                          placeholder="Mesa 13"
                          value={newTableData.name}
                          onChange={(e) => setNewTableData({ ...newTableData, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="table-zone">Zona</Label>
                        <Select 
                          value={newTableData.zone}
                          onValueChange={(value) => setNewTableData({ ...newTableData, zone: value })}
                        >
                          <SelectTrigger id="table-zone">
                            <SelectValue placeholder="Seleccionar zona" />
                          </SelectTrigger>
                          <SelectContent>
                            {zones.map(zone => (
                              <SelectItem key={zone.id} value={zone.name}>
                                {zone.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="table-capacity">Capacidad</Label>
                        <Select 
                          value={newTableData.capacity}
                          onValueChange={(value) => setNewTableData({ ...newTableData, capacity: value })}
                        >
                          <SelectTrigger id="table-capacity">
                            <SelectValue placeholder="Seleccionar capacidad" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 persona</SelectItem>
                            <SelectItem value="2">2 personas</SelectItem>
                            <SelectItem value="4">4 personas</SelectItem>
                            <SelectItem value="6">6 personas</SelectItem>
                            <SelectItem value="8">8 personas</SelectItem>
                            <SelectItem value="10">10 personas</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleAddTable}>Crear mesa</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Zona</TableHead>
                    <TableHead>Capacidad</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tables.map(table => (
                    <TableRow key={table.id}>
                      <TableCell className="font-medium">{table.name}</TableCell>
                      <TableCell>{table.zone}</TableCell>
                      <TableCell>{table.capacity} personas</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => {
                              setEditingTable(table);
                              setEditDialogOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteTable(table.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="zones" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex justify-between items-center">
                <span>Zonas configuradas</span>
                <Button size="sm" className="flex items-center gap-1">
                  <Plus className="h-4 w-4" />
                  <span>Nueva zona</span>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Mesas</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {zones.map(zone => (
                    <TableRow key={zone.id}>
                      <TableCell className="font-medium">{zone.name}</TableCell>
                      <TableCell>{zone.tables}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Table Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar mesa</DialogTitle>
          </DialogHeader>
          {editingTable && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-table-name">Nombre</Label>
                <Input 
                  id="edit-table-name" 
                  value={editingTable.name}
                  onChange={(e) => setEditingTable({ ...editingTable, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-table-zone">Zona</Label>
                <Select 
                  value={editingTable.zone}
                  onValueChange={(value) => setEditingTable({ ...editingTable, zone: value })}
                >
                  <SelectTrigger id="edit-table-zone">
                    <SelectValue placeholder="Seleccionar zona" />
                  </SelectTrigger>
                  <SelectContent>
                    {zones.map(zone => (
                      <SelectItem key={zone.id} value={zone.name}>
                        {zone.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-table-capacity">Capacidad</Label>
                <Select 
                  value={editingTable.capacity.toString()}
                  onValueChange={(value) => setEditingTable({ ...editingTable, capacity: parseInt(value) })}
                >
                  <SelectTrigger id="edit-table-capacity">
                    <SelectValue placeholder="Seleccionar capacidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 persona</SelectItem>
                    <SelectItem value="2">2 personas</SelectItem>
                    <SelectItem value="4">4 personas</SelectItem>
                    <SelectItem value="6">6 personas</SelectItem>
                    <SelectItem value="8">8 personas</SelectItem>
                    <SelectItem value="10">10 personas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleEditTable}>Guardar cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
