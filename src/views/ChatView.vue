<template>
  <n-card title="Naive UI Chat Room" style="height: 600px; display: flex; flex-direction: column">
    <div class="message-list">
      <!-- <MouseFollower /> -->
      <n-scrollbar ref="scrollbarRef" style="height: 100%">
        <div
          v-for="msg in chatStore.messages"
          :key="msg.id"
          class="message-item"
          :class="{ self: msg.self }"
        >
          <!-- 头像 -->
          <template v-if="!msg.self">
            <n-avatar :src="msg.avatar" size="small" />
          </template>

          <!-- 气泡 -->
          <div class="bubble" :class="{ 'self-bubble': msg.self }">{{ msg.content }}</div>

          <!-- 头像（自己右侧） -->
          <template v-if="msg.self">
            <n-avatar :src="msg.avatar" size="small" />
          </template>
        </div>
      </n-scrollbar>
    </div>

    <!-- 输入区 -->
    <div style="display: flex; gap: 8px; padding: 8px 0 0 0">
      <n-input v-model:value="input" placeholder="Type message..." @keyup.enter="send" />
      <n-button type="primary" @click="send">Send</n-button>
    </div>
  </n-card>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { useChatStore } from '@/stores/chat'
import { NCard, NInput, NButton, NAvatar, NScrollbar } from 'naive-ui'
// import MouseFollower from '@/components/MouseFollower.vue'

interface Message {
  avatar: string
  content: string
  self?: boolean // 是否是自己发送的消息
}

const messages = ref<Message[]>([
  {
    avatar: 'https://i.pravatar.cc/40?img=1',
    content: 'Hi, how can I help you today?',
    self: false,
  },
  {
    avatar: 'https://i.pravatar.cc/40?img=3',
    content: "Hey, I'm having trouble with my account.",
    self: true,
  },
  {
    avatar: 'https://i.pravatar.cc/40?img=1',
    content: 'What seems to be the problem?',
    self: false,
  },
])

const input = ref('')
const scrollbarRef = ref<InstanceType<typeof NScrollbar> | null>(null)
const chatStore = useChatStore()
const avatarSelf = 'https://i.pravatar.cc/40?img=3'

chatStore.addMessage = (content: string, self: boolean, avatar: string) => {
  const newMessage = {
    id: Date.now(),
    content,
    self,
    avatar,
  }
  chatStore.messages.push(newMessage)
}

function send() {
  if (!input.value.trim()) return
  chatStore.addMessage(input.value.trim(), true, avatarSelf)
  messages.value.push({
    avatar: avatarSelf,
    content: input.value.trim(),
    self: true,
  })
  input.value = ''
  nextTick(() => {
    scrollbarRef.value?.scrollTo({
      top: 99999,
      behavior: 'smooth',
    })
  })
}
</script>

<style scoped>
.message-list {
  height: 450px;
  flex: 1;
  min-height: 0; /* 关键：防止溢出 */
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.message-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
}

.message-item.self {
  /* flex-direction: row-reverse; */
  justify-content: flex-end;
}

.bubble {
  margin-left: 8px;
  padding: 8px 12px;
  background: #f4f4f4;
  border-radius: 12px;
  max-width: 70%;
  word-break: break-word;
  line-height: 1.4;
}

.bubble.self-bubble {
  /* margin-left: 0; */
  margin-right: 8px;
  background: #3cb371; /* 绿色气泡 */
  color: white;
}

@media (min-width: 1024px) {
  .chat {
    min-height: 50vh;
    display: flex;
    align-items: center;
  }
}
</style>
