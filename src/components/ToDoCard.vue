<template>
  <q-card class="my-card">
    <img :src="image" />

    <q-card-actions align="right">
      <q-btn flat round color="red-9" icon="delete" />
      <q-btn flat round color="teal" icon="check_circle" />
      <!-- <q-btn flat round color="teal" icon="unpublished" /> -->
      <q-btn flat round color="primary" icon="share" />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { ref } from "vue";

const spoonacularUrl = import.meta.env.VITE_SPOONACULAR_URL;
const spoonacularKey = import.meta.env.VITE_SPOONACULAR_KEY;
const recipeInfoUrl = `${spoonacularUrl}${props.recipe.id}/information/?apiKey=${spoonacularKey}`;
let image = ref("");

async function getToDoRecipe() {
  fetch(recipeInfoUrl)
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((data) => (image.value = data.image));
}

getToDoRecipe();

const props = defineProps({
  recipe: Object,
});
</script>
