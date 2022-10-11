<template>
  <q-page class="q-pa-xl bg-grey-2 column">
    <h4 class="q-mt-none">ToDo recipes list</h4>
    <div class="grid-cards">
      <ToDoCard
        v-for="(recipe, index) in toDoRecipes"
        :key="index"
        :recipe="recipe"
      />
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "/src/stores/user";
import ToDoCard from "src/components/ToDoCard.vue";

const $userStore = useUserStore();
const toDoRecipes = ref([]);

console.log($userStore.user.id);

$userStore.getRecipes().then((data) => (toDoRecipes.value = data));
</script>

<style scoped>
.grid-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}
</style>
