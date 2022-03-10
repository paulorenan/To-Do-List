<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn color="error" dark v-on="on">
          Excluir Usuário
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Excluir Tarefa</v-card-title>
        <v-card-text style="margin-top:10px; font-size:18px">
          <strong>Tem certeza que deseja excluir seu usuário? Essa ação é irreversível.</strong>
        </v-card-text>
          <v-btn
            color="primary"
            style="margin: 10px; margin-left:22px"
            @click="deleteUser"
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
    data() {
      return {
        dialog: false,
        loading: false,
      };
    },
    methods: {
      ...mapActions("auth", ["ActionDeleteUser"]),
      async deleteUser() {
        this.loading = true;
        try{
        await this.ActionDeleteUser();
        this.$router.push('/login')
        this.dialog = false;
        this.loading = false;
        } catch (err) {
          console.log(err);
        }
      }
    }
  };
</script>