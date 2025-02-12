<template>
  <tr>
    <td>
      <input
        list="task-list"
        :value="row.task"
        @input="onSetTask($event.target.value)"
      />
      <datalist id="task-list">
        <option
          v-for="task in tasks"
          :key="task.name"
          :value="`${task.cost}::${task.name}`"
        />
      </datalist>
      <button @click="row.resetTask()">x</button>
    </td>
    <td>
      <input
        list="modifier-list"
        :value="row.modifier"
        @input="onSetModifier($event.target.value)"
      />
      <datalist id="modifier-list">
        <option
          v-for="modifier in modifiers"
          :key="modifier.name"
          :value="`${modifier.value}::${modifier.name}`"
        />
      </datalist>
      <button @click="row.resetModifier()">x</button>
    </td>
    <td class="row-sum">
      {{ rowSum }}
    </td>
    <td>
      <button @click="$emit('addRow')">+</button>
    </td>
    <td>
      <button @click="$emit('rmRow')">-</button>
    </td>
    <td>
      <button @click="$emit('cloneRow')">clone</button>
    </td>
  </tr>
</template>

<script setup>
import {TableRowAPI} from "../api/TableRowAPI.js";
import {modifiers} from "../store/modifiers.js";
import {tasks} from "../store/tasks.js";
import {computed} from "vue";

const props = defineProps({
  row: TableRowAPI
})

const rowSum = computed(() => {
  return props.row.taskCost * (props.row.modValue || 1);
})

function onSetTask(rawValue) {
  const [cost] = rawValue.split("::");
  props.row.task = rawValue;
  props.row.taskCost = +cost || 0;
}

function onSetModifier(rawValue) {
  const [value] = rawValue.split("::");
  props.row.modifier = rawValue;
  props.row.modValue = +value || 1;
}
</script>

<style scoped>
input[list="task-list"] {
  width: 350px;
}

td {
  padding-right: 15px;
}

td.row-sum {
  width: 40px;
}
</style>