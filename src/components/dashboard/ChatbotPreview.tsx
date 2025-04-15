
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, ChevronRight, MessageCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ChatMessage: React.FC<{ 
  content: string;
  sender: "bot" | "user";
  timestamp: string;
}> = ({ content, sender, timestamp }) => {
  return (
    <div className={cn("flex gap-2 mb-3", 
      sender === "user" ? "flex-row-reverse" : "")}>
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
        sender === "bot" ? "bg-gastro text-white" : "bg-muted"
      )}>
        {sender === "bot" ? <Bot size={16} /> : <User size={16} />}
      </div>
      <div className={cn(
        "rounded-lg p-3 max-w-[80%]",
        sender === "bot" ? "bg-muted" : "bg-gastro text-white"
      )}>
        <p className="text-sm">{content}</p>
        <span className="text-xs opacity-70 mt-1 block text-right">{timestamp}</span>
      </div>
    </div>
  );
};

export const ChatbotPreview: React.FC = () => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <MessageCircle className="h-4 w-4 text-gastro" />
            Chatbot IA
          </CardTitle>
          <Button variant="ghost" size="sm" className="h-8 text-muted-foreground">
            Configurar
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto mb-3 space-y-2">
          <ChatMessage 
            content="Hola, soy GastroBot. ¿En qué puedo ayudarte hoy?" 
            sender="bot" 
            timestamp="12:30 PM"
          />
          <ChatMessage 
            content="¿Puedo ver el menú?" 
            sender="user" 
            timestamp="12:31 PM"
          />
          <ChatMessage 
            content="¡Por supuesto! Aquí tienes nuestro menú, puedes filtrar por platos principales, entrantes o bebidas." 
            sender="bot" 
            timestamp="12:31 PM"
          />
        </div>
      </CardContent>
    </Card>
  );
};
