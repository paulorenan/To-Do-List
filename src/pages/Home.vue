<template>
  <v-app id="inspire">
    <HeaderComp/>
    <v-main class="grey lighten-1" >
      <v-container class="mt-5">
        <v-row class="mx-auto" justify="center" align="center">
          <v-col>
            <v-sheet min-height="80vh" rounded="lg" >
              <v-row class="mx-auto">
                <v-col cols="12" md="8" offset-md="2" >
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
                  <v-card outlined color="grey lighten-2" >
                    <v-card-text>
                      {{ task.description }}
                    </v-card-text>
                    <v-card-actions>
                      <span style="font-size:13px ">
                        Criado em {{ new Date(task.createdAt).toLocaleString('pt-BR') }}
                      </span>
                      <v-spacer/>
                      <PopUpEditar :task="task" style="margin-right:10px"/>
                      <PopUpExcluir :task="task"/>
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
import HeaderComp from '../components/HeaderComp.vue'
import PopUpEditar from '../components/PopUpEditar.vue'
import PopUpExcluir from '../components/PopUpExcluir.vue'

  export default {
    name: 'HomePage',
    computed: {
      ...mapState('auth', ['tasks'])
    },
    components: {
      HeaderComp,
      PopUpEditar,
      PopUpExcluir,
    },
    data: () => {
      return {
        loading: false,
        form: {
          description: '',
        },
        taskRules: [
          v => !!v || 'Tarefa é obrigatória',
        ],
        tarefas: [],
      }
    },
    created () {
      this.getTasks()
    },
    methods: {
      ...mapActions('auth', ['ActionGetTasks']),
      ...mapActions('auth', ['ActionSignOut']),
      ...mapActions('auth', ['ActionCreateTask']),
      async getTasks() {
        await this.ActionGetTasks()
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
  }
</script>
