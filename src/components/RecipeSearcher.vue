<template>
  <div class="q-py-md">
    <div class="q-gutter-md">
      <div style="height: 20px">
        <Transition>
          <q-badge v-if="search" color="primary"
            >Searched: "{{ search }}"</q-badge
          >
        </Transition>
      </div>

      <q-input
        :loading="loadingSearch"
        v-model="search"
        debounce="1000"
        filled
        placeholder="Search a recipe"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
  </div>
</template>

<script setup>
import { watch, ref } from "vue";
import RecipeCard from "../components/RecipeCard.vue";
import RecipeSearcher from "../components/recipeSearcher.vue";

const search = ref("");
const loadingSearch = ref(false);
const emit = defineEmits(["searchDone"]);

const spoonacularUrl = import.meta.env.VITE_SPOONACULAR_URL;
const spoonacularKey = import.meta.env.VITE_SPOONACULAR_KEY;
const queryRecipesUrl = `${spoonacularUrl}complexSearch/?apiKey=${spoonacularKey}&number=6&query=`;

watch(search, async (newSearch, oldSearch) => {
  loadingSearch.value = true;

  if (newSearch.length > 2) {
    fetch(queryRecipesUrl + newSearch)
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((data) => {
        loadingSearch.value = false;
        emit("searchDone", data);
      });
  }
});
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
