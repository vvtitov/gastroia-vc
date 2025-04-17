
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TableItem } from "./TableListView";
import { ZoneItem } from "./ZoneListView";

interface TableDialogsProps {
  zones: ZoneItem[];
  newTableData: {
    name: string;
    zone: string;
    capacity: string;
  };
  setNewTableData: React.Dispatch<React.SetStateAction<{
    name: string;
    zone: string;
    capacity: string;
  }>>;
  editingTable: TableItem | null;
  setEditingTable: React.Dispatch<React.SetStateAction<TableItem | null>>;
  editDialogOpen: boolean;
  setEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addDialogOpen: boolean;
  setAddDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onAddTable: () => void;
  onEditTable: () => void;
}

export const TableDialogs: React.FC<TableDialogsProps> = ({
  zones,
  newTableData,
  setNewTableData,
  editingTable,
  setEditingTable,
  editDialogOpen,
  setEditDialogOpen,
  addDialogOpen,
  setAddDialogOpen,
  onAddTable,
  onEditTable
}) => {
  return (
    <>
      {/* Add Table Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
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
                onChange={(e) =>
                  setNewTableData({ ...newTableData, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="table-zone">Zona</Label>
              <Select
                value={newTableData.zone}
                onValueChange={(value) =>
                  setNewTableData({ ...newTableData, zone: value })
                }
              >
                <SelectTrigger id="table-zone">
                  <SelectValue placeholder="Seleccionar zona" />
                </SelectTrigger>
                <SelectContent>
                  {zones.map((zone) => (
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
                onValueChange={(value) =>
                  setNewTableData({ ...newTableData, capacity: value })
                }
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
            <Button onClick={onAddTable}>Crear mesa</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
                  onChange={(e) =>
                    setEditingTable({ ...editingTable, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-table-zone">Zona</Label>
                <Select
                  value={editingTable.zone}
                  onValueChange={(value) =>
                    setEditingTable({ ...editingTable, zone: value })
                  }
                >
                  <SelectTrigger id="edit-table-zone">
                    <SelectValue placeholder="Seleccionar zona" />
                  </SelectTrigger>
                  <SelectContent>
                    {zones.map((zone) => (
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
                  onValueChange={(value) =>
                    setEditingTable({ ...editingTable, capacity: parseInt(value) })
                  }
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
            <Button onClick={onEditTable}>Guardar cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
