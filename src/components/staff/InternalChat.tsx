
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Search, Bell, FileText, GanttChartSquare, Users, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Demo staff and departments
const STAFF_MEMBERS = [
  { id: 1, name: "Ana García", role: "Cajera", department: "Caja", avatar: "/placeholder.svg", status: "online" },
  { id: 2, name: "Carlos López", role: "Chef", department: "Cocina", avatar: "/placeholder.svg", status: "online" },
  { id: 3, name: "María Rodríguez", role: "Mesera", department: "Servicio", avatar: "/placeholder.svg", status: "offline" },
  { id: 4, name: "Juan Pérez", role: "Barman", department: "Bar", avatar: "/placeholder.svg", status: "online" },
  { id: 5, name: "Laura Martínez", role: "Mesera", department: "Servicio", avatar: "/placeholder.svg", status: "online" },
  { id: 6, name: "Roberto Fernández", role: "Gerente", department: "Administración", avatar: "/placeholder.svg", status: "online" }
];

// Demo group chats
const GROUP_CHATS = [
  { id: "g1", name: "Cocina", members: 4, icon: "👨‍🍳", unread: 2 },
  { id: "g2", name: "Meseros", members: 5, icon: "🍽️", unread: 0 },
  { id: "g3", name: "Administración", members: 2, icon: "📊", unread: 0 },
  { id: "g4", name: "Todo el personal", members: 12, icon: "👥", unread: 3 }
];

// Demo message history
const INITIAL_MESSAGES = {
  "1": [
    { id: 1, sender: 1, receiver: "currentUser", text: "Hola! Tengo una pregunta sobre el cierre de caja.", time: "09:45", status: "read" },
    { id: 2, sender: "currentUser", receiver: 1, text: "Dime, Ana. ¿En qué puedo ayudarte?", time: "09:46", status: "read" },
    { id: 3, sender: 1, receiver: "currentUser", text: "El sistema muestra una diferencia de $150. ¿Cómo lo registro?", time: "09:47", status: "read" }
  ],
  "2": [
    { id: 4, sender: "currentUser", receiver: 2, text: "Carlos, tenemos una mesa que pidió información sobre ingredientes alérgenos.", time: "10:15", status: "read" },
    { id: 5, sender: 2, receiver: "currentUser", text: "Claro, ¿qué plato es?", time: "10:16", status: "read" },
    { id: 6, sender: "currentUser", receiver: 2, text: "La pasta del día. Mesa 5.", time: "10:16", status: "read" },
    { id: 7, sender: 2, receiver: "currentUser", text: "La pasta contiene gluten y trazas de nueces. Voy a preparar una versión sin gluten si lo necesitan.", time: "10:18", status: "read" }
  ],
  "g1": [
    { id: 8, sender: 2, receiver: "g1", text: "Recordatorio: hoy tenemos el nuevo menú del día. Revisen la lista de ingredientes.", time: "08:30", status: "read", senderName: "Carlos López" },
    { id: 9, sender: 6, receiver: "g1", text: "Además, hoy viene el inspector de sanidad. Todo debe estar impecable.", time: "08:35", status: "read", senderName: "Roberto Fernández" }
  ],
  "g4": [
    { id: 10, sender: 6, receiver: "g4", text: "Reunión general mañana a las 9:00 AM. Asistencia obligatoria.", time: "18:20", status: "read", senderName: "Roberto Fernández" },
    { id: 11, sender: "currentUser", receiver: "g4", text: "¿Podrían confirmar recepción de este mensaje?", time: "18:22", status: "sent", senderName: "Yo" },
    { id: 12, sender: 1, receiver: "g4", text: "Confirmado.", time: "18:25", status: "read", senderName: "Ana García" },
    { id: 13, sender: 2, receiver: "g4", text: "Recibido.", time: "18:26", status: "read", senderName: "Carlos López" }
  ]
};

interface Message {
  id: number;
  sender: number | string;
  receiver: number | string;
  text: string;
  time: string;
  status: 'sent' | 'delivered' | 'read';
  senderName?: string;
}

