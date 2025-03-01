// import React, { useState } from "react";
// import { Send, Bot, User } from "lucide-react";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { ScrollArea } from "@/components/ui/scroll-area";

// interface Message {
//   id: string;
//   content: string;
//   sender: "user" | "bot";
//   timestamp: Date;
// }

// interface ChatbotInterfaceProps {
//   title?: string;
//   initialMessages?: Message[];
//   onSendMessage?: (message: string) => void;
// }

// const ChatbotInterface = ({
//   title = "Financial Assistant",
//   initialMessages = [
//     {
//       id: "1",
//       content:
//         "Hello! I'm your AI financial assistant. How can I help you with your expenditure planning today?",
//       sender: "bot",
//       timestamp: new Date(Date.now() - 60000),
//     },
//   ],
//   onSendMessage = () => {},
// }: ChatbotInterfaceProps) => {
//   const [messages, setMessages] = useState<Message[]>(initialMessages);
//   const [inputValue, setInputValue] = useState("");

//   const handleSendMessage = () => {
//     if (!inputValue.trim()) return;

//     // Add user message
//     const userMessage: Message = {
//       id: Date.now().toString(),
//       content: inputValue,
//       sender: "user",
//       timestamp: new Date(),
//     };

//     setMessages([...messages, userMessage]);
//     onSendMessage(inputValue);
//     setInputValue("");

//     // Simulate bot response
//     setTimeout(() => {
//       const botResponses = [
//         "Based on your spending patterns, I recommend reducing discretionary expenses by 15% to meet your savings goal.",
//         "Your current spending in the 'Dining' category is 30% higher than last month. Would you like some tips to reduce this?",
//         "I've analyzed your expenditure and noticed you could save approximately $120 per month by adjusting your subscription services.",
//         "Looking at your historical data, your utility bills tend to increase during summer. Would you like to set up a special budget for those months?",
//       ];

//       const botMessage: Message = {
//         id: Date.now().toString(),
//         content: botResponses[Math.floor(Math.random() * botResponses.length)],
//         sender: "bot",
//         timestamp: new Date(),
//       };

//       setMessages((prev) => [...prev, botMessage]);
//     }, 1000);
//   };

//   const handleKeyDown = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter") {
//       handleSendMessage();
//     }
//   };

//   return (
//     <Card className="w-full h-full max-w-md mx-auto bg-background border-border">
//       <CardHeader className="border-b">
//         <CardTitle className="flex items-center gap-2">
//           <Bot className="h-5 w-5" />
//           {title}
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="p-0">
//         <ScrollArea className="h-[450px] p-4">
//           <div className="flex flex-col gap-4">
//             {messages.map((message) => (
//               <div
//                 key={message.id}
//                 className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
//               >
//                 <div
//                   className={`flex gap-2 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
//                 >
//                   <Avatar className="h-8 w-8">
//                     {message.sender === "user" ? (
//                       <>
//                         <AvatarImage
//                           src="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
//                           alt="User"
//                         />
//                         <AvatarFallback>
//                           <User className="h-4 w-4" />
//                         </AvatarFallback>
//                       </>
//                     ) : (
//                       <>
//                         <AvatarImage
//                           src="https://api.dicebear.com/7.x/avataaars/svg?seed=bot"
//                           alt="Bot"
//                         />
//                         <AvatarFallback>
//                           <Bot className="h-4 w-4" />
//                         </AvatarFallback>
//                       </>
//                     )}
//                   </Avatar>
//                   <div
//                     className={`rounded-lg p-3 ${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
//                   >
//                     <p className="text-sm">{message.content}</p>
//                     <p className="text-xs opacity-70 mt-1">
//                       {message.timestamp.toLocaleTimeString([], {
//                         hour: "2-digit",
//                         minute: "2-digit",
//                       })}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </ScrollArea>
//       </CardContent>
//       <CardFooter className="border-t p-3">
//         <div className="flex w-full gap-2">
//           <Input
//             placeholder="Ask about your finances..."
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             onKeyDown={handleKeyDown}
//             className="flex-1"
//           />
//           <Button
//             size="icon"
//             onClick={handleSendMessage}
//             disabled={!inputValue.trim()}
//           >
//             <Send className="h-4 w-4" />
//           </Button>
//         </div>
//       </CardFooter>
//     </Card>
//   );
// };

// export default ChatbotInterface;
import React, { useState, useEffect } from "react";
import { Send, Bot, User } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import useChat from "../../hooks/useChat";

interface ChatbotInterfaceProps {
  title?: string;
  conversationId: string;
  userId: string;
}

const ChatbotInterface = ({
  title = "Financial Assistant",
  conversationId,
  userId,
}: ChatbotInterfaceProps) => {
  const { messages, loading, sendMessage } = useChat(conversationId);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    sendMessage(inputValue);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <Card className="w-full h-full max-w-md mx-auto bg-background border-border">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[450px] p-4">
          <div className="flex flex-col gap-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex gap-2 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <Avatar className="h-8 w-8">
                    {message.sender === "user" ? (
                      <>
                        <AvatarImage
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
                          alt="User"
                        />
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </>
                    ) : (
                      <>
                        <AvatarImage
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=bot"
                          alt="Bot"
                        />
                        <AvatarFallback>
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </>
                    )}
                  </Avatar>
                  <div
                    className={`rounded-lg p-3 ${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="border-t p-3">
        <div className="flex w-full gap-2">
          <Input
            placeholder="Ask about your finances..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
            disabled={loading}
          />
          <Button
            size="icon"
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || loading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChatbotInterface;