<template>
  <v-app>
      <v-app-bar
        app
        color="primary"
        dark
      >
        <div class="d-flex align-center">
          <h1>ToDo List</h1>
        </div>
      </v-app-bar>
      <v-content>
        <v-container>
          <v-col cols="12" md="8" offset-md="2">
            <v-card>
              <v-card-title>
                <span class="headline">Cadastro</span>
              </v-card-title>
              <v-card-text>
                <v-form ref="form">
                  <v-text-field
                    v-model="form.name"
                    label="Nome"
                    type="text"
                    prepend-icon="mdi-account"
                    :rules="[v => !!v || 'Nome é obrigatório']"
                  ></v-text-field>
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
                <v-btn color="primary" @click="login">Cadastrar</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-container>
      </v-content>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'LoginAuth',
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