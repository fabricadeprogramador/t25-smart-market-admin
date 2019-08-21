<template>
<div class="ma-12">

<v-form
    class="ma-12"
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <div class="text-center">
       <h1>Cadastro de Clientes</h1>
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
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Senha"
            hint="Use oito ou mais caracteres"
            counter
            @click:append="show1 = !show1"
    ></v-text-field>

    <div
      class='mx-10'
    >
    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
    >
      Salvar
    </v-btn>

    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
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
      show1: false,
        show2: true,
        show3: false,
        show4: false,
        password: 'Password',
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 caracteres',
    },
 }),

    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
}
</script>