import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set((state) => ({ selectedConversation })),
  messages: [],
  setMessages: (messages) => set((state) => ({ messages })),
}));

export default useConversation;