export const InternalChat: React.FC = () => {
  const [chatType, setChatType] = useState<'staff' | 'groups'>('staff');
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Record<string, Message[]>>(INITIAL_MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // When a chat is selected, scroll to the bottom of the messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [selectedChat, messages]);

  const currentChat = selectedChat ? (
    chatType === 'staff' 
      ? STAFF_MEMBERS.find(staff => staff.id.toString() === selectedChat)
      : GROUP_CHATS.find(group => group.id === selectedChat)
  ) : null;

  const currentMessages = selectedChat ? (messages[selectedChat] || []) : [];

  const filteredStaff = STAFF_MEMBERS.filter(staff => 
    staff.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    staff.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredGroups = GROUP_CHATS.filter(group => 
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const newMsg: Message = {
      id: Date.now(),
      sender: "currentUser",
      receiver: selectedChat,
      text: newMessage,
      time: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
      senderName: chatType === 'groups' ? 'Yo' : undefined
    };

    setMessages(prev => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMsg]
    }));

    setNewMessage('');
  };

  return (
    <Card className="overflow-hidden h-[calc(100vh-220px)]">
      <CardHeader className="p-4 border-b bg-muted/30">
        <CardTitle className="text-lg flex items-center gap-2">
          <Users className="h-5 w-5 text-muted-foreground" />
          Chat Interno
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 grid grid-cols-1 md:grid-cols-3 h-[calc(100%-64px)]">
        {/* Contacts & Groups Sidebar */}
        <div className="border-r p-0 md:block">
          <div className="p-3 border-b">
            <Tabs value={chatType} onValueChange={(v) => setChatType(v as 'staff' | 'groups')}>
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="staff" className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>Personal</span>
                </TabsTrigger>
                <TabsTrigger value="groups" className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>Grupos</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar..." 
                className="pl-8" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <ScrollArea className="h-[calc(100%-108px)]">
            <AnimatePresence mode="wait">
              {chatType === 'staff' ? (
                <motion.div
                  key="staff-list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {filteredStaff.map(staff => (
                    <div
                      key={staff.id}
                      className={`p-3 flex items-center gap-3 cursor-pointer hover:bg-muted/50 transition-colors ${
                        selectedChat === staff.id.toString() ? 'bg-muted' : ''
                      }`}
                      onClick={() => setSelectedChat(staff.id.toString())}
                    >
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={staff.avatar} alt={staff.name} />
                          <AvatarFallback>{staff.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${
                          staff.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium">{staff.name}</div>
                        <div className="text-sm text-muted-foreground truncate">
                          {staff.role} - {staff.department}
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="groups-list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {filteredGroups.map(group => (
                    <div
                      key={group.id}
                      className={`p-3 flex items-center gap-3 cursor-pointer hover:bg-muted/50 transition-colors ${
                        selectedChat === group.id ? 'bg-muted' : ''
                      }`}
                      onClick={() => setSelectedChat(group.id)}
                    >
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg">
                          {group.icon}
                        </div>
                        {group.unread > 0 && (
                          <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                            {group.unread}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium">{group.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {group.members} miembros
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="col-span-2 flex flex-col h-full">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-3 border-b bg-muted/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {chatType === 'staff' ? (
                    <>
                      <Avatar>
                        <AvatarImage src={(currentChat as any)?.avatar} />
                        <AvatarFallback>{(currentChat as any)?.name?.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{(currentChat as any)?.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {(currentChat as any)?.role} • {
                            (currentChat as any)?.status === 'online' ? (
                              <span className="text-green-600">En línea</span>
                            ) : (
                              <span className="text-muted-foreground">Desconectado</span>
                            )
                          }
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg">
                        {(currentChat as any)?.icon}
                      </div>
                      <div>
                        <div className="font-medium">{(currentChat as any)?.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {(currentChat as any)?.members} miembros
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon">
                    <Bell className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <FileText className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4" ref={scrollRef}>
                <div className="space-y-4">
                  {currentMessages.map((message, index) => (
                    <motion.div 
                      key={message.id}
                      className={`flex ${message.sender === "currentUser" ? "justify-end" : "justify-start"}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div 
                        className={`max-w-[80%] rounded-lg px-4 py-2 ${
                          message.sender === "currentUser" 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-muted"
                        }`}
                      >
                        {message.senderName && (
                          <div className="text-xs font-medium mb-1">
                            {message.senderName}
                          </div>
                        )}
                        <div className="text-sm">{message.text}</div>
                        <div className="text-xs mt-1 flex items-center justify-end gap-1">
                          {message.time}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-3 border-t mt-auto">
                <form 
                  className="flex gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                >
                  <Input 
                    placeholder="Escribe un mensaje..." 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <Button type="submit" size="icon" disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-4 text-center">
              <GanttChartSquare className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium">Chat interno del personal</h3>
              <p className="text-muted-foreground mt-2">
                Comunícate con el resto del equipo. Selecciona un contacto o grupo para comenzar.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
