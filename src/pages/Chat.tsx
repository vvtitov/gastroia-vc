
import React, { useState, useRef, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Settings, Wand2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

type ChatMessage = {
  id: number;
  content: string;
  sender: 'user' | 'bot';
  timestamp: string;
};

const PRESET_MESSAGES = [
  "¿Cuáles son los platos más vendidos?",
  "¿Qué acciones puedo tomar para aumentar mis ventas?",
  "¿Cómo puedo mejorar la eficiencia de mi restaurante?",
  "Necesito recomendaciones para promociones"
];

const Chat = () => {
  const [activeTab, setActiveTab] = useState<"chat" | "config">("chat");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      content: "Hola, soy tu asistente de IA para tu restaurante. ¿En qué puedo ayudarte hoy?",
      sender: 'bot',
      timestamp: "10:30"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const newUserMessage: ChatMessage = {
      id: messages.length + 1,
      content: inputValue,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newUserMessage]);
    setInputValue("");
    setIsLoading(true);
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: messages.length + 2,
        content: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1500);
  };
  
  const getBotResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes("ventas")) {
      return "Basado en tus datos de ventas del último mes, tus platos más rentables son las milanesas y las pastas. Te recomendaría crear una promoción especial para estos platos durante la semana para aumentar aún más las ventas.";
    } else if (lowerMessage.includes("platos") || lowerMessage.includes("vendidos")) {
      return "Tus platos más vendidos son:\n\n1. Milanesa Napolitana\n2. Pasta Bolognesa\n3. Hamburguesa completa\n4. Tiramisú\n5. Ensalada César\n\nLas bebidas más solicitadas son cerveza artesanal y refrescos.";
    } else if (lowerMessage.includes("eficiencia") || lowerMessage.includes("mejorar")) {
      return "Para mejorar la eficiencia de tu restaurante, te recomendaría:\n\n1. Optimizar los horarios del personal según las horas pico\n2. Simplificar el menú eliminando los platos menos populares\n3. Implementar un sistema de reservas online\n4. Mejorar la comunicación entre la cocina y el personal de servicio";
    } else if (lowerMessage.includes("promocion")) {
      return "Basándome en tus datos, te sugiero estas promociones:\n\n1. Menú de mediodía a precio fijo entre las 12:00 y las 15:00\n2. Happy hour de cervezas artesanales entre las 18:00 y 20:00\n3. Descuento del 15% en pedidos en línea para recoger\n4. Postre gratis para mesas de 4 o más personas";
    } else {
      return "Puedo ayudarte con información sobre ventas, inventario, recomendaciones para tu menú o promociones. ¿Qué información específica necesitas?";
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handlePresetMessage = (message: string) => {
    setInputValue(message);
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Bot className="h-8 w-8" />
              <span>Asistente IA</span>
            </h1>
            <p className="text-muted-foreground">Tu asesor personal para optimizar la gestión de tu restaurante</p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Settings className="h-4 w-4" />
                <span>Configurar</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Configuración del chatbot</DialogTitle>
                <DialogDescription>Personaliza cómo interactúa el asistente con tu información</DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="space-y-2">
                  <Label>Personalidad del chatbot</Label>
                  <Textarea 
                    placeholder="Eres un asistente de restaurante amigable y profesional..."
                    rows={3}
                    defaultValue="Eres un asistente de restaurante amigable y profesional que ayuda al dueño a optimizar su negocio con recomendaciones basadas en datos."
                  />
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Acceso a datos</h4>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sales-data" className="block">Datos de ventas</Label>
                      <p className="text-xs text-muted-foreground">Permite al chatbot analizar tus ventas</p>
                    </div>
                    <Switch id="sales-data" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="inventory-data" className="block">Datos de inventario</Label>
                      <p className="text-xs text-muted-foreground">Permite al chatbot analizar tu inventario</p>
                    </div>
                    <Switch id="inventory-data" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="customer-data" className="block">Datos de clientes</Label>
                      <p className="text-xs text-muted-foreground">Permite al chatbot analizar datos de clientes</p>
                    </div>
                    <Switch id="customer-data" defaultChecked />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => {
                  toast({
                    title: "Configuración guardada",
                    description: "Los cambios se aplicarán inmediatamente"
                  });
                }}>Guardar cambios</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </motion.div>
        
        <Card className="h-[calc(100vh-220px)]">
          <CardHeader className="p-4">
            <Tabs defaultValue={activeTab} onValueChange={(v) => setActiveTab(v as "chat" | "config")}>
              <TabsList>
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="config">Instrucciones</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          
          <CardContent className="p-0">
            <TabsContent value="chat" className="p-0 m-0 h-[calc(100%-60px)]">
              <ScrollArea className="h-[calc(100%-80px)] px-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      className={`flex my-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex gap-3 max-w-[80%]">
                        {message.sender === 'bot' && (
                          <Avatar>
                            <AvatarFallback className="bg-gastro text-white">IA</AvatarFallback>
                          </Avatar>
                        )}
                        
                        <div>
                          <div className={`p-3 rounded-lg ${
                            message.sender === 'user' 
                              ? 'bg-gastro text-white' 
                              : 'bg-gray-100 dark:bg-slate-800'
                          }`}>
                            <div className="whitespace-pre-line text-sm">
                              {message.content}
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1 ml-1">
                            {message.timestamp}
                          </div>
                        </div>
                        
                        {message.sender === 'user' && (
                          <Avatar>
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  
                  {isLoading && (
                    <motion.div
                      className="flex my-4 justify-start"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="flex gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-gastro text-white">IA</AvatarFallback>
                        </Avatar>
                        
                        <div className="p-3 rounded-lg bg-gray-100 dark:bg-slate-800">
                          <div className="flex gap-1 items-center h-6">
                            <motion.div 
                              className="w-2 h-2 rounded-full bg-gastro"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1, repeat: Infinity }}
                            />
                            <motion.div 
                              className="w-2 h-2 rounded-full bg-gastro"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                            />
                            <motion.div 
                              className="w-2 h-2 rounded-full bg-gastro"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </AnimatePresence>
              </ScrollArea>
              
              <div className="p-4 border-t">
                <div className="flex items-center gap-2">
                  <Input 
                    placeholder="Escribe un mensaje..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    disabled={isLoading}
                  />
                  <Button 
                    onClick={handleSendMessage} 
                    disabled={isLoading || !inputValue.trim()}
                    size="icon"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  {PRESET_MESSAGES.map((message, index) => (
                    <Button 
                      key={index} 
                      variant="outline" 
                      size="sm"
                      className="text-xs"
                      onClick={() => handlePresetMessage(message)}
                    >
                      {message}
                    </Button>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="config" className="p-4 m-0">
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Wand2 className="h-5 w-5 text-gastro" />
                      <span>¿Qué puedo hacer?</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 list-disc pl-5">
                      <li>Analizar tus datos de ventas y hacer recomendaciones</li>
                      <li>Sugerir mejoras en tu menú basadas en popularidad</li>
                      <li>Identificar tendencias en el comportamiento de tus clientes</li>
                      <li>Recomendar promociones efectivas</li>
                      <li>Ayudar con la optimización de horarios y personal</li>
                      <li>Proporcionar ideas para mejorar la experiencia del cliente</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Ejemplos de preguntas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {PRESET_MESSAGES.map((message, index) => (
                      <div 
                        key={index}
                        className="p-2 rounded-lg border hover:bg-muted cursor-pointer"
                        onClick={() => {
                          setActiveTab("chat");
                          handlePresetMessage(message);
                        }}
                      >
                        {message}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Chat;
