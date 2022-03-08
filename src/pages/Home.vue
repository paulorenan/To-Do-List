<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <!--  -->
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Olá {{user.name}}</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <!--  -->
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

  export default {
    name: 'HomePage',
    computed: {
      ...mapState('auth', ['user']),
    },
    data: () => {
      return {
        drawer: false,
      }
    },
    created () {
      this.getUser()
    },
    methods: {
      getUser () {
      }
    },
    components: {
    },
  }
</script>
