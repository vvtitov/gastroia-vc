
import React, { useState, useEffect, useRef } from 'react';
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Send, Check, ChevronRight, ChevronLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender_id: string;
  receiver_id: string;
  order_id: string | null;
  read: boolean;
  created_at: string;
  sender_name?: string;
}

interface Contact {
  id: string;
  name: string;
  business_name: string | null;
  last_message?: string;
  last_message_time?: string;
  unread_count: number;
}

const Messages = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [showContactsList, setShowContactsList] = useState(true);
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  // Fetch contacts
  useEffect(() => {
    if (!user) return;
    
    const fetchContacts = async () => {
      try {
        // Get all unique users that the current user has exchanged messages with
        const { data: messagesData, error: messagesError } = await supabase
          .from('messages')
          .select(`
            id,
            sender_id,
            receiver_id,
            content,
            created_at,
            read
          `)
          .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
          .order('created_at', { ascending: false })
          .limit(100);
          
        if (messagesError) throw messagesError;
        
        if (!messagesData || messagesData.length === 0) {
          setIsLoading(false);
          return;
        }
        
        // Extract unique contact IDs
        const uniqueContactIds = new Set<string>();
        messagesData.forEach(msg => {
          const contactId = msg.sender_id === user.id ? msg.receiver_id : msg.sender_id;
          uniqueContactIds.add(contactId);
        });
        
        // Fetch contact details
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('id, name, business_name')
          .in('id', Array.from(uniqueContactIds));
          
        if (profilesError) throw profilesError;
        
        if (!profilesData) {
          setIsLoading(false);
          return;
        }
        
        // Build contacts with last message and unread count
        const contactsMap = new Map<string, Contact>();
        
        profilesData.forEach(profile => {
          contactsMap.set(profile.id, {
            id: profile.id,
            name: profile.name,
            business_name: profile.business_name,
            unread_count: 0
          });
        });
        
        // Add last message and unread count
        messagesData.forEach(msg => {
          const isIncoming = msg.receiver_id === user.id;
          const contactId = isIncoming ? msg.sender_id : msg.receiver_id;
          const contact = contactsMap.get(contactId);
          
          if (contact) {
            // Only set last_message if it's not already set (first one encountered)
            if (!contact.last_message) {
              contact.last_message = msg.content;
              contact.last_message_time = msg.created_at;
            }
            
            // Count unread messages
            if (isIncoming && !msg.read) {
              contact.unread_count += 1;
            }
          }
        });
        
        setContacts(Array.from(contactsMap.values()).sort((a, b) => {
          // Sort by unread count first, then by last message time
          if (a.unread_count !== b.unread_count) return b.unread_count - a.unread_count;
          if (a.last_message_time && b.last_message_time) {
            return new Date(b.last_message_time).getTime() - new Date(a.last_message_time).getTime();
          }
          return 0;
        }));
      } catch (error) {
        console.error('Error fetching contacts:', error);
        toast({
          title: "Error",
          description: "No se pudieron cargar los contactos",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchContacts();
  }, [user, toast]);
  
  // Fetch messages when a contact is selected
  useEffect(() => {
    if (!user || !selectedContact) return;
    
    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase
          .from('messages')
          .select(`
            id,
            content,
            sender_id,
            receiver_id,
            order_id,
            read,
            created_at,
            profiles:sender_id (name)
          `)
          .or(`and(sender_id.eq.${user.id},receiver_id.eq.${selectedContact.id}),and(sender_id.eq.${selectedContact.id},receiver_id.eq.${user.id})`)
          .order('created_at', { ascending: true });
          
        if (error) throw error;
        
        // Format messages
        const formattedMessages = data?.map(msg => ({
          ...msg,
          sender_name: msg.profiles?.name
        })) || [];
        
        setMessages(formattedMessages);
        
        // Mark unread messages as read
        const unreadMessages = formattedMessages.filter(
          msg => msg.receiver_id === user.id && !msg.read
        );
        
        if (unreadMessages.length > 0) {
          const unreadIds = unreadMessages.map(msg => msg.id);
          
          await supabase
            .from('messages')
            .update({ read: true })
            .in('id', unreadIds);
            
          // Update the unread count for this contact
          setContacts(prev => 
            prev.map(c => 
              c.id === selectedContact.id 
                ? { ...c, unread_count: 0 } 
                : c
            )
          );
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
        toast({
          title: "Error",
          description: "No se pudieron cargar los mensajes",
          variant: "destructive",
        });
      }
    };
    
    fetchMessages();
    
    // Subscribe to new messages
    const channel = supabase
      .channel('messages_changes')
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'messages',
          filter: `receiver_id=eq.${user.id}`
        }, 
        payload => {
          const newMsg = payload.new as Message;
          
          // If the message is from the selected contact, add it to the messages
          if (newMsg.sender_id === selectedContact.id) {
            // Fetch the sender name
            supabase
              .from('profiles')
              .select('name')
              .eq('id', newMsg.sender_id)
              .single()
              .then(({ data }) => {
                if (data) {
                  setMessages(prev => [...prev, {
                    ...newMsg,
                    sender_name: data.name
                  }]);
                }
                
                // Mark as read
                supabase
                  .from('messages')
                  .update({ read: true })
                  .eq('id', newMsg.id);
              });
          } else {
            // Update the contacts list with new unread count
            setContacts(prev => 
              prev.map(c => 
                c.id === newMsg.sender_id 
                  ? { 
                      ...c, 
                      unread_count: c.unread_count + 1,
                      last_message: newMsg.content,
                      last_message_time: newMsg.created_at
                    } 
                  : c
              )
            );
          }
        }
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, selectedContact, toast]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = async () => {
    if (!user || !selectedContact || !newMessage.trim()) return;
    
    setIsSending(true);
    
    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          sender_id: user.id,
          receiver_id: selectedContact.id,
          content: newMessage.trim(),
        });
        
      if (error) throw error;
      
      // Optimistically add the message to the UI
      const optimisticMessage: Message = {
        id: Math.random().toString(), // Will be replaced with actual id
        content: newMessage.trim(),
        sender_id: user.id,
        receiver_id: selectedContact.id,
        order_id: null,
        read: false,
        created_at: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, optimisticMessage]);
      setNewMessage('');
      
      // Update the contacts list
      setContacts(prev => 
        prev.map(c => 
          c.id === selectedContact.id 
            ? { 
                ...c, 
                last_message: newMessage.trim(),
                last_message_time: new Date().toISOString()
              } 
            : c
        )
      );
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "No se pudo enviar el mensaje",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };
  
  const formatMessageDate = (date: string) => {
    const messageDate = new Date(date);
    const today = new Date();
    
    if (messageDate.toDateString() === today.toDateString()) {
      return format(messageDate, 'HH:mm');
    } else {
      return format(messageDate, 'dd MMM, HH:mm', { locale: es });
    }
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Mensajes</h1>
        <p className="text-muted-foreground">
          Comunícate con tus clientes y proveedores
        </p>

        <Card className="overflow-hidden">
          <div className="grid md:grid-cols-12 h-[75vh]">
            {/* Contacts sidebar */}
            <div className={cn(
              "bg-muted/30 md:col-span-4 lg:col-span-3 border-r",
              showContactsList ? "block" : "hidden md:block"
            )}>
              <div className="p-3 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Buscar contactos..." 
                    className="pl-10"
                  />
                </div>
              </div>
              
              <ScrollArea className="h-[calc(75vh-57px)]">
                <div className="divide-y">
                  {isLoading ? (
                    <div className="flex justify-center items-center h-32">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gastro"></div>
                    </div>
                  ) : contacts.length === 0 ? (
                    <div className="p-6 text-center text-muted-foreground">
                      No hay conversaciones recientes
                    </div>
                  ) : (
                    contacts.map(contact => (
                      <div 
                        key={contact.id}
                        className={cn(
                          "px-4 py-3 cursor-pointer hover:bg-accent/50 transition-colors",
                          selectedContact?.id === contact.id && "bg-accent"
                        )}
                        onClick={() => {
                          setSelectedContact(contact);
                          setShowContactsList(false);
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1">
                            <Avatar>
                              <AvatarFallback className="bg-primary text-primary-foreground">
                                {contact.name.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium truncate">
                                {contact.business_name || contact.name}
                              </h4>
                              {contact.last_message_time && (
                                <span className="text-xs text-muted-foreground">
                                  {formatMessageDate(contact.last_message_time)}
                                </span>
                              )}
                            </div>
                            {contact.last_message && (
                              <p className="text-sm text-muted-foreground truncate">
                                {contact.last_message}
                              </p>
                            )}
                          </div>
                          {contact.unread_count > 0 && (
                            <div className="flex-shrink-0">
                              <span className="inline-flex items-center justify-center w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full">
                                {contact.unread_count}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </div>
            
            {/* Messages */}
            <div className={cn(
              "flex flex-col md:col-span-8 lg:col-span-9",
              !showContactsList ? "block" : "hidden md:flex"
            )}>
              {selectedContact ? (
                <>
                  {/* Header */}
                  <div className="p-3 border-b flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setShowContactsList(true)}
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </Button>
                      <Avatar>
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {selectedContact.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">
                          {selectedContact.business_name || selectedContact.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                  
                  {/* Messages */}
                  <div ref={messagesContainerRef} className="flex-1 p-4 overflow-y-auto">
                    {messages.length === 0 ? (
                      <div className="h-full flex flex-col justify-center items-center text-center">
                        <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mb-4">
                          <MessageSquare className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="font-medium">Inicia una conversación</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Envía un mensaje para comenzar a chatear
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {messages.map((message, idx) => {
                          const isOutgoing = message.sender_id === user?.id;
                          const showDate = idx === 0 || 
                            new Date(message.created_at).toDateString() !== 
                            new Date(messages[idx - 1].created_at).toDateString();
                            
                          return (
                            <React.Fragment key={message.id}>
                              {showDate && (
                                <div className="flex justify-center my-4">
                                  <div className="bg-muted px-3 py-1 rounded-full text-xs text-center">
                                    {format(new Date(message.created_at), 'd MMMM, yyyy', { locale: es })}
                                  </div>
                                </div>
                              )}
                              <div className={cn(
                                "flex",
                                isOutgoing ? "justify-end" : "justify-start"
                              )}>
                                <div className={cn(
                                  "max-w-[75%] rounded-lg px-4 py-2",
                                  isOutgoing 
                                    ? "bg-primary text-primary-foreground" 
                                    : "bg-accent"
                                )}>
                                  <div className="text-sm">{message.content}</div>
                                  <div className={cn(
                                    "flex items-center gap-1 text-xs mt-1",
                                    isOutgoing 
                                      ? "text-primary-foreground/70"
                                      : "text-muted-foreground"
                                  )}>
                                    {formatMessageDate(message.created_at)}
                                    {isOutgoing && (
                                      <Check className={cn(
                                        "h-3 w-3",
                                        message.read ? "text-blue-400" : ""
                                      )} />
                                    )}
                                  </div>
                                </div>
                              </div>
                            </React.Fragment>
                          );
                        })}
                        <div ref={messageEndRef} />
                      </div>
                    )}
                  </div>
                  
                  {/* Input */}
                  <div className="p-4 border-t">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSendMessage();
                      }}
                      className="flex gap-2"
                    >
                      <Input
                        placeholder="Escribe un mensaje..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1"
                        autoComplete="off"
                      />
                      <Button 
                        type="submit" 
                        size="icon" 
                        disabled={!newMessage.trim() || isSending}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="h-full flex flex-col justify-center items-center text-center p-4">
                  <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <MessageSquare className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-medium">No hay conversación seleccionada</h3>
                  <p className="text-muted-foreground mt-2 max-w-md">
                    Selecciona un contacto para ver sus mensajes o iniciar una nueva conversación
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

export function MessageSquare(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

export default Messages;
