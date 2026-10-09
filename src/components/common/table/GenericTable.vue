<template>
  <q-table
    :rows="rows"
    :columns="columns"
    :row-key="rowKey"
    :loading="loading"
    flat
    bordered
    v-bind="$attrs"
  >
    <template #body="scope">
      <GenericTableRow :props="scope" :item="scope.row" @row-click="(item) => $emit('row-press', item)">
        <slot name="body-cells" :row="scope.row" :cols="scope.cols" />
      </GenericTableRow>
    </template>

    <template #loading>
      <q-inner-loading showing color="primary" />
    </template>
  </q-table>
</template>

<script setup>
import GenericTableRow from './GenericTableRow.vue'

defineProps({
  rows: {
    type: Array,
    default: () => [],
  },
  columns: {
    type: Array,
    default: () => [],
  },
  rowKey: {
    type: String,
    default: 'id',
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['row-press'])
</script>
