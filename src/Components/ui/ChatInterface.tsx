import React, { useRef, useEffect, useState } from 'react';
import { Send, Bot, User, Dumbbell, Apple, Target, Zap } from 'lucide-react';
import type { ChatMessageInterface } from '../../chatState';
import ReactMarkdown from "react-markdown";
interface ChatInterfaceProps {
  messages: ChatMessageInterface[];
  inputValue: string;
  setInputValue: (value: string) => void;
  isTyping: boolean;
  onSendMessage: () => void;
  onSuggestionClick: (suggestion: string) => void;
}

export default function ChatInterface({
  messages,
  inputValue,
  setInputValue,
  isTyping,
  onSendMessage,
  onSuggestionClick
}: ChatInterfaceProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<'coach' | 'automation'>('coach');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

  return (
    <div className="flex-1 bg-white rounded-2xl shadow-sm  flex flex-col justify-between">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <Bot size={20} className="text-orange-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Fitness Pal AI</h3>
              <div className="text-sm text-green-600 flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Online
              </div>
            </div>
          </div>


          <div className="flex items-center gap-2">
            <div className="relative">
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ maxHeight: 'calc(100vh - 300px)' }}>
        {messages.map((message, idx) => (
          <div key={idx} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-start gap-3 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>

              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.sender === 'user'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-600'
                }`}>
                {message.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>

              {/* Message Content */}
              <div className={`${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`rounded-2xl px-4 py-3 ${message.sender === 'user'
                  ? 'bg-orange-500 text-white rounded-br-md'
                  : 'bg-gray-100 text-gray-800 rounded-bl-md'
                  }`}>
                  <p className="text-sm leading-relaxed"><ReactMarkdown>{message.text}</ReactMarkdown></p>
                </div>


              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start gap-3 max-w-[80%]">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <Bot size={16} className="text-gray-600" />
              </div>
              <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-end gap-3">
          <div className="flex-1 relative">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about workouts, nutrition, or anything fitness-related..."
              className="w-full p-3 pr-12 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
              rows={1}
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
          </div>
          <button
            onClick={onSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="w-11 h-11 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <Send size={18} />
          </button>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 mt-3 overflow-x-auto">
          {mode === 'coach' ? (
            // Coach Mode Quick Actions
            <>
              <button
                onClick={() => onSuggestionClick("What's the best exercise for building muscle?")}
                className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap text-sm"
              >
                <Dumbbell size={14} className="text-orange-500" />
                Exercise Tips
              </button>
              <button
                onClick={() => onSuggestionClick("How should I eat for my fitness goals?")}
                className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap text-sm"
              >
                <Apple size={14} className="text-green-500" />
                Nutrition Advice
              </button>
              <button
                onClick={() => onSuggestionClick("I'm struggling with motivation, help me")}
                className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap text-sm"
              >
                <Zap size={14} className="text-yellow-500" />
                Motivation
              </button>
              <button
                onClick={() => onSuggestionClick("How do I track my progress effectively?")}
                className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap text-sm"
              >
                <Target size={14} className="text-purple-500" />
                Progress Tips
              </button>
            </>
          ) : (
            // Automation Mode Quick Actions
            <>
              <button
                onClick={() => onSuggestionClick("Create a 4-week workout plan for me")}
                className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap text-sm"
              >
                <Dumbbell size={14} className="text-orange-500" />
                Generate Workout
              </button>
              <button
                onClick={() => onSuggestionClick("Create a weekly meal plan with recipes")}
                className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap text-sm"
              >
                <Apple size={14} className="text-green-500" />
                Meal Plan
              </button>


            </>
          )}
        </div>
      </div>
    </div>
  );
}