<template>
  <q-tr :props="props" class="custom-hover-row" @click="$emit('row-click', item)">
    <slot :item="item" />
  </q-tr>
</template>

<script setup>
defineProps({
  props: {
    type: Object,
    required: true,
  },
  item: {
    type: Object,
    required: true,
  },
})

defineEmits(['row-click'])
</script>

<style scoped>
.custom-hover-row {
  transition: background-color 0.2s ease, cursor 0.2s ease;
}

.custom-hover-row:hover {
  background-color: rgba(var(--q-primary), 0.08) !important;
  cursor: pointer;
}
</style>
