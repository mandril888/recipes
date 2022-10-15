<template>
  <q-card class="my-card">
    <q-img v-if="recipe.recipe_img" :src="recipe.recipe_img">
      <div class="absolute-bottom text-subtitle2 text-center">
        {{ recipe.recipe_title }}
      </div>
    </q-img>
    <img v-else src="../statics/recipe-image.jpg" />

    <q-card-actions align="right">
      <q-btn flat round color="red-9" icon="delete" @click="deleteRecipe" />
      <q-btn
        flat
        round
        color="teal"
        :icon="isDoneRecipe ? 'check_circle' : 'check_circle_outline'"
        @click="doneUndoneTask"
      />
      <q-btn flat round color="primary" icon="share" />
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
const recipePosition = $recipesStore.recipes.findIndex(
  (recipe) => recipe.recipe_id === props.recipe.recipe_id
);
const isDoneRecipe = computed(() => props.recipe.is_complete);

async function deleteRecipe() {
  $q.dialog({
    title: "Confirm",
    message: "Really delete?",
    cancel: true,
    persistent: true,
  }).onOk(() => {
    $recipesStore
      .deleteRecipe($userStore.user.id, props.recipe.recipe_id)
      .then(() => {
        $recipesStore.recipes.splice(recipePosition, 1);
        $q.notify({
          message: "Recipe deleted",
          color: "primary",
        });
      });
  });
}

function doneUndoneTask() {
  console.log(isDoneRecipe.value);
  $recipesStore
    .doneUndoneTask(
      $userStore.user.id,
      props.recipe.recipe_id,
      !props.recipe.is_complete
    )
    .then(() => {
      $recipesStore.recipes[recipePosition].is_complete =
        !props.recipe.is_complete;
    });
}

const props = defineProps({
  recipe: Object,
});
</script>
