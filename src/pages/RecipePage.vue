<template>
  <q-page class="q-pa-xl bg-grey-2 column">
    <div v-if="loadingRecipeInfo" class="row justify-center q-ma-xl">
      <q-spinner class="flex flex-center" color="primary" size="6em" />
    </div>
    <div v-else>
      <q-img
        :src="recipeInfo.recipe.image"
        style="max-width: 100%; height: 400px"
        fit="cover"
      >
        <div class="absolute-bottom text-subtitle1 text-center">
          {{ recipeInfo.recipe.title }}
        </div>
      </q-img>
    </div>

    <div class="q-py-lg" v-html="recipeInfo.recipe.summary"></div>

    <div class="q-pb-lg" v-html="recipeInfo.recipe.instructions"></div>
  </q-page>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const loadingRecipeInfo = ref(true);
const recipeInfo = reactive({ recipe: [] });
const spoonacularUrl = import.meta.env.VITE_SPOONACULAR_URL;
const spoonacularKey = import.meta.env.VITE_SPOONACULAR_KEY;
const recipeInfoUrl = `${spoonacularUrl}recipes/${route.params.id}/information?apiKey=${spoonacularKey}`;

fetch(recipeInfoUrl)
  .then((res) => {
    if (res.ok) return res.json();
  })
  .then((data) => {
    console.log(data);
    loadingRecipeInfo.value = false;
    recipeInfo.recipe = data;
  });
</script>
