
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Eye, Plus, Trash2 } from "lucide-react";

interface TableListProps {
  tables: TableItem[];
  onAddTable: () => void;
  onEditTable: (table: TableItem) => void;
  onDeleteTable: (tableId: number) => void;
}

export interface TableItem {
  id: number;
  name: string;
  zone: string;
  capacity: number;
}

export const TableListView: React.FC<TableListProps> = ({ 
  tables, 
  onAddTable,
  onEditTable,
  onDeleteTable 
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex justify-between items-center">
          <span>Mesas configuradas</span>
          <Button
            size="sm"
            className="flex items-center gap-1"
            onClick={onAddTable}
          >
            <Plus className="h-4 w-4" />
            <span>Nueva mesa</span>
          </Button>
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
            {tables.map((table) => (
              <TableRow key={table.id}>
                <TableCell className="font-medium">{table.name}</TableCell>
                <TableCell>{table.zone}</TableCell>
                <TableCell>{table.capacity} personas</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEditTable(table)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDeleteTable(table.id)}
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
  );
};
