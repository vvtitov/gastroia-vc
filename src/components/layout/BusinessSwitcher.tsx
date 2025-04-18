import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building, Package } from "lucide-react";
import { useUserType } from "@/contexts/UserTypeContext";

export const BusinessSwitcher: React.FC = () => {
  const { userType, setUserType } = useUserType();

  const handleChange = (value: string) => {
    setUserType(value as 'business' | 'provider');
  };

  return (
    <div className="flex items-center">
      <Select value={userType} onValueChange={handleChange}>
        <SelectTrigger className="w-[180px] h-9 border-none bg-transparent hover:bg-gray-100 focus:ring-0 focus:ring-offset-0">
          <div className="flex items-center gap-2">
            {userType === 'business' ? (
              <Building className="h-4 w-4 text-gastro" />
            ) : (
              <Package className="h-4 w-4 text-gastro" />
            )}
            <SelectValue placeholder="Seleccionar vista" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="business">
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-gastro" />
              <span>Negocio</span>
            </div>
          </SelectItem>
          <SelectItem value="provider">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-gastro" />
              <span>Proveedor</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
