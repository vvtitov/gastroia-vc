
import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, ChevronRight, MessageSquare, QrCode, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";

const ChatMessage: React.FC<{ 
  content: string;
  sender: "bot" | "user" | "system";
  timestamp: string;
}> = ({ content, sender, timestamp }) => {
  return (
    <div className={cn(
      "flex gap-3 mb-4", 
      sender === "user" ? "flex-row-reverse" : "",
      sender === "system" && "justify-center"
    )}>
      {sender !== "system" && (
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
          sender === "bot" ? "bg-gastro text-white" : "bg-muted"
        )}>
          {sender === "bot" ? <Bot size={16} /> : <User size={16} />}
        </div>
      )}
      <div className={cn(
        "rounded-lg p-3 max-w-[80%]",
        sender === "bot" ? "bg-muted" : 
        sender === "user" ? "bg-gastro text-white" : 
        "bg-muted/50 text-muted-foreground text-sm max-w-full text-center py-2"
      )}>
        <p className={cn("whitespace-pre-wrap", sender === "system" && "text-center")}>{content}</p>
        {sender !== "system" && (
          <span className={cn(
            "text-xs mt-1 block text-right",
            sender === "user" ? "text-white/70" : "text-muted-foreground"
          )}>
            {timestamp}
          </span>
        )}
      </div>
    </div>
  );
};

const QRCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Código QR para mesas</CardTitle>
        <CardDescription>
          Genera códigos QR para cada mesa. Los clientes pueden escanear y acceder al chatbot.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <div className="p-3 border rounded-md w-[200px] h-[200px] flex flex-col items-center justify-center">
          <QrCode className="w-32 h-32" />
          <span className="mt-2 text-sm font-medium">Mesa 01</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Descargar QR</Button>
        <Button>Generar nuevos</Button>
      </CardFooter>
    </Card>
  );
};

const BotSettings: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Configuración del chatbot</CardTitle>
        <CardDescription>
          Personaliza el comportamiento y las respuestas del chatbot para tus clientes.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Nombre del chatbot</label>
          <Input defaultValue="GastroBot" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Mensaje de bienvenida</label>
          <Input defaultValue="¡Hola! Soy GastroBot. ¿En qué puedo ayudarte hoy?" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Tono de las respuestas</label>
          <Tabs defaultValue="friendly">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="formal">Formal</TabsTrigger>
              <TabsTrigger value="friendly">Amigable</TabsTrigger>
              <TabsTrigger value="casual">Casual</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Comportamiento</label>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Respuestas automáticas
            </Button>
            <Button variant="outline" className="justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Sugerencias de productos
            </Button>
            <Button variant="outline" className="justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Gestión de pedidos
            </Button>
            <Button variant="outline" className="justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Personalidad
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Guardar configuración</Button>
      </CardFooter>
    </Card>
  );
};

const ChatHistory: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Historial de chats</CardTitle>
        <CardDescription>
          Conversaciones recientes con clientes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex justify-between items-center p-3 border rounded-md hover:bg-muted/50 cursor-pointer">
            <div>
              <p className="font-medium">Mesa {i}</p>
              <p className="text-sm text-muted-foreground">Hace {i * 5} minutos</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">Ver historial completo</Button>
      </CardFooter>
    </Card>
  );
};

const Chat = () => {
  const [messages, setMessages] = React.useState([
    { content: "Hola, soy GastroBot. ¿En qué puedo ayudarte hoy?", sender: "bot", timestamp: "12:30 PM" },
    { content: "Hola, me gustaría ver el menú", sender: "user", timestamp: "12:31 PM" },
    { content: "¡Por supuesto! Aquí tienes nuestro menú. Puedes filtrar por categorías:", sender: "bot", timestamp: "12:31 PM" },
    { content: "Entrantes\n- Ensalada César: $8.95\n- Nachos con queso: $7.50\n- Alitas de pollo: $9.95\n\nPlatos principales\n- Hamburguesa clásica: $12.95\n- Pizza Margarita: $14.50\n- Tacos de carnitas: $11.95\n\nPostres\n- Tarta de chocolate: $6.50\n- Helado variado: $5.00", sender: "bot", timestamp: "12:32 PM" },
    { content: "¿Qué me recomiendas pedir?", sender: "user", timestamp: "12:33 PM" },
    { content: "Nuestra especialidad es la hamburguesa clásica, que es muy popular entre nuestros clientes. También te recomendaría los tacos de carnitas que están frescos hoy. ¿Te gustaría ordenar alguno de estos platos?", sender: "bot", timestamp: "12:34 PM" },
    { content: "¡El usuario ha realizado un pedido!", sender: "system", timestamp: "" },
    { content: "Gracias por tu pedido. Has ordenado:\n- 1x Hamburguesa clásica\n- 1x Refresco\n\nTu pedido está siendo preparado y estará listo en aproximadamente 15 minutos.", sender: "bot", timestamp: "12:36 PM" },
  ]);

  const [inputValue, setInputValue] = React.useState("");
  const chatEndRef = React.useRef<HTMLDivElement>(null);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    const newUserMessage = {
      content: inputValue,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        content: "Entiendo. ¿Hay algo más en lo que pueda ayudarte?",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Chatbot IA</h1>
        <p className="text-muted-foreground">
          Gestiona y configura el chatbot inteligente para la interacción con tus clientes.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="h-[calc(100vh-220px)]">
              <CardHeader className="pb-3 border-b">
                <CardTitle className="text-base flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-gastro" />
                  Vista previa del chatbot
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 flex flex-col h-[calc(100%-130px)]">
                <div className="flex-1 overflow-y-auto p-4 space-y-1">
                  {messages.map((msg, index) => (
                    <ChatMessage 
                      key={index}
                      content={msg.content} 
                      sender={msg.sender as "bot" | "user" | "system"} 
                      timestamp={msg.timestamp}
                    />
                  ))}
                  <div ref={chatEndRef} />
                </div>
                <div className="border-t p-4 mt-auto">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input 
                      placeholder="Escribe un mensaje..." 
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                    <Button type="submit">Enviar</Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Tabs defaultValue="qr">
              <TabsList className="w-full">
                <TabsTrigger value="qr" className="flex-1">Código QR</TabsTrigger>
                <TabsTrigger value="settings" className="flex-1">Configuración</TabsTrigger>
                <TabsTrigger value="history" className="flex-1">Historial</TabsTrigger>
              </TabsList>
              <TabsContent value="qr" className="mt-4">
                <QRCard />
              </TabsContent>
              <TabsContent value="settings" className="mt-4">
                <BotSettings />
              </TabsContent>
              <TabsContent value="history" className="mt-4">
                <ChatHistory />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Chat;
