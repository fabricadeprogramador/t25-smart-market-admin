<template>
<div class="ma-12">

<v-form
    class="ma-12"
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <div class="text-center">
       <h1>
          Cadastro de Clientes
       </h1>
    </div>

    <v-text-field
      class='mx-10'
      v-model="name"
      :counter="30"
      :rules="nameRules"
      label="Nome"
      required
    ></v-text-field>

    <v-text-field
      class='mx-10'
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>

    <v-text-field
      class='mx-10'
      v-model="password"
      :rules="[rules.required, rules.min]"
      :type="'password'"
      name="input-10-1"
      label="Senha"
      hint="Use oito ou mais caracteres"
      counter
    ></v-text-field>

    <div
      class='mx-10'
    >
    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="cadastrar"
    >
      Salvar
    </v-btn>

    <v-btn
      color="error"
      class="mr-4"
      @click="cancelar"
    >
      Cancelar
    </v-btn>
    </div>

  </v-form>
</div>
</template>
<script>
export default {
 data: () => ({
      valid: true,
      clientes: [],
      name: '',
      nameRules: [
        v => !!v || 'Nome é obrigatório!',
        v => (v && v.length <= 30) || 'Nome deve ter no máximo 30 caracteres!',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail é obrigatório!',
        v => /.+@.+\..+/.test(v) || 'E-mail invalido',
      ],
        password: 'Password',
        rules: {
          required: value => !!value || 'Senha é obrigatório!.',
          min: v => v.length >= 8 || 'Min 8 caracteres',
    },

 }),

    methods: {
      cadastrar () {
        if (this.$refs.form.cadastrar()) {
          alert('Usuário cadastrado com sucesso!')
        }
      },
      cancelar () {
        this.$refs.form.cancelar()
      },
    },
}
</script>