<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on" small>
          Editar
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Editar Tarefa</v-card-title>
        <v-form
          class="pa-3"
          v-model="valid"
          ref="form"
          :lazy-validation="true"
        >
          <v-text-field
            v-model="form.description"
            label="Tarefa"
            type="text"
            :rules="taskRules"
          ></v-text-field>
          <span style="font-size:12px">
            Ultima modificação: {{ new Date(task.updatedAt).toLocaleString('pt-BR') }}
          </span>
          <br>
          <v-btn
            color="primary"
            class="mt-3 mr-5"
            @click="updateTask"
            :loading="loading"
          >
            Salvar
          </v-btn>
          <v-btn
            color="error"
            class="mt-3"
            @click="dialog = false"
          >
            Cancelar
          </v-btn>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
  export default {
    name: "PopUpEditar",
    props: {
      task: Object,
    },
    data() {
      return {
        dialog: false,
        form: {
          description: ""
        },
        taskRules: [
          v => !!v || "Tarefa é obrigatória",
          v => v.length <= 255 || "Tarefa deve ter no máximo 255 caracteres"
        ],
        loading: false,
        valid: false
      };
    },
    created() {
      this.form.description = this.task.description;
    },
    methods: {
      ...mapActions("auth", ["ActionUpdateTask"]),
      editTask(task) {
        this.dialog = true;
        this.form.description = task.description;
      },
      async updateTask() {
        this.loading = true;
        this.valid = this.$refs.form.validate();
        if (this.valid) {
          try{
          const send = {
            id: this.task.id,
            description: this.form.description
          };
          await this.ActionUpdateTask(send);
          this.dialog = false;
          this.loading = false;
          } catch (err) {
            console.log(err);
          }
        }
      }
    }
  };
</script>