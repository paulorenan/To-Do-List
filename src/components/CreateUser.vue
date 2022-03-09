<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="white"
    >
      <v-container class="py-0 fill-height">
        <img 
          :src="imagem"
          alt="Keep"
          class="mx-auto rounded-circle"
          style="width: 50px; height: 50px;"
        />
        <span
          class="title"
          style="font-size: 1.5rem; font-weight: bold; margin-left: 20px; margin-right: 10px;"
        >{{ user.name }}</span>
        <v-btn
          text
        >
          Perfil
        </v-btn>
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
    <v-main class="grey lighten-1" >
      <v-container class="mt-5">
        <v-row
          class="mx-auto"
          justify="center"
          align="center"
        >
          <v-col>
            <v-sheet
              min-height="80vh"
              rounded="lg"
            >
              <v-row
              align="center"
              justify="center"
              >
                <v-col
                  cols="12"
                  md="8"
                  offset-md="2"
                >
                  <v-form ref="form">
                    <v-text-field
                      v-model="form.description"
                      label="Tarefa"
                      type="text"
                      :rules="taskRules"
                    />
                  </v-form>
                  <v-btn
                    color="primary"
                    @click="createTask"
                    :loading="loading"
                  >
                    Adicionar Tarefa
                  </v-btn>
                </v-col>
              </v-row>
              <v-row
                align="center"
                justify="center"
              >
                <v-col
                  cols="12"
                  md="8"
                  offset-md="2"
                  v-for="task in tasks"
                  :key="task.id"
                >
                  <v-card
                    outlined
                    color="grey lighten-4"
                  >
                    <v-card-title>
                      <span class="headline">{{ task.title }}</span>
                    </v-card-title>
                    <v-card-text>
                      {{ task.description }}
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="primary"
                        @click="editTask(task)"
                      >
                        Editar
                      </v-btn>
                      <v-btn
                        color="error"
                        @click="deleteTask(task)"
                      >
                        Excluir
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
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