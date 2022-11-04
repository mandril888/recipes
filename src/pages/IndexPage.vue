<template>
  <q-page class="column">
    <h3 class="q-mt-lg q-mb-xs text-center" id="recipe-searcher">
      Recipes search
    </h3>

    <RecipeSearcher @search-done="setupRecipes" />

    <div v-if="searchedRecipes.list" class="row justify-center cards">
      <TransitionGroup>
        <SimpleRecipeCard
          v-for="(recipe, index) in searchedRecipes.list"
          :key="index"
          :recipe="recipe"
        />
      </TransitionGroup>
    </div>

    <div
      v-if="
        searchedRecipes.totalResults - searchedRecipes.list.length - offset > 0
      "
    >
      <div class="q-mt-lg text-center">
        <q-btn
          color="primary"
          icon-right="refresh"
          label="Load more recipes"
          @click="loadMoreRecipes"
        />
      </div>
    </div>

    <Transition>
      <div v-if="noResults">
        <p class="text-center bg-blue-grey-2 q-pa-sm rounded-borders">
          Recipes not found... Sorry! 😕
        </p>
      </div>
    </Transition>

    <h3 class="text-center" id="random-recipes">Random recipes</h3>

    <div v-if="loadingRandom" class="row justify-center q-ma-xl">
      <q-spinner class="flex flex-center" color="primary" size="6em" />
    </div>

    <div class="row justify-center cards" v-else>
      <RecipeCard
        v-for="(recipe, index) in randomRecipes.list.recipes"
        :key="index"
        :recipe="recipe"
      />
    </div>
    <div class="q-mt-lg text-center">
      <q-btn
        color="primary"
        icon-right="refresh"
        label="Refresh random recipes"
        @click="getandomRecipes"
      />
    </div>

    <div v-if="randomFoodJoke" class="highlight-text q-mt-xl">
      <h3 class="text-center" style="margin: 20px 0">Food Joke</h3>
      <p>{{ randomFoodJoke }}</p>
    </div>
  </q-page>
</template>

<script setup>
import { reactive, ref, provide } from "vue";
import RecipeSearcher from "../components/RecipeSearcher.vue";
import SimpleRecipeCard from "../components/SimpleRecipeCard.vue";
import RecipeCard from "../components/RecipeCard.vue";
import { useRouter } from "vue-router";

const loadingRandom = ref(true);
const randomFoodJoke = ref("");
const noResults = ref(false);
const searchedRecipes = reactive({ list: [], totalResults: 0 });
const randomRecipes = reactive({ list: [] });
const offset = ref(0);

const spoonacularUrl = import.meta.env.VITE_SPOONACULAR_URL;
const spoonacularKey = import.meta.env.VITE_SPOONACULAR_KEY;
const randomFoodJokeUrl = `${spoonacularUrl}food/jokes/random/?apiKey=${spoonacularKey}`;
const randomRecipesUrl = `${spoonacularUrl}recipes/random/?apiKey=${spoonacularKey}&number=3`;

const router = useRouter();
const searchParams = new URLSearchParams(window.location.hash);
if (searchParams.has("type")) {
  if (searchParams.get("type") === "signup") router.push({ name: "auth" });
  if (searchParams.get("type") === "recovery") router.push({ name: "reset" });
}

function setupRecipes(data) {
  noResults.value = !data.results.length ? true : false;
  searchedRecipes.list = data.results;
  searchedRecipes.totalResults = data.totalResults;
  offset.value = data.offset;
}

function loadMoreRecipes() {
  offset.value += 6;

  if (document.getElementById("recipe-searcher"))
    document
      .getElementById("recipe-searcher")
      .scrollIntoView({ behavior: "smooth" });
}

provide("offset", offset);

fetch(randomFoodJokeUrl)
  .then((res) => {
    if (res.ok) return res.json();
  })
  .then((data) => {
    randomFoodJoke.value = data.text;
  });

function getandomRecipes() {
  if (document.getElementById("random-recipes"))
    document
      .getElementById("random-recipes")
      .scrollIntoView({ behavior: "smooth" });

  fetch(randomRecipesUrl)
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((data) => {
      loadingRandom.value = false;
      randomRecipes.list = data;
    });
}
getandomRecipes();
</script>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
