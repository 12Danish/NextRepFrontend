import { Dumbbell, Apple, Zap, Target, Moon } from 'lucide-react';

export default function PopularTopics() {
  const topics = [
    { topic: 'Workout Plans', icon: <Dumbbell size={14} className="text-orange-500" />, count: 156 },
    { topic: 'Nutrition Advice', icon: <Apple size={14} className="text-green-500" />, count: 143 },
    { topic: 'Motivation', icon: <Zap size={14} className="text-yellow-500" />, count: 98 },
    { topic: 'Progress Tracking', icon: <Target size={14} className="text-purple-500" />, count: 87 },
    { topic: 'Sleep & Recovery', icon: <Moon size={14} className="text-blue-500" />, count: 64 }
  ];
  return (
    <div>
      <h3 className="font-semibold text-gray-800 mb-4">Popular Topics</h3>
      <div className="space-y-2">
        {topics.map((item, index) => (
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
  );
} 