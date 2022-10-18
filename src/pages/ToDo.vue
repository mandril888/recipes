<template>
  <q-page class="q-pa-xl bg-grey-2 column">
    <h4 class="q-mt-none">ToDo recipes list</h4>
    <div v-if="toDoRecipes" class="grid-cards">
      <ToDoCard
        v-for="(recipe, index) in toDoRecipes"
        :key="index"
        :recipe="recipe"
      />
    </div>
    <div v-else class="no-recipes absolute-center text-center">
      <q-icon name="check" size="100px" color="primary" />
      <div class="text-h5 text-primary text-center">No recipes ToDo</div>
    </div>
  </q-page>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRecipesStore } from "/src/stores/recipes/";
import ToDoCard from "src/components/ToDoCard.vue";

const $recipesStore = useRecipesStore();
const toDoRecipes = computed(() => {
  return $recipesStore.recipes;
});
</script>

<style scoped>
.grid-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}
.no-recipes {
  opacity: 0.6;
}
</style>
