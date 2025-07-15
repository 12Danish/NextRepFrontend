import React from 'react';
import type { Message } from '../../types/chat';
import ChatStats from './ChatStats';
import PopularTopics from './PopularTopics';
import ProTips from './ProTips';
import AIStatus from './AIStatus';

interface FitnessPalSidebarProps {
  messages: Message[];
}

export default function FitnessPalSidebar({ messages }: FitnessPalSidebarProps) {
  return (
    <div className="space-y-6">
      <ChatStats messages={messages} />
      <PopularTopics />
      <ProTips />
      <AIStatus />
    </div>
  );
} 