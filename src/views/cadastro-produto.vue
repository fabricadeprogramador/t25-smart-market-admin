<template>
  <div>
    <v-text-field :rules="rules" placeholder="Nome"></v-text-field>
    <v-text-field type="number" :rules="rules" placeholder="Preço "></v-text-field>
    <v-text-field :rules="rules" placeholder="Quantidade Mínima "></v-text-field>
    <v-text-field :rules="rules" placeholder="Quantidade Máxima "></v-text-field>

    <v-container fluid>
      <v-row align="center">
        <v-select :setores="setores"  placeholder="Setor">
        </v-select>
      </v-row>
    </v-container>

    <v-container fluid>
      <v-row align="center">
        <v-select placeholder="Quantidade Mínima"></v-select>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  data: () => ({
    rules: [
      value => !!value || "Required.",
      value => (value || "").length <= 20 || "Max 20 characters"
    ],
    setores:['Doces' , 'Frios' , 'Massas']
  })
};
</script>

<style>
</style>