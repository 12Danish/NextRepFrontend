import React, { useState } from 'react';
import FitnessPalHero from '../../Components/ui/FitnessPalHero';
import ChatInterface from '../../Components/ui/ChatInterface';
import FitnessPalSidebar from '../../Components/ui/FitnessPalSidebar';
import type { Message } from '../../types/chat';

const FitnessPal: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! 👋 I'm your AI Fitness Pal! I'm here to help you with workout plans, nutrition advice, form tips, and motivation. What would you like to work on today?",
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString(),
      type: 'text',
      suggestions: ['Create a workout plan', 'Nutrition advice', 'Track my progress', 'Motivate me']
    }
  ]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
      type: 'text'
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      // Add your AI response logic here
    }, 1500);
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
            messages={messages}
            inputValue={inputValue}
            setInputValue={setInputValue}
            isTyping={isTyping}
            onSendMessage={handleSendMessage}
            onSuggestionClick={handleSuggestionClick}
          />
        </div>
      </div>
      {/* Right Sidebar */}
      <div className="hidden lg:block flex-[3] bg-white border-l border-gray-200 p-6 h-full">
        <FitnessPalSidebar messages={messages} />
      </div>
    </div>
  );
};

export default FitnessPal;