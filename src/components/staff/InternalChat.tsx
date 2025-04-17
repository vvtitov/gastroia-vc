
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Clock, CheckCheck, Check } from "lucide-react";
import { motion } from "framer-motion";
import { Message, MessageStatus } from "@/types/message";

// Demo message data
const DEMO_MESSAGES: Record<string, Message[]> = {
  "1": [
    { id: 1, sender: 1, receiver: "2", text: "¿Pueden preparar la mesa 4 para 6 personas?", time: "10:15", status: "read" },
    { id: 2, sender: "2", receiver: 1, text: "Listo, ya está preparada", time: "10:17", status: "read" },
    { id: 3, sender: 1, receiver: "2", text: "Gracias. Los clientes acaban de llegar.", time: "10:25", status: "read" },
  ],
  "2": [
    { id: 4, sender: 1, receiver: "3", text: "Mesa 2 pide la cuenta", time: "11:30", status: "read" },
    { id: 5, sender: "3", receiver: 1, text: "Enseguida la preparo", time: "11:31", status: "read" },
    { id: 6, sender: 1, receiver: "3", text: "También preguntaron por el postre del día", time: "11:32", status: "delivered" },
  ],
  "g1": [
    { id: 7, sender: "2", receiver: "group", text: "Necesito que alguien me cubra 15 minutos", time: "12:15", status: "read" },
    { id: 8, sender: "4", receiver: "group", text: "Yo puedo", time: "12:16", status: "read" },
    { id: 9, sender: "2", receiver: "group", text: "Gracias!", time: "12:17", status: "delivered" },
  ],
  "g4": [
    { id: 10, sender: "3", receiver: "group", text: "Se terminaron las papas fritas", time: "19:45", status: "read" },
    { id: 11, sender: 1, receiver: "group", text: "¿Para cuándo estiman que habrá más?", time: "19:46", status: "sent" },
  ]
};

// Demo staff members
const STAFF_MEMBERS = [
  { id: 1, name: "Juan (Yo)", role: "Cajero", avatar: "/placeholder.svg" },
  { id: 2, name: "María", role: "Moza", avatar: "/placeholder.svg" },
  { id: 3, name: "Carlos", role: "Cocina", avatar: "/placeholder.svg" },
  { id: 4, name: "Laura", role: "Gerente", avatar: "/placeholder.svg" },
];

const GROUPS = [
  { id: "g1", name: "Todos", members: 8, avatar: null },
  { id: "g4", name: "Cocina", members: 3, avatar: null }
];

interface MessageItemProps {
  message: Message;
  isMe: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, isMe }) => {
  const statusIcons = {
    sent: <Clock className="h-3 w-3" />,
    delivered: <Check className="h-3 w-3" />,
    read: <CheckCheck className="h-3 w-3" />
  };
  
  return (
    <motion.div 
      className={`flex my-2 ${isMe ? 'justify-end' : 'justify-start'}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className={`${isMe ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-slate-700'} p-3 rounded-lg max-w-[80%]`}>
        <p className="text-sm">{message.text}</p>
        <div className={`flex items-center gap-1 text-xs mt-1 ${isMe ? 'justify-end' : ''}`}>
          <span className={isMe ? 'text-blue-100' : 'text-gray-500'}>{message.time}</span>
          {isMe && <span className="text-blue-100">{statusIcons[message.status]}</span>}
        </div>
      </div>
    </motion.div>
  );
};

export const InternalChat: React.FC = () => {
  const [activeChat, setActiveChat] = useState("1");
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<Record<string, Message[]>>(DEMO_MESSAGES);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages, activeChat]);
  
  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    const newMessage: Message = {
      id: Date.now(),
      sender: 1, // Current user ID
      receiver: activeChat,
      text: messageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent' as MessageStatus
    };
    
    setMessages(prev => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), newMessage]
    }));
    
    setMessageText("");
    
    // Simulate response after a delay (for demo)
    if (Math.random() > 0.5) {
      setTimeout(() => {
        const response: Message = {
          id: Date.now() + 1,
          sender: activeChat,
          receiver: 1,
          text: "Entendido, gracias por avisar.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'delivered' as MessageStatus
        };
        
        setMessages(prev => ({
          ...prev,
          [activeChat]: [...(prev[activeChat] || []), response]
        }));
      }, 2000);
    }
  };
  
  const getChatName = (chatId: string) => {
    if (chatId.startsWith("g")) {
      return GROUPS.find(g => g.id === chatId)?.name || "Grupo";
    } else {
      return STAFF_MEMBERS.find(s => s.id.toString() === chatId)?.name || "Usuario";
    }
  };
  
  const isGroup = activeChat.startsWith("g");
  
  return (
    <Card className="h-[calc(100vh-220px)]">
      <CardHeader className="p-4 border-b">
        <CardTitle className="text-lg">Chat del equipo</CardTitle>
      </CardHeader>
      
      <div className="flex h-[calc(100%-120px)]">
        <div className="w-1/4 border-r p-2 overflow-y-auto">
          <Tabs defaultValue="staff">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="staff">Personal</TabsTrigger>
              <TabsTrigger value="groups">Grupos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="staff" className="mt-2 space-y-2">
              {STAFF_MEMBERS.filter(s => s.id !== 1).map(staff => (
                <div 
                  key={staff.id}
                  className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800 ${activeChat === staff.id.toString() ? 'bg-gray-100 dark:bg-slate-800' : ''}`}
                  onClick={() => setActiveChat(staff.id.toString())}
                >
                  <Avatar>
                    <AvatarImage src={staff.avatar} />
                    <AvatarFallback>{staff.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{staff.name}</p>
                    <p className="text-xs text-muted-foreground">{staff.role}</p>
                  </div>
                  {staff.id === 2 && (
                    <Badge className="ml-auto bg-green-500 h-2 w-2 rounded-full p-0" />
                  )}
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="groups" className="mt-2 space-y-2">
              {GROUPS.map(group => (
                <div 
                  key={group.id}
                  className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800 ${activeChat === group.id ? 'bg-gray-100 dark:bg-slate-800' : ''}`}
                  onClick={() => setActiveChat(group.id)}
                >
                  <Avatar>
                    <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{group.name}</p>
                    <p className="text-xs text-muted-foreground">{group.members} miembros</p>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="flex flex-col w-3/4">
          <div className="p-3 border-b flex items-center gap-3">
            <Avatar>
              {isGroup ? (
                <AvatarFallback>{getChatName(activeChat).charAt(0)}</AvatarFallback>
              ) : (
                <>
                  <AvatarImage src={STAFF_MEMBERS.find(s => s.id.toString() === activeChat)?.avatar} />
                  <AvatarFallback>{getChatName(activeChat).charAt(0)}</AvatarFallback>
                </>
              )}
            </Avatar>
            <div>
              <p className="font-medium">{getChatName(activeChat)}</p>
              <p className="text-xs text-muted-foreground">
                {isGroup 
                  ? `${GROUPS.find(g => g.id === activeChat)?.members} miembros`
                  : STAFF_MEMBERS.find(s => s.id.toString() === activeChat)?.role
                }
              </p>
            </div>
          </div>
          
          <ScrollArea className="flex-1 p-3">
            {messages[activeChat]?.map(message => (
              <MessageItem 
                key={message.id} 
                message={message} 
                isMe={message.sender === 1}
              />
            ))}
            <div ref={messagesEndRef} />
          </ScrollArea>
          
          <CardFooter className="border-t p-3">
            <div className="flex w-full gap-2">
              <Input 
                placeholder="Escribe un mensaje..." 
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button onClick={handleSendMessage} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};
