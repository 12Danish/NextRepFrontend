import React, { useState, useEffect } from "react";
import FitnessPalHero from "../../Components/ui/FitnessPalHero";
import ChatInterface from "../../Components/ui/ChatInterface";
import FitnessPalSidebar from "../../Components/ui/FitnessPalSidebar";
import { useChatStore } from "../../chatState";
import type { ChatMessageInterface } from "../../chatState";
import { getSocket } from "../../socketServices/handleConnectionDisconnection";


const FitnessPal: React.FC = () => {
  const { history, addMessage } = useChatStore();
  const [inputValue, setInputValue] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const socket = getSocket();

  useEffect(() => {
    // Listen for AI responses
    socket.on("aiResponse", (data: { response: string }) => {
      const aiMessage: ChatMessageInterface = {
        text: data.response,
        sender: "ai",
      };

      console.log(aiMessage)
      addMessage(aiMessage);
      setIsTyping(false);
    });

    socket.on("aiError", (data: { error: string }) => {
      const aiMessage: ChatMessageInterface = {
        text: data.error,
        sender: "ai"
      }
      addMessage(aiMessage);
      setIsTyping(false);
    })

    return () => {
      socket.off("aiResponse"); // cleanup listener
      socket.off("aiError")
    };
  }, [socket, addMessage]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessageInterface = {
      text: inputValue,
      sender: "user",
    };

    addMessage(userMessage);
    setInputValue("");
    setIsTyping(true);

    socket.emit("userMessage", { message: userMessage.text });
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  return (
    <div className="flex w-full min-h-screen py-6">
      {/* Main Chat Area */}
      <div className="flex-[10] p-4 lg:p-6">
        <div className="flex flex-col h-full min-h-screen">
          <FitnessPalHero />
          <ChatInterface
            messages={history}
            inputValue={inputValue}
            setInputValue={setInputValue}
            isTyping={isTyping}
            onSendMessage={handleSendMessage}
            onSuggestionClick={handleSuggestionClick}
          />
        </div>
      </div>
    </div>
  );
};

export default FitnessPal;
