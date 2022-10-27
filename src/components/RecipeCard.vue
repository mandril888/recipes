<template>
  <q-card class="my-card column justify-between" flat bordered>
    <div>
      <q-img :src="recipe.image" />

      <q-card-section>
        <div class="text-overline text-orange-9">
          Cat:
          {{ recipe.cuisines.length ? recipe.cuisines.join(", ") : "Not set" }}
        </div>
        <div class="text-h5 q-mt-sm q-mb-xs">{{ recipe.title }}</div>
        <div class="text-caption text-grey-8">
          <div v-html="recipe.summary.split(' This score is')[0]"></div>
        </div>
      </q-card-section>
    </div>

    <q-card-actions>
      <q-btn flat color="primary" label="View" :href="recipeUrl" />
      <q-btn flat round color="primary" icon="share" :href="shareUrl" />
      <q-btn
        flat
        round
        color="primary"
        :icon="recipesIdListStored ? 'turned_in' : 'turned_in_not'"
        @click="addToDoRecipe"
      />

      <q-space />

      <q-btn
        color="grey"
        round
        flat
        dense
        :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
        @click="expanded = !expanded"
      />
    </q-card-actions>

    <q-slide-transition>
      <div v-show="expanded">
        <q-separator />
        <q-card-section class="text-subitle2">
          <div v-html="recipe.summary.split(' This score is')[0]"></div>
          <div v-html="recipe.instructions"></div>
        </q-card-section>
      </div>
    </q-slide-transition>
  </q-card>
</template>

<script setup>
import { computed, ref } from "vue";
import { useQuasar } from "quasar";
import { useUserStore } from "/src/stores/user";
import { useRecipesStore } from "/src/stores/recipes";
import { supabase } from "../supabase/supabase";

const $userStore = useUserStore();
const $recipesStore = useRecipesStore();
const recipesIdListStored = computed(() =>
  $recipesStore.recipes
    ?.map((recipe) => recipe.recipe_id)
    .includes(props.recipe.id)
);
const $q = useQuasar();
const expanded = ref(false);
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

<style scoped lang="scss">
.my-card {
  .text-subitle2 {
    color: #353535;
  }

  ol {
    padding-left: 22px;
    margin: 0;
  }
}

.text-overline {
  line-height: 20px;
}
</style>
