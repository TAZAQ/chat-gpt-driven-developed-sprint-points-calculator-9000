<template>
  <h1>chat-gpt-driven-developed-sprint-point-calculator-9000</h1>
  <div class="sprint-point-calculator">
    <table v-if="rows.length">
      <thead>
      <tr>
        <th>Вид работы</th>
        <th>Модификатор</th>
        <th></th>
        <th></th>
        <th></th>
      </tr>
      </thead>
      <tbody>
        <table-row
          v-for="(row, index) in rows"
          :row="row"
          @addRow="addRow"
          @rmRow="rmRow(row)"
          @cloneRow="cloneRow(row)"
        />
      </tbody>
    </table>

    <button
        v-if="!rows.length"
        @click="addRow"
    >+</button>

    <button
        @click="resetRows"
    >-</button>

    <div>
      <strong>Итого: {{ totalCost }}</strong>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import TableRow from  './components/TableRow.vue'
import {TableRowAPI} from "./api/TableRowAPI.js";

const rows = ref([new TableRowAPI()]);

const totalCost = computed(() => Math.ceil(
  rows.value.reduce((sum, row) => {
    return sum + row.taskCost * row.modValue;
  }, 0))
);

function addRow () {
  rows.value.push(new TableRowAPI());
}

function rmRow (row) {
  rows.value = rows.value.filter(item => item !== row)
}

function resetRows () {
  rows.value = [new TableRowAPI()]
}

/** @param {TableRowAPI} row */
function cloneRow (row) {
  rows.value.splice(
    rows.value.indexOf(row),
    0,
    new TableRowAPI().cloneRow(row)
  );
}
</script>
