<template>
  <tr>
    <td class="row-task">
      <div>
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
      </div>

      <!-- Настраиваемая задача -->
      <div class="row-task__custom" v-if="row.editable" style="padding-left: 10px">
        <p>
          <label>
            <span class="label__text">Работа:</span>
            <input v-model="row.task">
            <button @click="onSetTask('0::Настраиваемый')">x</button>
          </label>
        </p>
        <p>
          <label>
            <span class="label__text">Цена:</span>
            <input type="number" v-model.number="row.taskCost" min="0">
            <button @click="row.taskCost = 0">x</button>
          </label>
        </p>
      </div>
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
    <td class="row-count">
      <input type="number" min="1" v-model.number="row.count">
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
  return props.row.taskCost * (props.row.modValue || 1) * (props.row.count || 1);
})

function onSetTask(rawValue) {
  const [cost, name] = rawValue.split("::");
  props.row.task = rawValue;
  props.row.taskCost = +cost || 0;
  props.row.editable = name === 'Настраиваемый';
}

function onSetModifier(rawValue) {
  const [value] = rawValue.split("::");
  props.row.modifier = rawValue;
  props.row.modValue = +value || 1;
}
</script>

<style scoped>
tr:nth-child(2n) {
  background-color: #f5f5f5;
}

input[list="task-list"] {
  width: 350px;
}

td {
  padding-right: 15px;
}

td.row-sum {
  width: 40px;
}

td.row-count {
  max-width: 60px;
}

td.row-count > input {
  max-width: 60px;
}

td {
  vertical-align: top;
}

.label__text {
  display: inline-block;
  min-width: 60px;
}
</style>
