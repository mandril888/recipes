<template>
  <q-page class="column">
    <div v-if="loadingRecipeInfo" class="row justify-center q-ma-xl">
      <q-spinner class="flex flex-center" color="primary" size="6em" />
    </div>
    <div v-else>
      <div class="row justify-evenly">
        <!-- <img
          class="dish-img"
          :src="
            recipeInfo.recipe.image
              ? recipeInfo.recipe.image
              : '/src/statics/recipe-image.jpg'
          "
        /> -->
        <img
          v-if="recipeInfo.recipe.image"
          class="dish-img"
          :src="recipeInfo.recipe.image"
        />
        <img v-else class="dish-img" src="../statics/recipe-image.jpg" />
        <div class="column flex-center items-center">
          <h1>{{ recipeInfo.recipe.title }}</h1>
          <RecipeInfoList :recipe="recipeInfo.recipe" />
          <div class="row flex-center items-center">
            <span
              class="tag diet"
              v-for="(diet, index) in recipeInfo.recipe.diets"
              :key="index"
              >{{ diet }}</span
            >
            <span
              class="tag type"
              v-for="(type, index) in recipeInfo.recipe.dishTypes"
              :key="index"
              >{{ type }}</span
            >
            <span
              class="tag cuisine"
              v-for="(cuisine, index) in recipeInfo.recipe.cuisines"
              :key="index"
              >{{ cuisine }}</span
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
        <ol class="instructions">
          <li
            class="q-pb-sm"
            v-for="(text, index) in recipeInfo.recipe.instructions.split('.')"
            :key="index"
            v-show="text.replace(/<[^>]*>?/gm, '')"
          >
            {{ text.replace(/<[^>]*>?/gm, "") }}
          </li>
        </ol>
      </div>

      <div v-if="recipeInfo.recipe.summary">
        <h4>Summary</h4>
        <div
          class="q-mb-lg"
          v-html="
            recipeInfo.recipe.summary
              .split(' This score is')[0]
              .split(' Users who liked')[0]
              .split(' If you like this recipe')[0]
              .split(' Similar recipes include')[0]
              .split(' Similar recipes are')[0]
              .split(' Try')[0]
          "
        ></div>
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
.dish-img {
  width: 100%;

  @media (min-width: 769px) {
    width: 40%;
    height: 250px;
    border-radius: 3px;
    object-fit: cover;
  }
}

.tag {
  color: white;
  padding: 5px 10px;
  margin: 2px 10px;
  border-radius: 20px;
}
.diet {
  background-color: #529dba;
}
.cuisine {
  background-color: #d2d843;
}
.type {
  background-color: #ac81c2;
}
</style>
