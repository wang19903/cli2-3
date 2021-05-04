<template>
  <div class="message-alert">
    <div
      v-for="(item, i) in messages"
      :key="i"
      :class="'alert-' + item.status"
      class="alert alert-dismissible"
    >
      {{ item.message }}
      <button
        type="button"
        class="close"
        aria-label="Close"
        @click="removeMessage(i)"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Alert',
  computed: {
    ...mapGetters(['messages'])
  },
  created () {},
  methods: {
    updateMessage (message, status) {
      this.$store.dispatch('updateMessage', { message, status })
    },
    removeMessage (num) {
      this.$store.dispatch('removeMessage', num)
    },
    removeMessageWithTiming (timestamp) {
      this.$store.dispatch('removeMessageWithTiming', timestamp)
    }
  }
}
</script>

<style scope>
.message-alert {
  position: fixed;
  max-width: 50%;
  top: 56px;
  right: 20px;
  z-index: 1100;
}
</style>
