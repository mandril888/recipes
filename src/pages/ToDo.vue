<template>
  <q-page class="q-pa-xl bg-grey-2 column">
    <h4 class="q-mt-none">ToDo recipes list</h4>
    <div v-if="toDoRecipes.length">
      <q-select
        label="Filter recipes"
        transition-show="jump-up"
        transition-hide="jump-up"
        rounded
        outlined
        v-model="filterRecipes"
        :options="options"
        style="width: 170px"
        class="todo-select"
      />
      <div class="row flex-center todo-cards">
        <ToDoCard
          v-for="(recipe, index) in toDoRecipes"
          :key="index"
          :recipe="recipe"
          v-show="recipe.is_complete.toString().match(filter)"
        />
      </div>
    </div>
    <div v-else class="no-recipes absolute-center text-center">
      <q-icon name="check" size="100px" color="primary" />
      <div class="text-h5 text-primary text-center">No recipes ToDo</div>
    </div>
  </q-page>
</template>

<script setup>
import { watch, computed, ref } from "vue";
import { useRecipesStore } from "/src/stores/recipes/";
import ToDoCard from "src/components/ToDoCard.vue";

const $recipesStore = useRecipesStore();
const toDoRecipes = computed(() => {
  return $recipesStore.recipes;
});

const options = ["All", "Done", "Todo"];
const filterRecipes = ref(null);
const filter = ref(/true|false/);

watch(filterRecipes, (newFilterRecipes) => {
  if (newFilterRecipes === "All") filter.value = /true|false/;
  else {
    filter.value = newFilterRecipes === "Done" ? true : false;
  }
});
</script>

<style scoped lang="scss">
h4 {
  @media (max-width: 768px) {
    text-align: center;
  }
}
.todo-select {
  margin: -20px auto 20px;

  @media (min-width: 769px) {
    position: absolute;
    top: 65px;
    right: 80px;
  }
}
.todo-cards {
  gap: 20px;
  > div {
    max-width: 225px;
    width: 100%;

    @media (min-width: 769px) {
      max-width: 250px;
    }
  }
}
.no-recipes {
  opacity: 0.6;
}
</style>
