
import React from "react";
import { AlertCircle, ExternalLink, ToggleLeft, ToggleRight } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface DemoBannerProps {
  demoType: 'business' | 'provider';
  onToggleView?: () => void;
}

export const DemoBanner: React.FC<DemoBannerProps> = ({ demoType, onToggleView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Alert className="bg-primary/10 border-primary/30">
        <AlertCircle className="h-5 w-5 text-primary" />
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full">
          <div>
            <AlertTitle className="mb-2">Modo demostración</AlertTitle>
            <AlertDescription>
              Estás viendo una versión de demostración de {demoType === 'business' ? 'Restaurante' : 'Proveedor'}.
              {onToggleView && (
                <span className="ml-2">
                  Cambia a vista de {demoType === 'business' ? 'Proveedor' : 'Restaurante'}:
                </span>
              )}
            </AlertDescription>
          </div>
          <div className="mt-3 sm:mt-0 flex space-x-2">
            {onToggleView && (
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-2 hover:bg-muted/70 transition-all duration-300" 
                onClick={onToggleView}
              >
                {demoType === 'business' ? (
                  <>
                    <ToggleLeft className="h-4 w-4" />
                    <span>Ver Proveedor</span>
                  </>
                ) : (
                  <>
                    <ToggleRight className="h-4 w-4" />
                    <span>Ver Restaurante</span>
                  </>
                )}
              </Button>
            )}
            <Link to="/auth/register">
              <Button size="sm" className="flex items-center gap-2">
                <span>Registrarse</span>
                <ExternalLink className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </Alert>
    </motion.div>
  );
};
