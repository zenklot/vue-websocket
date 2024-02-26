<script setup lang="ts">
import { ref, reactive } from 'vue';

const username = ref()
const connect = ref()
const messages = reactive<any>([])
const pesan = ref()
const ipConnect = ref()

let socket: WebSocket = {} as WebSocket
const handleConnect = () => {
  if (username.value.length > 0) {
    connect.value = true
  }
}

const handleKoneksi = () => {
  if (ipConnect.value) {
    socket = new WebSocket(`wss://${ipConnect.value}:3000`)
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      messages.push(message);
    }
  } else {
    handleDiskonek()
  }
}

const handleDiskonek = () => {
  socket.close()
}

const sendMessage = () => {
  const messageData = { username: username.value, message: pesan.value };
  // Send the message data to the server using WebSockets
  socket.send(JSON.stringify(messageData))
  // Add the message data to the messages array
  messages.push(messageData)
}


</script>

<template>
  <div>
    <div class="locale-changer">
      <select v-model="$i18n.locale">
        <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">{{ locale }}</option>
      </select>
    </div>
    <div v-for="message in messages">
      <p><span>{{ message.username }}</span> - {{ message.message }}</p>
    </div>
    <hr />
    <br />
    <input :placeholder="$t('placeholder_app.ip')" v-model="ipConnect" />
    <button @click.prevent="handleKoneksi">{{ $t('connect') }}</button>
    <br />
    <input type="text" v-model="username" :placeholder="$t('placeholder_app.username')" />
    <button @click.prevent="handleConnect">{{ $t('set_name') }}</button>
    <br />
    <input type="text" v-model="pesan" :placeholder="$t('placeholder_app.message')" />
    <button @click="sendMessage">{{ $t('send') }}</button>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
