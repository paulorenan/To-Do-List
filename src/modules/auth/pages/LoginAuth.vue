<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8" offset-md="2">
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
      </v-col>
    </v-row>
  </v-container>
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
    login () {
      this.ActionDoLogin(this.form).then(res => {
        console.log(res.data)
      })
    },
  }
}
</script>

<style>

</style>