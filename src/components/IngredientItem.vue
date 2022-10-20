<template>
  <div class="row flex-center items-center">
    <img
      :src="
        'https://spoonacular.com/cdn/ingredients_100x100/' + ingredient.image
      "
    />
    <p>{{ ingredient.original }}</p>
  </div>
</template>

<script setup>
defineProps({
  ingredient: Object,
});
</script>

<style scoped lang="scss">
div {
  border: 1px solid #d5d5d5;
  max-width: 200px;
  border-radius: 3px;
  background-color: white;
  text-align: center;
  padding: 8px;
  width: 45%;

  > p {
    margin-bottom: 0;
    display: block;
  }
}
</style>
