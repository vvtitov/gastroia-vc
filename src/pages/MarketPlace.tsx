
import React, { useState, useEffect } from 'react';
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { 
  Search, 
  ShoppingCart, 
  ChevronDown, 
  Plus, 
  Minus, 
  MapPin, 
  Star,
  Filter
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock_quantity: number;
  unit: string;
  provider: {
    id: string;
    name: string;
    business_name: string | null;
  };
  quantity?: number;
}

const MarketPlace = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<string>("price_asc");
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select(`
            id,
            name,
            description,
            price,
            stock_quantity,
            unit,
            provider:profiles(id, name, business_name)
          `)
          .gt('stock_quantity', 0)
          .eq('active', true);
          
        if (error) throw error;
        
        setProducts(data || []);
        setFilteredProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast({
          title: "Error",
          description: "No se pudieron cargar los productos",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, [toast]);
  
  // Filter and sort products
  useEffect(() => {
    let result = [...products];
    
    // Apply search filter
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(lowerSearchTerm) ||
        (product.description && product.description.toLowerCase().includes(lowerSearchTerm)) ||
        (product.provider.business_name && product.provider.business_name.toLowerCase().includes(lowerSearchTerm))
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case "price_asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name_asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name_desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    
    setFilteredProducts(result);
  }, [products, searchTerm, sortBy]);
  
  const handleAddToCart = (product: Product) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      
      if (existingProduct) {
        // Increment quantity if already in cart
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        // Add new product to cart
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    
    toast({
      title: "Producto agregado",
      description: `${product.name} agregado al carrito`,
    });
  };
  
  const updateCartItemQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCart(prevCart => prevCart.filter(item => item.id !== productId));
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };
  
  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  };
  
  const handleCheckout = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "Debes iniciar sesión para realizar un pedido",
        variant: "destructive",
      });
      return;
    }
    
    if (cart.length === 0) {
      toast({
        title: "Carrito vacío",
        description: "Agrega productos al carrito para realizar un pedido",
        variant: "destructive",
      });
      return;
    }
    
    // Group cart items by provider
    const itemsByProvider = cart.reduce((acc, item) => {
      const providerId = item.provider.id;
      
      if (!acc[providerId]) {
        acc[providerId] = {
          providerId,
          providerName: item.provider.business_name || item.provider.name,
          items: [],
          total: 0
        };
      }
      
      acc[providerId].items.push(item);
      acc[providerId].total += item.price * (item.quantity || 1);
      
      return acc;
    }, {} as Record<string, { providerId: string, providerName: string, items: Product[], total: number }>);
    
    // Create an order for each provider
    try {
      for (const providerId in itemsByProvider) {
        const { providerId: provider_id, items, total } = itemsByProvider[providerId];
        
        // Create order
        const { data: orderData, error: orderError } = await supabase
          .from('orders')
          .insert({
            business_id: user.id,
            provider_id: provider_id,
            total_amount: total
          })
          .select('id')
          .single();
          
        if (orderError) throw orderError;
        
        if (!orderData) {
          throw new Error('No se pudo crear el pedido');
        }
        
        // Create order items
        const orderItems = items.map(item => ({
          order_id: orderData.id,
          product_id: item.id,
          quantity: item.quantity || 1,
          unit_price: item.price,
          subtotal: item.price * (item.quantity || 1)
        }));
        
        const { error: itemsError } = await supabase
          .from('order_items')
          .insert(orderItems);
          
        if (itemsError) throw itemsError;
        
        // Send initial message to provider
        await supabase
          .from('messages')
          .insert({
            sender_id: user.id,
            receiver_id: provider_id,
            order_id: orderData.id,
            content: `¡Hola! He realizado un nuevo pedido (#${orderData.id.substring(0, 8)}). Por favor, confirma disponibilidad y tiempo de entrega. ¡Gracias!`
          });
      }
      
      // Clear cart
      setCart([]);
      
      toast({
        title: "¡Pedido realizado!",
        description: "Tu pedido ha sido enviado a los proveedores",
      });
    } catch (error) {
      console.error('Error creating order:', error);
      toast({
        title: "Error",
        description: "No se pudo procesar el pedido",
        variant: "destructive",
      });
    }
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Marketplace</h1>
            <p className="text-muted-foreground">
              Encuentra productos de los mejores proveedores
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar productos..." 
                className="pl-10 w-[200px] md:w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select
              value={sortBy}
              onValueChange={setSortBy}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price_asc">Precio: menor a mayor</SelectItem>
                <SelectItem value="price_desc">Precio: mayor a menor</SelectItem>
                <SelectItem value="name_asc">Nombre: A-Z</SelectItem>
                <SelectItem value="name_desc">Nombre: Z-A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Products */}
          <div className="lg:col-span-2">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gastro"></div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No se encontraron productos</h3>
                <p className="text-muted-foreground mt-2">Intenta con otros términos de búsqueda</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredProducts.map(product => (
                  <Card key={product.id} className="overflow-hidden">
                    <CardHeader className="p-4 bg-muted/20">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium">{product.name}</h3>
                          <p className="text-sm text-muted-foreground truncate">
                            {product.description || "Sin descripción"}
                          </p>
                        </div>
                        <div>
                          <Badge variant="outline" className="bg-green-100 border-green-200 text-green-800">
                            Stock: {product.stock_quantity}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="p-1 rounded-full bg-muted">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <span className="text-sm">{product.provider.business_name || product.provider.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className="h-3 w-3" 
                              fill={star <= 4 ? "currentColor" : "none"} 
                            />
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 bg-muted/10 border-t flex justify-between items-center">
                      <div className="font-semibold">
                        ${product.price.toFixed(2)} / {product.unit}
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Agregar
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
          
          {/* Shopping Cart */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader className="border-b">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Carrito de Compras</h3>
                  <Badge variant="secondary" className="font-normal">
                    {cart.length} {cart.length === 1 ? 'producto' : 'productos'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0 max-h-[400px] overflow-y-auto">
                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">Tu carrito está vacío</p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {cart.map(item => (
                      <div key={item.id} className="p-4">
                        <div className="flex justify-between gap-2">
                          <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {item.provider.business_name || item.provider.name}
                            </p>
                            <p className="text-sm">${item.price.toFixed(2)} / {item.unit}</p>
                          </div>
                          <div className="flex flex-col items-end">
                            <div className="flex items-center border rounded-md">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateCartItemQuantity(item.id, (item.quantity || 1) - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center">{item.quantity || 1}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateCartItemQuantity(item.id, (item.quantity || 1) + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <p className="text-sm font-medium mt-2">
                              ${((item.price * (item.quantity || 1)).toFixed(2))}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="flex flex-col p-4 border-t gap-4">
                <div className="w-full">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-medium mt-2">
                    <span>Total</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full"
                  disabled={cart.length === 0}
                  onClick={handleCheckout}
                >
                  Realizar Pedido
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MarketPlace;
