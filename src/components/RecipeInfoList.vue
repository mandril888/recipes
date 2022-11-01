<template>
  <q-list padding class="row flex-center items-center">
    <q-item v-if="recipe.readyInMinutes">
      <q-item-section avatar>
        <q-icon name="access_time_rounded" color="primary" size="3em" />
      </q-item-section>
      <q-item-section class="fw-500">
        {{ recipe.readyInMinutes }} min
      </q-item-section>
    </q-item>

    <q-item v-if="recipe.aggregateLikes">
      <q-item-section avatar>
        <q-icon name="thumb_up_alt_outlined" color="primary" size="3em" />
      </q-item-section>
      <q-item-section class="fw-500">
        {{ recipe.aggregateLikes }}
      </q-item-section>
    </q-item>

    <q-item v-if="recipe.healthScore">
      <q-item-section avatar>
        <q-icon name="favorite_border_outlined" color="primary" size="3em" />
      </q-item-section>
      <q-item-section class="fw-500">
        {{ recipe.healthScore }} / 100
      </q-item-section>
    </q-item>

    <q-item v-if="recipe.servings">
      <q-item-section avatar>
        <q-icon name="people_outline_outlined" color="primary" size="3em" />
      </q-item-section>
      <q-item-section class="fw-500">
        {{ recipe.servings }}
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
defineProps({
  recipe: Object,
});
</script>

<style scoped>
.q-icon {
  display: inline;
}
</style>
