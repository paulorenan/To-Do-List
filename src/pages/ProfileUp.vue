<template>
  <v-app id="inspire">
    <HeaderComp/>
    <v-main class="grey lighten-1" >
      <v-container class="mt-5">
        <v-row class="mx-auto" justify="center" align="center">
          <v-col>
            <v-sheet min-height="80vh" rounded="lg" justify="center" align="center" >
              <v-row class="mx-auto">
                <v-col cols="12" md="8" offset-md="2" >
                  <img 
                    :src="user.image ? user.image : imagem"
                    alt="Keep"
                    class="mx-auto rounded-circle"
                    style="width: 100px; height: 100px;"
                    v-img-fallback="imgFallback"
                  />
                  <v-form ref="form">
                    <v-text-field
                      v-model="form.name"
                      label="Nome"
                      type="text"
                      :rules="nameRules"
                    />
                    <v-text-field
                      v-model="form.image"
                      label="Imagem"
                      type="text"
                    >
                    </v-text-field>
                  </v-form>
                  <span style="font-size:13px; margin:10px">
                    Criado em {{ new Date(user.createdAt).toLocaleString('pt-BR') }}
                  </span>
                  <span style="font-size:13px; margin:10px">
                    Atualizado em {{ new Date(user.updatedAt).toLocaleString('pt-BR') }}
                  </span>
                  <br/>
                    <div style="display: flex; align-items: center; justify-content: center; margin-top:10px">
                    <v-btn
                      color="primary"
                      @click="updateUser"
                      :loading="loading"
                      class="mr-5"
                    >
                      Atualizar Perfil
                    </v-btn>
                    <PopUpExcluirUser />
                    </div>
                  <br/>
                  <router-link to="/">
                    <v-btn color="primary" class="mt-20" style="margin:30px">
                      Voltar
                    </v-btn>
                  </router-link>
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
import PopUpExcluirUser from '../components/PopUpExcluirUser.vue'

export default {
  name: 'ProfileUp',
  computed: {
    ...mapState('auth', ['user'])
  },
  components: {
    HeaderComp,
    PopUpExcluirUser,
  },
  data: () => {
    return {
      imagem: '',
      loading: false,
      form: {
        name: '',
        image: '',
      },
      imgFallback: {
        loading: 'https://voxnews.com.br/wp-content/uploads/2017/04/unnamed.png',
        error: 'https://voxnews.com.br/wp-content/uploads/2017/04/unnamed.png'
      },
      nameRules: [
        v => !!v || 'Nome é obrigatório',
        v => (v && v.length <= 50) || 'Nome deve ter no máximo 50 caracteres',
      ],
    }
  },
  created () {
    this.verifyImagem()
    this.form.name = this.user.name
    this.form.image = this.user.image
  },
  methods: {
    ...mapActions('auth', ['ActionUpdateUser']),
    verifyImagem() {
      if (this.user.image === null || this.user.image === '') {
        this.imagem = 'https://voxnews.com.br/wp-content/uploads/2017/04/unnamed.png'
      } else {
        this.imagem = this.user.image
      }
    },
    async updateUser() {
      if (this.$refs.form.validate()) {
        this.loading = true
        if (this.form.image.trim() === '') {
          this.form.image = null
        }
        await this.ActionUpdateUser(this.form)
        this.loading = false
      }
    },
  },
}
</script>