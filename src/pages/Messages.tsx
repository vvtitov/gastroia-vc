
import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Search, Inbox, Clock, Archive, Star, User, CheckCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Types and demo data
type MessageStatus = 'read' | 'unread' | 'archived';

interface Contact {
  id: string;
  name: string;
  avatar?: string;
  role: 'supplier' | 'customer' | 'staff';
  lastActive?: string;
}

interface MessageThread {
  id: string;
  contactId: string;
  messages: {
    id: string;
    content: string;
    timestamp: string;
    isFromMe: boolean;
    status: 'sent' | 'delivered' | 'read';
  }[];
  lastMessage: string;
  lastTimestamp: string;
  status: MessageStatus;
  isStarred: boolean;
}

const DEMO_CONTACTS: Contact[] = [
  { id: "1", name: "Distribuidora de Bebidas SA", role: 'supplier', lastActive: "Hace 3h" },
  { id: "2", name: "Juan Cliente", role: 'customer', lastActive: "Hace 1d" },
  { id: "3", name: "María (Servicio)", role: 'staff', lastActive: "Activo ahora" },
  { id: "4", name: "Carnicería Premium", role: 'supplier', lastActive: "Hace 2d" },
  { id: "5", name: "Carlos Rodríguez", role: 'customer', lastActive: "Hace 6h" },
  { id: "6", name: "Ana (Cocina)", role: 'staff', lastActive: "Hace 1h" },
];

const DEMO_THREADS: MessageThread[] = [
  {
    id: "t1",
    contactId: "1",
    lastMessage: "Te confirmo el pedido para mañana a primera hora.",
    lastTimestamp: "10:30",
    status: 'unread',
    isStarred: false,
    messages: [
      { id: "m1", content: "Hola, necesitamos hacer un pedido para reponer el stock de bebidas.", timestamp: "10:15", isFromMe: true, status: 'read' },
      { id: "m2", content: "¡Hola! Claro, ¿qué necesitas exactamente?", timestamp: "10:20", isFromMe: false, status: 'read' },
      { id: "m3", content: "12 cajas de Coca-Cola, 8 de agua mineral y 6 de cerveza artesanal.", timestamp: "10:25", isFromMe: true, status: 'read' },
      { id: "m4", content: "Te confirmo el pedido para mañana a primera hora.", timestamp: "10:30", isFromMe: false, status: 'read' },
    ]
  },
  {
    id: "t2",
    contactId: "2",
    lastMessage: "¡Muchas gracias! Los esperamos esta noche.",
    lastTimestamp: "Ayer",
    status: 'read',
    isStarred: true,
    messages: [
      { id: "m5", content: "Hola, quisiera hacer una reserva para 4 personas esta noche a las 21:00.", timestamp: "Ayer 15:30", isFromMe: false, status: 'read' },
      { id: "m6", content: "Hola Juan, déjame revisar la disponibilidad.", timestamp: "Ayer 15:35", isFromMe: true, status: 'read' },
      { id: "m7", content: "Tenemos mesa disponible a esa hora. ¿A nombre de quién hago la reserva?", timestamp: "Ayer 15:37", isFromMe: true, status: 'read' },
      { id: "m8", content: "A nombre de Juan Pérez, muchas gracias.", timestamp: "Ayer 15:40", isFromMe: false, status: 'read' },
      { id: "m9", content: "¡Perfecto! Ya quedó registrada tu reserva para 4 personas a las 21:00.", timestamp: "Ayer 15:42", isFromMe: true, status: 'read' },
      { id: "m10", content: "¡Muchas gracias! Los esperamos esta noche.", timestamp: "Ayer 15:43", isFromMe: false, status: 'read' },
    ]
  },
  {
    id: "t3",
    contactId: "3",
    lastMessage: "La mesa 8 necesita más servilletas, ¿puedes llevarlas?",
    lastTimestamp: "13:15",
    status: 'read',
    isStarred: false,
    messages: [
      { id: "m11", content: "Hola María, ¿puedes atender la mesa 5? Acaban de llegar clientes.", timestamp: "13:00", isFromMe: true, status: 'read' },
      { id: "m12", content: "Claro, voy en seguida.", timestamp: "13:01", isFromMe: false, status: 'read' },
      { id: "m13", content: "La mesa 8 necesita más servilletas, ¿puedes llevarlas?", timestamp: "13:15", isFromMe: true, status: 'read' },
    ]
  },
  {
    id: "t4",
    contactId: "4",
    lastMessage: "Mañana llega el pedido de carnes. Confirmo cuando esté en camino.",
    lastTimestamp: "Lun",
    status: 'archived',
    isStarred: false,
    messages: [
      { id: "m14", content: "Buenos días, necesitamos hacer un pedido de carnes para la semana.", timestamp: "Lun 09:30", isFromMe: true, status: 'read' },
      { id: "m15", content: "Buenos días. Por supuesto, ¿qué cortes necesitas?", timestamp: "Lun 09:45", isFromMe: false, status: 'read' },
      { id: "m16", content: "5kg de bife de chorizo, 3kg de vacío y 4kg de lomo.", timestamp: "Lun 10:00", isFromMe: true, status: 'read' },
      { id: "m17", content: "Perfecto. ¿Para cuándo lo necesitas?", timestamp: "Lun 10:05", isFromMe: false, status: 'read' },
      { id: "m18", content: "Para mañana si es posible.", timestamp: "Lun 10:10", isFromMe: true, status: 'read' },
      { id: "m19", content: "Mañana llega el pedido de carnes. Confirmo cuando esté en camino.", timestamp: "Lun 10:15", isFromMe: false, status: 'read' },
    ]
  }
];

