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
              <v-row class="mx-auto">
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
              <v-row class="mx-auto">
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
import { mapState, mapActions } from 'vuex'

  export default {
    name: 'HomePage',
    computed: {
      ...mapState('auth', ['user']),
      ...mapState('auth', ['tasks'])
    },
    data: () => {
      return {
        drawer: false,
        imagem: '',
        loading: false,
        form: {
          description: '',
        },
        taskRules: [
          v => !!v || 'Tarefa é obrigatória',
        ],
      }
    },
    created () {
      this.getTasks()
      this.verifyImagem()
    },
    methods: {
      ...mapActions('auth', ['ActionGetTasks']),
      ...mapActions('auth', ['ActionSignOut']),
      ...mapActions('auth', ['ActionCreateTask']),
      async getTasks() {
        await this.ActionGetTasks()
      },
      verifyImagem() {
        if (this.user.image === null) {
          this.imagem = 'https://voxnews.com.br/wp-content/uploads/2017/04/unnamed.png'
        } else {
          this.imagem = this.user.imagem
        }
      },
      async logout() {
        await this.ActionSignOut()
        this.$router.push('/login')
      },
      async createTask() {
        if (this.$refs.form.validate()) {
        this.loading = true
        await this.ActionCreateTask(this.form)
        this.$refs.form.reset()
        this.loading = false
        }
      },
    },
    components: {
    },
  }
</script>
