<template>
  <q-page class="q-pa-xl bg-grey-2 column">
    <h4 class="q-mt-none q-mb-xs">Recipes search</h4>

    <RecipeSearcher @search-done="setupRecipes" />

    <Transition>
      <div
        v-if="searchedRecipes.list"
        class="row justify-between simples-cards"
      >
        <SimpleRecipeCard
          v-for="(recipe, index) in searchedRecipes.list"
          :key="index"
          :recipe="recipe"
        />
      </div>
    </Transition>

    <h4>Random recipes</h4>

    <div v-if="loadingRandom" class="row justify-center q-ma-xl">
      <q-spinner class="flex flex-center" color="primary" size="6em" />
    </div>

    <div class="row justify-between random-cards" v-else>
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
import RecipeSearcher from "../components/recipeSearcher.vue";
import SimpleRecipeCard from "../components/SimpleRecipeCard.vue";
import RecipeCard from "../components/RecipeCard.vue";

const loadingRandom = ref(true);
const searchedRecipes = reactive({ list: [] });
const randomRecipes = reactive({ list: [] });

const spoonacularUrl = import.meta.env.VITE_SPOONACULAR_URL;
const spoonacularKey = import.meta.env.VITE_SPOONACULAR_KEY;
const randomRecipesUrl = `${spoonacularUrl}random/?apiKey=${spoonacularKey}&number=3`;

function setupRecipes(data) {
  searchedRecipes.list = data.results;
}

fetch(randomRecipesUrl)
  .then((res) => {
    if (res.ok) return res.json();
  })
  .then((data) => {
    loadingRandom.value = false;
    randomRecipes.list = data;
  });
</script>

<style scoped lang="scss">
.simples-cards,
.random-cards {
  gap: 20px;

  & > div {
    max-width: 30%;
    width: 100%;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
