import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Dumbbell, Apple, Moon, Target, Zap, Clock, Trophy, MessageCircle } from 'lucide-react';
import FitnessPalHero from '../../Components/ui/FitnessPalHero';

// Type definitions
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
  type?: 'text' | 'suggestion' | 'achievement';
  suggestions?: string[];
}

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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
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

    // Here you would integrate with your AI backend
    // Example: await sendToAI(inputValue)
    
    // For now, just clear the typing indicator after a delay
    setTimeout(() => {
      setIsTyping(false);
      // Add your AI response logic here
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

  return (
    <div className="flex w-full min-h-screen py-6">
      {/* Main Chat Area */}
      <div className="flex-[10] p-4 lg:p-6">
        <div className="flex flex-col h-full min-h-screen">
          <FitnessPalHero />

          {/* Chat Messages */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Bot size={20} className="text-orange-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Fitness Pal AI</h3>
                  <p className="text-sm text-green-600 flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Online
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{maxHeight: 'calc(100vh - 300px)'}}>
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start gap-3 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    
                    {/* Avatar */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === 'user' 
                        ? 'bg-orange-500 text-white' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {message.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                    </div>

                    {/* Message Content */}
                    <div className={`${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                      <div className={`rounded-2xl px-4 py-3 ${
                        message.sender === 'user'
                          ? 'bg-orange-500 text-white rounded-br-md'
                          : 'bg-gray-100 text-gray-800 rounded-bl-md'
                      }`}>
                        <p className="text-sm leading-relaxed">{message.text}</p>
                      </div>
                      
                      {/* Timestamp */}
                      <p className="text-xs text-gray-500 mt-1 px-1">
                        {formatTime(message.timestamp)}
                      </p>

                      {/* Suggestions */}
                      {message.suggestions && message.suggestions.length > 0 && (
                        <div className="mt-3 space-y-2">
                          <p className="text-xs text-gray-500 px-1">Quick suggestions:</p>
                          <div className="flex flex-wrap gap-2">
                            {message.suggestions.map((suggestion, index) => (
                              <button
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-xs hover:bg-orange-100 transition-colors border border-orange-200"
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
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
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
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
                    style={{minHeight: '44px', maxHeight: '120px'}}
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="w-11 h-11 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <Send size={18} />
                </button>
              </div>
              
              {/* Quick Actions */}
              <div className="flex gap-2 mt-3 overflow-x-auto">
                <button
                  onClick={() => handleSuggestionClick("Create me a workout plan")}
                  className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap text-sm"
                >
                  <Dumbbell size={14} className="text-orange-500" />
                  Workout Plan
                </button>
                <button
                  onClick={() => handleSuggestionClick("Give me nutrition advice")}
                  className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap text-sm"
                >
                  <Apple size={14} className="text-green-500" />
                  Nutrition
                </button>
                <button
                  onClick={() => handleSuggestionClick("I need motivation")}
                  className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap text-sm"
                >
                  <Zap size={14} className="text-yellow-500" />
                  Motivation
                </button>
                <button
                  onClick={() => handleSuggestionClick("Help me track progress")}
                  className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap text-sm"
                >
                  <Target size={14} className="text-purple-500" />
                  Progress
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="hidden lg:block flex-[3] bg-white border-l border-gray-200 p-6 h-full">
        <div className="space-y-6">
          
          {/* Chat Stats */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Chat Statistics</h3>
            <div className="space-y-3">
              <div className="p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageCircle size={16} className="text-orange-500" />
                    <span className="text-sm font-medium text-orange-700">Messages Today</span>
                  </div>
                  <span className="text-lg font-bold text-orange-600">{messages.length}</span>
                </div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-green-500" />
                    <span className="text-sm font-medium text-green-700">Response Time</span>
                  </div>
                  <span className="text-sm font-bold text-green-600">~1.5s</span>
                </div>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy size={16} className="text-purple-500" />
                    <span className="text-sm font-medium text-purple-700">Streak</span>
                  </div>
                  <span className="text-lg font-bold text-purple-600">7 days</span>
                </div>
              </div>
            </div>
          </div>

          {/* Popular Topics */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Popular Topics</h3>
            <div className="space-y-2">
              {[
                { topic: 'Workout Plans', icon: <Dumbbell size={14} className="text-orange-500" />, count: 156 },
                { topic: 'Nutrition Advice', icon: <Apple size={14} className="text-green-500" />, count: 143 },
                { topic: 'Motivation', icon: <Zap size={14} className="text-yellow-500" />, count: 98 },
                { topic: 'Progress Tracking', icon: <Target size={14} className="text-purple-500" />, count: 87 },
                { topic: 'Sleep & Recovery', icon: <Moon size={14} className="text-blue-500" />, count: 64 }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span className="text-sm text-gray-700">{item.topic}</span>
                  </div>
                  <span className="text-xs text-gray-500">{item.count} chats</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Pro Tips</h3>
            <div className="space-y-3">
              <div className="p-3 bg-cyan-50 rounded-lg">
                <div className="text-sm font-medium text-cyan-700 mb-1">💡 Be Specific</div>
                <div className="text-xs text-cyan-600">
                  Include details like your fitness level, goals, and preferences for better advice.
                </div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="text-sm font-medium text-green-700 mb-1">📊 Track Progress</div>
                <div className="text-xs text-green-600">
                  Ask me to help you create tracking systems for workouts and nutrition.
                </div>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="text-sm font-medium text-purple-700 mb-1">🎯 Set Goals</div>
                <div className="text-xs text-purple-600">
                  Let me help you set SMART fitness goals and create action plans.
                </div>
              </div>
            </div>
          </div>

          {/* AI Status */}
          <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl p-4 text-white">
            <div className="mb-3">
              <div className="text-sm font-medium mb-1">AI Fitness Coach</div>
              <div className="text-xs text-orange-100 mb-4">
                Available 24/7 to help you reach your goals
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Status</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="font-bold text-sm">Online</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Expertise</span>
                <span className="font-bold text-sm">Fitness & Nutrition</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FitnessPal;