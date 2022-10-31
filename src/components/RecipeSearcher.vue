<template>
  <div class="q-py-md">
    <div class="q-gutter-md">
      AAA: {{ offset }} BBB: {{ offsetWatch }}
      <div>
        <q-toggle
          v-model="advancedSearch"
          checked-icon="check"
          color="primary"
          label="Advanced search"
          unchecked-icon="clear"
          @click="cuisine = type = maxReadyTime = maxCalories = ''"
        />
      </div>

      <Transition>
        <div
          v-show="advancedSearch"
          class="row justify-center q-gutter-md q-mt-none bg-grey-1 q-pb-md rounded-borders"
        >
          <q-select
            clearable
            v-model="cuisine"
            :options="cuisineOptions"
            label="Cuisine options"
            dense
            options-dense
            style="width: 200px"
          />

          <q-select
            clearable
            v-model="type"
            :options="typeOptions"
            label="Meal type"
            dense
            options-dense
            style="width: 200px"
          />

          <q-input
            v-model="maxReadyTime"
            dense
            label="Max time"
            style="width: 200px"
          >
            <template v-slot:append>
              <q-icon
                v-if="maxReadyTime"
                name="cancel"
                @click.stop.prevent="maxReadyTime = null"
                class="cursor-pointer"
              />
            </template>
          </q-input>

          <q-input
            v-model="maxCalories"
            dense
            label="Max calories"
            style="width: 200px"
          >
            <template v-slot:append>
              <q-icon
                v-if="maxCalories"
                name="cancel"
                @click.stop.prevent="maxCalories = null"
                class="cursor-pointer"
              />
            </template>
          </q-input>
        </div>
      </Transition>

      <q-input
        :loading="loadingSearch"
        v-model="search"
        debounce="1000"
        filled
        placeholder="Search a recipe"
      >
        <template v-slot:append>
          <q-icon
            v-if="search"
            name="cancel"
            @click.stop.prevent="search = null"
            class="cursor-pointer"
          />
          <q-btn round dense flat icon="search" @click="searchRecipe" />
        </template>
      </q-input>

      <div style="height: 20px">
        <Transition>
          <q-badge v-if="search && search.length > 2" color="primary"
            >Searched: "{{ search }}"</q-badge
          >
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch, ref, inject, computed } from "vue";

const loadingSearch = ref(false);
const advancedSearch = ref(false);
const search = ref("");
const cuisine = ref("");
const type = ref("");
const maxReadyTime = ref("");
const maxCalories = ref("");
const cuisineOptions = [
  "African",
  "American",
  "British",
  "Cajun",
  "Caribbean",
  "Chinese",
  "Eastern European",
  "European",
  "French",
  "German",
  "Greek",
  "Indian",
  "Irish",
  "Italian",
  "Japanese",
  "Jewish",
  "Korean",
  "Latin American",
  "Mediterranean",
  "Mexican",
  "Middle Eastern",
  "Nordic",
  "Southern",
  "Spanish",
  "Thai",
  "Vietnamese",
];
const typeOptions = [
  "main course",
  "side dish",
  "dessert",
  "appetizer",
  "salad",
  "bread",
  "breakfast",
  "soup",
  "beverage",
  "sauce",
  "marinade",
  "fingerfood",
  "snack",
  "drink",
];
const emit = defineEmits(["searchDone"]);
const offset = inject("offset");
const offsetWatch = computed(() => offset);

const spoonacularUrl = import.meta.env.VITE_SPOONACULAR_URL;
const spoonacularKey = import.meta.env.VITE_SPOONACULAR_KEY;
const queryRecipesUrl = `${spoonacularUrl}recipes/complexSearch/?apiKey=${spoonacularKey}&number=6`;

watch(search, async (newSearch) => {
  if (newSearch && newSearch.length > 2) {
    searchRecipe();
  }
});

watch(offsetWatch.value, async (newOffsetWatch) => {
  searchRecipe();
});

function searchRecipe() {
  loadingSearch.value = true;
  let query = "";

  if (search.value) query += "&query=" + search.value;
  if (cuisine.value) query += "&cuisine=" + cuisine.value;
  if (type.value) query += "&type=" + type.value;
  if (maxReadyTime.value) query += "&maxReadyTime=" + maxReadyTime.value;
  if (maxCalories.value) query += "&maxCalories=" + maxCalories.value;
  if (offset) query += "&offset=" + offset.value;

  const newQuery = queryRecipesUrl + query;

  fetch(newQuery)
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((data) => {
      loadingSearch.value = false;
      emit("searchDone", data);
    });
}
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
