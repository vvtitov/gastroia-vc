
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { TableListView, TableItem } from "./table-management/TableListView";
import { ZoneListView, ZoneItem } from "./table-management/ZoneListView";
import { TableDialogs } from "./table-management/TableDialogs";
import { motion } from "framer-motion";

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
  const [zones, setZones] = useState<ZoneItem[]>(DEMO_ZONES);
  const [tables, setTables] = useState<TableItem[]>(DEMO_TABLES);
  const [selectedTab, setSelectedTab] = useState("tables");
  const [editingTable, setEditingTable] = useState<TableItem | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newTableData, setNewTableData] = useState({
    name: "",
    zone: "Interior",
    capacity: "4"
  });

  const handleOpenAddDialog = () => {
    setAddDialogOpen(true);
  };

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
    setAddDialogOpen(false);
    toast({
      title: "Mesa creada",
      description: `${newTable.name} ha sido creada exitosamente`
    });
  };

  const handleOpenEditDialog = (table: TableItem) => {
    setEditingTable(table);
    setEditDialogOpen(true);
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

  const handleAddZone = () => {
    // Logic to add a new zone would go here
    toast({
      title: "Función en desarrollo",
      description: "La creación de nuevas zonas estará disponible próximamente"
    });
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div 
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="tables">Mesas</TabsTrigger>
          <TabsTrigger value="zones">Zonas</TabsTrigger>
        </TabsList>

        <TabsContent value="tables" className="space-y-4 mt-4">
          <TableListView 
            tables={tables} 
            onAddTable={handleOpenAddDialog}
            onEditTable={handleOpenEditDialog}
            onDeleteTable={handleDeleteTable}
          />
        </TabsContent>

        <TabsContent value="zones" className="space-y-4 mt-4">
          <ZoneListView zones={zones} onAddZone={handleAddZone} />
        </TabsContent>
      </Tabs>

      <TableDialogs
        zones={zones}
        newTableData={newTableData}
        setNewTableData={setNewTableData}
        editingTable={editingTable}
        setEditingTable={setEditingTable}
        editDialogOpen={editDialogOpen}
        setEditDialogOpen={setEditDialogOpen}
        addDialogOpen={addDialogOpen}
        setAddDialogOpen={setAddDialogOpen}
        onAddTable={handleAddTable}
        onEditTable={handleEditTable}
      />
    </motion.div>
  );
};
