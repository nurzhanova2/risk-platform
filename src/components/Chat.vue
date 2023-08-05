<template>
  <div class="chat-container">
    <ul class="message-list">
      <li v-for="message in messages" :key="message.id" class="message-item">
        <div class="avatar">
          <i class="fas fa-user"></i> 
        </div>
        <div class="message-text">{{ message.text }}</div>
      </li>
    </ul>
    <form @submit.prevent="sendMessage" class="message-form">
      <input v-model="newMessage" type="text" class="message-input" />
      <button type="submit" class="send-button">
        <i class="fas fa-paper-plane"></i> 
      </button>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("chat", ["messages"]),
  },
  data() {
    return {
      newMessage: "",
    };
  },
  methods: {
    sendMessage() {
      this.$store.dispatch("chat/sendMessage", {
        text: this.newMessage,
        id: Date.now(),
      });
      this.newMessage = "";
    },
  },
};
</script>

<style>
.chat-container {
  max-width: 1600px;
  margin-left: 0;
  padding: 0px;
}

.message-item + .message-item {
  margin-top: 8px;
  border-top: 1px solid #ccc;
  padding-top: 8px;
}

.avatar {
  width: 32px;
  height: 32px;
  margin-right: 8px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #090909;
  color: #fff;
  font-size: 14px;
}

.message-item {
  margin: 8px 0;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  animation: fade-in 0.5s;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.chat-container {
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff; 
}

.send-button {
  margin-left: 8px;
  padding: 8px;
  background-color: #020202;
  color: #fff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;
}

.send-button:hover {
  background-color: #000000;
}

i.fas {
  font-size: 16px;
}

.fa-paper-plane:before {
  content: "\f1d8"; 
}

.fa-user:before {
  content: "\f007"; 
}

.message-text {
  font-size: 16px;
}
</style>
