
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Send, User, Users } from 'lucide-react';
import { Message } from '@/types/message';
import { MessageItem } from './message/MessageItem';
import { motion } from 'framer-motion';

const DEMO_STAFF = [
  { id: 1, name: 'Carlos', role: 'Cocina' },
  { id: 2, name: 'Maria', role: 'Mesas' },
  { id: 3, name: 'Juan', role: 'Caja' },
  { id: 4, name: 'Ana', role: 'Atención' },
  { id: 5, name: 'Roberto', role: 'Cocina' }
];

const DEMO_MESSAGES: Message[] = [
  {
    id: 1,
    sender: 3,
    receiver: 1,
    text: 'Carlos, ¿está lista la orden para la mesa 5?',
    time: '14:25',
    status: 'read'
  },
  {
    id: 2,
    sender: 1,
    receiver: 3,
    text: 'Estará lista en 5 minutos',
    time: '14:26',
    status: 'read'
  },
  {
    id: 3,
    sender: 3,
    receiver: 1,
    text: 'Gracias, el cliente está esperando',
    time: '14:27',
    status: 'read'
  },
  {
    id: 4,
    sender: 3,
    receiver: 2,
    text: 'María, ¿puedes llevar la cuenta a la mesa 3?',
    time: '14:30',
    status: 'delivered'
  },
  {
    id: 5,
    sender: 2,
    receiver: 3,
    text: 'Ya voy',
    time: '14:31',
    status: 'read'
  },
  {
    id: 6,
    sender: 3,
    receiver: 0,
    text: 'Atención a todos: nueva reserva para 8 personas a las 21:00',
    time: '14:40',
    status: 'sent'
  }
];

export const InternalChat = () => {
  const currentUser = 3; // Juan (Caja)
  const [selectedChat, setSelectedChat] = useState<number>(1); // Carlos (Cocina)
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState(DEMO_MESSAGES);
  const [activeTab, setActiveTab] = useState('direct');

  const filteredMessages = messages.filter(
    msg => 
      (activeTab === 'direct' && 
        ((msg.sender === currentUser && msg.receiver === selectedChat) || 
         (msg.sender === selectedChat && msg.receiver === currentUser))) ||
      (activeTab === 'group' && msg.receiver === 0)
  );

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      sender: currentUser,
      receiver: activeTab === 'direct' ? selectedChat : 0,
      text: messageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    setMessages([...messages, newMessage]);
    setMessageText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3 } }
  };

  return (
    <motion.div 
      className="h-[calc(100vh-200px)] grid grid-rows-[auto_1fr]"
      initial="initial"
      animate="animate"
      variants={fadeIn}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="direct" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Mensajes directos
          </TabsTrigger>
          <TabsTrigger value="group" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Chat grupal
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid h-full gap-4 grid-cols-1 md:grid-cols-[250px_1fr]">
        {activeTab === 'direct' && (
          <Card className="overflow-hidden">
            <ScrollArea className="h-full">
              <div className="p-2 space-y-1">
                {DEMO_STAFF.filter(staff => staff.id !== currentUser).map(staff => (
                  <Button
                    key={staff.id}
                    variant={selectedChat === staff.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setSelectedChat(staff.id)}
                  >
                    <div className="flex flex-col items-start">
                      <span>{staff.name}</span>
                      <span className="text-xs text-muted-foreground">{staff.role}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </Card>
        )}

        <TabsContent value="direct" className="m-0 h-full">
          <Card className="flex flex-col h-full">
            <CardContent className="flex flex-col flex-grow p-0 overflow-hidden">
              <div className="bg-muted/30 p-3 text-sm font-medium border-b">
                {activeTab === 'direct' 
                  ? `Chat con ${DEMO_STAFF.find(s => s.id === selectedChat)?.name || 'Desconocido'}`
                  : 'Chat grupal del personal'
                }
              </div>
              
              <ScrollArea className="flex-grow px-4 py-4">
                {filteredMessages.map(msg => (
                  <MessageItem
                    key={msg.id}
                    message={msg}
                    isOwnMessage={msg.sender === currentUser}
                  />
                ))}
                {filteredMessages.length === 0 && (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-muted-foreground text-sm">No hay mensajes aún.</p>
                  </div>
                )}
              </ScrollArea>
              
              <div className="p-3 border-t">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Escribe un mensaje..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <Button size="icon" onClick={handleSendMessage} disabled={!messageText.trim()}>
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Enviar mensaje</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="group" className="m-0 h-full">
          <Card className="flex flex-col h-full">
            <CardContent className="flex flex-col flex-grow p-0 overflow-hidden">
              <div className="bg-muted/30 p-3 text-sm font-medium border-b">
                Chat grupal del personal
              </div>
              
              <ScrollArea className="flex-grow px-4 py-4">
                {filteredMessages.map(msg => (
                  <MessageItem
                    key={msg.id}
                    message={msg}
                    isOwnMessage={msg.sender === currentUser}
                  />
                ))}
                {filteredMessages.length === 0 && (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-muted-foreground text-sm">No hay mensajes grupales aún.</p>
                  </div>
                )}
              </ScrollArea>
              
              <div className="p-3 border-t">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Mensaje para todo el equipo..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <Button size="icon" onClick={handleSendMessage} disabled={!messageText.trim()}>
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Enviar mensaje</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </div>
    </motion.div>
  );
};
