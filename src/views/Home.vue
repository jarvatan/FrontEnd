<template>
  <div class="home">
    {{this.$store.state.count}}
    {{this.$store.getters.newCount}}
    <button @click="change">add</button>
    <HelloWorld msg="Welcome to Visit My Website"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  mounted () {
    console.log(this.$store)
  },
  methods: {
    change () {
      this.$store.dispatch('change')
    }
  }
}
</script>
