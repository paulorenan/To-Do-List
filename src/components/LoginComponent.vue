<template>
  <v-card>
    <v-card-title>
      <span class="headline">Login</span>
    </v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-text-field
          v-model="form.email"
          label="Email"
          type="email"
          prepend-icon="mdi-email"
          :rules="[v => !!v || 'E-mail é obrigatório']"
        ></v-text-field>
        <v-text-field
          v-model="form.password"
          label="Senha"
          type="password"
          prepend-icon="mdi-lock"
          :rules="[v => !!v || 'Senha é obrigatório']"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="login">Entrar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  
  data () {
    return {
      form: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    ...mapActions('auth', ['ActionDoLogin']),
    async login () {
      try{
      await this.ActionDoLogin(this.form)
      this.$router.push('/')
      }catch(e){
        alert(e.data ? e.data.error : 'Erro ao fazer login')
      }
    },
  }

}
</script>

<style>

</style>