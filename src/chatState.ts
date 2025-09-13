import { create } from "zustand";

export interface ChatMessageInterface {
  sender: "user" | "ai";
  text: string;
}

export interface ChatStateInterface {
  history: ChatMessageInterface[];
  addMessage: (msg: ChatMessageInterface) => void;
  clearChat: () => void;
}

export const useChatStore = create<ChatStateInterface>((set) => ({
  history: [
    {
      text: "Hi there! 👋 I'm your AI Fitness Pal! I'm here to help you with workout plans, nutrition advice, form tips, and motivation. What would you like to work on today?",
      sender: "ai",
    },
  ],
  addMessage: (msg) =>
    set((state) => ({ history: [...state.history, msg] })),
  clearChat: () =>
    set(() => ({
      history: [
        {
          text: "Hi there! 👋 I'm your AI Fitness Pal! I'm here to help you with workout plans, nutrition advice, form tips, and motivation. What would you like to work on today?",
          sender: "ai",
        },
      ],
    })),
}));