const Messages = () => {
  const [tab, setTab] = useState<'all' | 'unread' | 'archived'>('all');
  const [selectedThread, setSelectedThread] = useState<MessageThread | null>(null);
  const [contacts, setContacts] = useState<Contact[]>(DEMO_CONTACTS);
  const [threads, setThreads] = useState<MessageThread[]>(DEMO_THREADS);
  const [searchTerm, setSearchTerm] = useState("");
  const [messageText, setMessageText] = useState("");
  
  // Filter threads based on tab and search term
  const filteredThreads = threads.filter(thread => {
    const matchesTab = 
      tab === 'all' ? thread.status !== 'archived' : 
      tab === 'unread' ? thread.status === 'unread' : 
      thread.status === 'archived';
    
    const contact = contacts.find(contact => contact.id === thread.contactId);
    const matchesSearch = contact ? 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      thread.lastMessage.toLowerCase().includes(searchTerm.toLowerCase()) : 
      false;
    
    return matchesTab && (searchTerm === "" || matchesSearch);
  });
  
  // Get contact details for a thread
  const getContactForThread = (thread: MessageThread): Contact => {
    return contacts.find(contact => contact.id === thread.contactId) || {
      id: "unknown",
      name: "Usuario desconocido",
      role: "customer",
    };
  };
  
  // Send a new message
  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedThread) return;
    
    const newMessage = {
      id: `m${Date.now()}`,
      content: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isFromMe: true,
      status: 'sent' as const
    };
    
    const updatedThreads = threads.map(thread => {
      if (thread.id === selectedThread.id) {
        const updatedThread = {
          ...thread,
          messages: [...thread.messages, newMessage],
          lastMessage: messageText,
          lastTimestamp: newMessage.timestamp,
          status: 'read' as MessageStatus
        };
        setSelectedThread(updatedThread);
        return updatedThread;
      }
      return thread;
    });
    
    setThreads(updatedThreads);
    setMessageText("");
    
    // Simulate response after delay
    setTimeout(() => {
      const responseMessage = {
        id: `m${Date.now()}`,
        content: getRandomResponse(messageText),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isFromMe: false,
        status: 'read' as const
      };
      
      const finalUpdatedThreads = updatedThreads.map(thread => {
        if (thread.id === selectedThread.id) {
          const updatedThread = {
            ...thread,
            messages: [...thread.messages, responseMessage],
            lastMessage: responseMessage.content,
            lastTimestamp: responseMessage.timestamp
          };
          setSelectedThread(updatedThread);
          return updatedThread;
        }
        return thread;
      });
      
      setThreads(finalUpdatedThreads);
    }, 2000);
  };
  
  // Get a random response based on the sent message
  const getRandomResponse = (message: string): string => {
    const responses = [
      "Entendido, gracias por la información.",
      "¡Perfecto! Lo tendré en cuenta.",
      "De acuerdo, me encargo de eso.",
      "Gracias por avisarme, lo resuelvo enseguida.",
      "Recibido. Te confirmaré cuando esté listo."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };
  
  // Mark a thread as read/unread/archived
  const handleStatusChange = (threadId: string, newStatus: MessageStatus) => {
    const updatedThreads = threads.map(thread => 
      thread.id === threadId ? { ...thread, status: newStatus } : thread
    );
    
    setThreads(updatedThreads);
    
    if (selectedThread?.id === threadId) {
      setSelectedThread({ ...selectedThread, status: newStatus });
      
      if (newStatus === 'archived') {
        setSelectedThread(null);
      }
    }
  };
  
  // Toggle star status of a thread
  const handleToggleStar = (threadId: string) => {
    const updatedThreads = threads.map(thread => 
      thread.id === threadId ? { ...thread, isStarred: !thread.isStarred } : thread
    );
    
    setThreads(updatedThreads);
    
    if (selectedThread?.id === threadId) {
      setSelectedThread({ ...selectedThread, isStarred: !selectedThread.isStarred });
    }
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <motion.h1 
          className="text-3xl font-bold"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Mensajes
        </motion.h1>
        
        <Card className="overflow-hidden h-[calc(100vh-180px)]">
          <div className="flex h-full">
            {/* Sidebar */}
            <div className="w-full md:w-1/3 lg:w-1/4 border-r">
              <CardHeader className="p-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Buscar mensajes..." 
                    className="pl-8" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <Tabs className="mt-4" value={tab} onValueChange={(value) => setTab(value as any)}>
                  <TabsList className="grid grid-cols-3">
                    <TabsTrigger value="all" className="flex items-center gap-1">
                      <Inbox className="h-4 w-4" />
                      <span>Bandeja</span>
                    </TabsTrigger>
                    <TabsTrigger value="unread" className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>Sin leer</span>
                    </TabsTrigger>
                    <TabsTrigger value="archived" className="flex items-center gap-1">
                      <Archive className="h-4 w-4" />
                      <span>Archivados</span>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              
              <ScrollArea className="h-[calc(100%-130px)]">
                <div className="p-2">
                  <AnimatePresence initial={false}>
                    {filteredThreads.length === 0 ? (
                      <div className="flex flex-col items-center justify-center p-6 text-center">
                        <div className="rounded-full bg-muted p-3 mb-3">
                          <Inbox className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="font-medium">No hay mensajes</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          No se encontraron mensajes en esta bandeja
                        </p>
                      </div>
                    ) : (
                      filteredThreads.map((thread) => {
                        const contact = getContactForThread(thread);
                        
                        return (
                          <motion.div
                            key={thread.id}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={`p-3 mb-1 rounded-lg cursor-pointer ${
                              selectedThread?.id === thread.id
                                ? 'bg-muted'
                                : 'hover:bg-muted/50'
                            } ${thread.status === 'unread' ? 'font-medium' : ''}`}
                            onClick={() => {
                              setSelectedThread(thread);
                              if (thread.status === 'unread') {
                                handleStatusChange(thread.id, 'read');
                              }
                            }}
                          >
                            <div className="flex gap-3">
                              <Avatar>
                                {contact.avatar ? (
                                  <AvatarImage src={contact.avatar} />
                                ) : (
                                  <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                                )}
                              </Avatar>
                              
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                  <div className="truncate font-medium">
                                    {contact.name}
                                    {thread.isStarred && (
                                      <Star className="inline h-3 w-3 ml-1 text-amber-500 fill-amber-500" />
                                    )}
                                  </div>
                                  <div className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                                    {thread.lastTimestamp}
                                  </div>
                                </div>
                                
                                <div className="truncate text-sm text-muted-foreground">
                                  {thread.lastMessage}
                                </div>
                                
                                <div className="flex items-center mt-1">
                                  <Badge 
                                    variant="outline" 
                                    className="text-[10px] h-5 px-1.5 font-normal"
                                  >
                                    {contact.role === 'supplier' ? 'Proveedor' : 
                                     contact.role === 'customer' ? 'Cliente' : 'Personal'}
                                  </Badge>
                                  
                                  {thread.status === 'unread' && (
                                    <Badge className="ml-1 h-2 w-2 rounded-full p-0 bg-blue-500" />
                                  )}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })
                    )}
                  </AnimatePresence>
                </div>
              </ScrollArea>
            </div>
            
            {/* Message Detail */}
            <div className="hidden md:flex flex-col w-2/3 lg:w-3/4 h-full">
              {selectedThread ? (
                <>
                  <CardHeader className="border-b p-4 flex flex-row items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{getContactForThread(selectedThread).name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">
                          {getContactForThread(selectedThread).name}
                        </CardTitle>
                        <p className="text-xs text-muted-foreground">
                          {getContactForThread(selectedThread).lastActive || "Desconectado"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleStar(selectedThread.id)}
                        className={`${selectedThread.isStarred ? 'text-amber-500' : ''}`}
                      >
                        <Star className={`h-4 w-4 ${selectedThread.isStarred ? 'fill-amber-500' : ''}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleStatusChange(selectedThread.id, 
                          selectedThread.status === 'archived' ? 'read' : 'archived'
                        )}
                      >
                        <Archive className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {selectedThread.messages.map((message) => (
                        <motion.div
                          key={message.id}
                          className={`flex ${message.isFromMe ? 'justify-end' : 'justify-start'}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {!message.isFromMe && (
                            <Avatar className="mr-2 mt-1">
                              <AvatarFallback>{getContactForThread(selectedThread).name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          )}
                          
                          <div className="max-w-[70%]">
                            <div className={`p-3 rounded-lg ${
                              message.isFromMe 
                                ? 'bg-gastro text-white' 
                                : 'bg-gray-100 dark:bg-slate-800'
                            }`}>
                              <p className="text-sm">{message.content}</p>
                            </div>
                            <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                              <span>{message.timestamp}</span>
                              {message.isFromMe && (
                                message.status === 'read' 
                                  ? <CheckCheck className="h-3 w-3" /> 
                                  : message.status === 'delivered' 
                                    ? <CheckCheck className="h-3 w-3" />
                                    : <Clock className="h-3 w-3" />
                              )}
                            </div>
                          </div>
                          
                          {message.isFromMe && (
                            <Avatar className="ml-2 mt-1">
                              <AvatarImage src="/placeholder.svg" />
                              <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                            </Avatar>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </ScrollArea>
                  
                  <CardContent className="p-4 border-t">
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Escribe un mensaje..." 
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                      />
                      <Button onClick={handleSendMessage} disabled={!messageText.trim()}>
                        <Send className="h-4 w-4 mr-1" />
                        Enviar
                      </Button>
                    </div>
                  </CardContent>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="rounded-full bg-muted p-6 mb-4">
                    <Inbox className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h2 className="text-xl font-medium mb-2">No hay mensajes seleccionados</h2>
                  <p className="text-center text-muted-foreground max-w-sm">
                    Selecciona una conversación de la lista para ver sus mensajes o inicia una nueva conversación.
                  </p>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Messages;
