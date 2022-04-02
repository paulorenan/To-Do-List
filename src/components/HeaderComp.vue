<template>
  <v-app-bar
    app
    color="white"
  >
    <v-container class="py-0 fill-height">
      <img 
        :src="user.image ? user.image : imagem"
        alt="Usuario"
        class="mx-auto rounded-circle"
        style="width: 50px; height: 50px;"
        v-img-fallback="imgFallback"
      />
      <span
        class="title"
        style="font-size: 1.5rem; font-weight: bold; margin-left: 20px; margin-right: 10px;"
      >{{ user.name }}</span>
      <router-link to="/profile">
        <v-btn
          text
        >
          Perfil
        </v-btn>
      </router-link>
      <v-spacer></v-spacer>
        <v-btn
        
          icon
          @click="logout"
        >
          Sair
          <v-icon>mdi-logout</v-icon>
        </v-btn>
    </v-container>
  </v-app-bar>
</template>

<script>
import { mapState, mapActions } from 'vuex'

  export default {
    name: 'HeaderComp',
    computed: {
      ...mapState('auth', ['user']),
      ...mapState('auth', ['tasks'])
    },
    data: () => {
      return {
        imagem: '',
        imgFallback: {
          loading: 'https://voxnews.com.br/wp-content/uploads/2017/04/unnamed.png',
          error: 'https://voxnews.com.br/wp-content/uploads/2017/04/unnamed.png'
        }
      }
    },
    created () {
      this.verifyImagem()
    },
    methods: {
      ...mapActions('auth', ['ActionSignOut']),
      async logout() {
        await this.ActionSignOut()
        this.$router.push('/login')
      },
      verifyImagem() {
        if (this.user.image === null) {
          this.imagem = 'https://voxnews.com.br/wp-content/uploads/2017/04/unnamed.png'
        } else {
          this.imagem = this.user.image
        }
      },
      handleError(image) {
        console.log('erro');
        image.onerror = null;
        image.src = 'https://voxnews.com.br/wp-content/uploads/2017/04/unnamed.png'
      }
    },
  }
</script>
