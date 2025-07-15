import { MessageCircle, Clock, Trophy } from 'lucide-react';
import type { Message } from '../../types/chat';

interface ChatStatsProps {
  messages: Message[];
}

export default function ChatStats({ messages }: ChatStatsProps) {
  return (
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
  );
} 