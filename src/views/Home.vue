<template>
  <div>
    <div class="position-relative">
      <v-card color="basil">
        <v-card-title class="text-center justify-center py-6">
          <h1
            class="font-weight-bold display-1 basil--text"
          >Seja bem vindo(a) ao Smart Market! Sua presença aqui é essencial! Fique à vontade para checar nossas promoções nos links abaixo:</h1>
        </v-card-title>

        <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
          <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item v-for="item in items" :key="item">
            <v-card flat color="basil">
              <v-card-text>{{ text }}</v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </div>

    <v-img
      src="https://image.shutterstock.com/z/stock-photo-drone-delivering-a-package-autonomous-logistics-305478974.jpg"
      aspect-ratio="1"
      class="grey lighten-2"
      max-width="1300"
      max-height="600"
    ></v-img>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: null,
      items: ["Promoção 1", "Promoção 2", "Promoção 3", "Promoção 4"],
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
  }
};
</script>