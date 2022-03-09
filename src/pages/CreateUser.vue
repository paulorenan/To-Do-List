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
                    :rules="nameRules"
                  ></v-text-field>
                  <v-text-field
                    v-model="form.email"
                    label="Email"
                    type="email"
                    prepend-icon="mdi-email"
                    :rules="emailRules"
                  ></v-text-field>
                  <v-text-field
                    v-model="form.password"
                    label="Senha"
                    type="password"
                    prepend-icon="mdi-lock"
                    :rules="passwordRules"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" @click="createUser" :loading="loading">Cadastrar</v-btn>
                <v-spacer/>
                <span>Já possui uma conta? <router-link to="/login">Entrar</router-link></span>
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
        name: '',
        email: '',
        password: '',
      },
      emailRules: [
        v => !!v || 'E-mail é obrigatório',
        v => /.+@.+/.test(v) || 'E-mail inválido',
      ],
      passwordRules: [
        v => !!v || 'Senha é obrigatória',
        v => v.length >= 6 || 'Senha deve ter no mínimo 6 caracteres',
      ],
      nameRules: [
        v => !!v || 'Nome é obrigatório'
      ],
      loading: false,
    }
  },
  methods: {
    ...mapActions('auth', ['ActionCreateUser']),
    async createUser () {
      this.loading = true
      if (this.$refs.form.validate()) {
        try{
          await this.ActionCreateUser(this.form)
        this.$router.push('/')
        }catch(e){
          alert('Email já cadastrado')
        }
      }
      this.loading = false
    },
  }
}
</script>

<style>

</style>