<template>
  <q-card class="my-card">
    <q-img v-if="recipe.image" :src="recipe.image">
      <div
        v-if="recipe.nutrition"
        class="absolute-top-right rounded-borders kcal"
        style="padding: 8px !important"
      >
        {{ Math.round(recipe.nutrition.nutrients[0].amount) }} kcal
      </div>
      <div class="absolute-bottom text-subtitle2 text-center">
        {{ recipe.title }}
      </div>
    </q-img>
    <q-img v-else src="../statics/recipe-image.jpg">
      <div
        v-if="recipe.nutrition"
        class="absolute-top-right rounded-borders kcal"
        style="padding: 8px !important"
      >
        {{ Math.round(recipe.nutrition.nutrients[0].amount) }} kcal
      </div>
      <div class="absolute-bottom text-subtitle2 text-center">
        {{ recipe.title }}
      </div>
    </q-img>

    <q-card-actions align="right">
      <q-btn
        flat
        color="secondary"
        label="View"
        :to="'/recipe/' + props.recipe.id"
      />
      <q-btn flat round color="secondary" icon="share" :href="shareUrl" />
      <q-space />
      <q-btn
        flat
        round
        color="primary"
        :icon="recipesIdListStored ? 'turned_in' : 'turned_in_not'"
        @click="addToDoRecipe"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { computed, ref } from "vue";
import { useQuasar } from "quasar";
import { useUserStore } from "/src/stores/user";
import { useRecipesStore } from "/src/stores/recipes";

const $q = useQuasar();
const $userStore = useUserStore();
const $recipesStore = useRecipesStore();
const recipesIdListStored = computed(() =>
  $recipesStore.recipes
    ?.map((recipe) => recipe.recipe_id)
    .includes(props.recipe.id)
);
const recipeUrl = window.location.origin + "/recipe/" + props.recipe.id;
const shareUrl = `whatsapp://send?text=${recipeUrl}`;

async function addToDoRecipe() {
  if (!$userStore.user) {
    $q.notify({
      color: "red-9",
      textColor: "white",
      icon: "warning",
      message: "You need to be logged 😢",
    });
  } else {
    $recipesStore
      .addToDoRecipe($userStore.user.id, props.recipe)
      .then((data) => {
        $recipesStore.recipes.push({
          id: data[0].id,
          is_complete: false,
          user_id: $userStore.user.id,
          recipe_title: props.recipe.title,
          recipe_id: props.recipe.id,
          recipe_img: props.recipe.image,
        });
        $q.notify({
          color: "primary",
          textColor: "white",
          icon: "maps_ugc",
          message: "Recipe added 😃",
        });
      })
      .catch((err) => {
        $q.notify({
          color: "red-9",
          textColor: "white",
          icon: "warning",
          message: `${err.message} 😢`,
        });
      });
  }
}

const props = defineProps({
  recipe: Object,
});
</script>
