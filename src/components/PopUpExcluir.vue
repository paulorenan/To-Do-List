<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn color="error" dark v-on="on" small>
          Excluir
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Excluir Tarefa</v-card-title>
        <v-card-text style="margin-top:10px; font-size:18px">
          Tem certeza que deseja excluir a tarefa: <strong>{{ task.description }}</strong>?
        </v-card-text>
          <v-btn
            color="primary"
            style="margin: 10px; margin-left:22px"
            @click="deleteTask"
            :loading="loading"
          >
            Excluir
          </v-btn>
          <v-btn
            color="error"
            style="margin: 10px"
            @click="dialog = false"
          >
            Cancelar
          </v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
  export default {
    name: "PopUpExcluir",
    props: {
      task: Object,
    },
    data() {
      return {
        dialog: false,
        loading: false,
      };
    },
    created() {
    },
    methods: {
      ...mapActions("auth", ["ActionDeleteTask"]),
      async deleteTask() {
        this.loading = true;
        try{
        await this.ActionDeleteTask(this.task.id);
        this.dialog = false;
        this.loading = false;
        } catch (err) {
          console.log(err);
        }
      }
    }
  };
</script>