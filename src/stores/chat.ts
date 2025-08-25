// stores/chat.ts
import { defineStore } from 'pinia'

interface Message {
  id: number
  content: string
  avatar: string
  self: boolean
}

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: [
      {
        id: 1,
        avatar: 'https://i.pravatar.cc/40?img=1',
        content: 'Hi, how can I help you today?',
        self: false,
      },
      {
        id: 2,
        avatar: 'https://i.pravatar.cc/40?img=3',
        content: "Hey, I'm having trouble with my account.",
        self: true,
      },
      {
        id: 3,
        avatar: 'https://i.pravatar.cc/40?img=1',
        content: 'What seems to be the problem?',
        self: false,
      },
    ] as Message[],
    nextId: 4,
  }),
  actions: {
    addMessage(content: string, self: boolean, avatar: string) {
      this.messages.push({
        id: this.nextId++,
        content,
        avatar,
        self,
      })
    },
    clearMessages() {
      this.messages = []
      this.nextId = 1
    },
  },
  persist: true,
})
