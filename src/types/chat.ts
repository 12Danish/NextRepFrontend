export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
  type?: 'text' | 'suggestion' | 'achievement';
  suggestions?: string[];
}

export interface ChatStats {
  messagesToday: number;
  responseTime: string;
  streak: string;
}

export interface PopularTopic {
  topic: string;
  icon: React.ReactNode;
  count: number;
}

export interface ProTip {
  title: string;
  description: string;
  bgColor: string;
  textColor: string;
} 