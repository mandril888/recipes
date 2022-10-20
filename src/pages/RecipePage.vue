<template>
  <q-page class="q-pa-xl bg-grey-2 column">
    <div v-if="loadingRecipeInfo" class="row justify-center q-ma-xl">
      <q-spinner class="flex flex-center" color="primary" size="6em" />
    </div>
    <div v-else>
      <div class="row justify-evenly">
        <img class="dish-img" :src="recipeInfo.recipe.image" />
        <div class="column flex-center items-center">
          <h1>{{ recipeInfo.recipe.title }}</h1>
          <RecipeInfoList :recipe="recipeInfo.recipe" />
          <div class="row flex-center items-center">
            <span
              class="diet"
              v-for="(diet, index) in recipeInfo.recipe.diets"
              :key="index"
              >{{ diet }}</span
            >
          </div>
        </div>
      </div>

      <div v-if="recipeInfo.recipe.extendedIngredients">
        <h4>Ingredients</h4>
        <div class="row flex-center items-stretch gap-20">
          <IngredientItem
            v-for="(ingredient, index) in recipeInfo.recipe.extendedIngredients"
            :key="index"
            :ingredient="ingredient"
          />
        </div>
      </div>

      <div v-if="recipeInfo.recipe.instructions">
        <h4>Instructions</h4>
        <ol>
          <li
            class="q-pb-sm"
            v-for="(text, index) in recipeInfo.recipe.instructions.split('.')"
            :key="index"
          >
            {{ text.replace(/<[^>]*>?/gm, "") }}
          </li>
        </ol>
      </div>

      <div v-if="recipeInfo.recipe.summary">
        <h4>Summary</h4>
        <div class="q-mb-lg" v-html="recipeInfo.recipe.summary"></div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";
import IngredientItem from "/src/components/IngredientItem.vue";
import RecipeInfoList from "/src/components/RecipeInfoList.vue";

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

<style scoped lang="scss">
h1 {
  font-size: 30px;
  line-height: 38px;
  font-weight: 500;
}

h4 {
  margin-bottom: 20px;
  text-align: center;
}

ol {
  padding-left: 20px;

  li {
    &:last-of-type {
      display: none;
    }
  }
}
.dish-img {
  width: 100%;

  @media (min-width: 769px) {
    width: 40%;
    height: 250px;
    border-radius: 3px;
    object-fit: cover;
  }
}

.diet {
  background-color: #529dba;
  color: white;
  padding: 5px 10px;
  margin: 2px 10px;
  border-radius: 20px;
}
</style>
