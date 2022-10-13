<template>
  <q-page class="q-pa-xl bg-grey-2 column">
    <h4 class="q-mt-none">Recipes search</h4>
    <h4 class="q-mt-none">Random recipes</h4>
    <div v-if="loadingRandom" class="row justify-center q-ma-xl">
      <q-spinner class="flex flex-center" color="primary" size="6em" />
    </div>
    <div class="grid-cards" v-else>
      <RecipeCard
        v-for="(recipe, index) in randomRecipes.list.recipes"
        :key="index"
        :recipe="recipe"
      />
    </div>
  </q-page>
</template>

<script setup>
import { reactive, ref } from "vue";
import RecipeCard from "../components/RecipeCard.vue";

const loadingRandom = ref(true);
const randomRecipes = reactive({ list: [] });
const spoonacularUrl = import.meta.env.VITE_SPOONACULAR_URL;
const spoonacularKey = import.meta.env.VITE_SPOONACULAR_KEY;
const randomRecipesUrl = `${spoonacularUrl}random/?apiKey=${spoonacularKey}&number=3`;

async function getRandomRecipes() {
  fetch(randomRecipesUrl)
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((data) => {
      loadingRandom.value = false;
      randomRecipes.list = data;
    });
}

// getRandomRecipes();
</script>

<style scoped>
.grid-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}
</style>
