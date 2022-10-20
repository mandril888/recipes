<template>
  <q-card class="my-card">
    <q-img :src="recipe.image ? recipe.image : '/src/statics/recipe-image.jpg'">
      <div class="absolute-bottom text-subtitle2 text-center">
        {{ recipe.title }}
      </div>
    </q-img>

    <q-card-actions align="right">
      <q-btn flat color="primary" label="View" :href="recipeUrl" />
      <q-btn flat round color="primary" icon="share" :href="shareUrl" />
      <q-space />
      <q-btn
        flat
        round
        color="primary"
        :icon="recipeSotred ? 'turned_in' : 'turned_in_not'"
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
const recipesIdList = computed(() =>
  $recipesStore.recipes.map((recipe) => recipe.recipe_id)
);
const recipeSotred = computed(() =>
  recipesIdList.value.includes(props.recipe.id)
);
const recipeUrl = window.location.origin + "/#/recipe/" + props.recipe.id;
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