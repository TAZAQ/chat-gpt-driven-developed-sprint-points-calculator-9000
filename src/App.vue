<script setup>
import { ref, computed } from 'vue';

const tasks = [
  { name: 'Исправление текста (тултип, подпись итп) (10 шт)', cost: 0.5 },
  { name: 'Замена иконок (10 шт)', cost: 0.5 },
  { name: 'Небольшой фикс стилей: выравнивание, цвет итд', cost: 0.5 },
  { name: 'Добавление права доступа (1 право на 1 компонент)', cost: 0.5 },
  { name: 'Заглушки (10шт)', cost: 0.5 },
  { name: 'Создание диалога', cost: 0.5 },
  { name: 'Список под MSelectLazy', cost: 1 },
  { name: 'Реализация адаптера', cost: 1 },
  { name: 'Реализация общения между вкладками без сервера', cost: 1 },
  { name: 'Фильтр для MSiGenerator', cost: 1 },
  { name: 'Прослушка и обработка событий ws', cost: 1 },
  { name: 'Добавление столбца в легаси таблицу (<table>)', cost: 1 },
  { name: 'Старый экспорт в excel/csv', cost: 1 },
  { name: 'Список под MSiGenerator (DataItem-класс, схема) с простейшими фильтрами', cost: 2 },
  { name: 'Вёрстка формы на 10 элементов', cost: 2 },
  { name: 'Экспорт отчёта (адаптер + заголовки)', cost: 2 },
  { name: 'Новая переменная для СЭМД (логика + отображение)', cost: 2 },
  { name: 'Дерево тупое (отображение + обработка клика)', cost: 2 },
  { name: 'Печатная форма отчёта', cost: 2 },
  { name: 'Добавление столбца в отчёт', cost: 2 },
  { name: 'form-show (10 атрибутов)', cost: 2 },
  { name: 'NestedItems', cost: 2 },
  { name: 'Работа с переменными', cost: 2 },
  { name: 'Нарисовать график', cost: 2 },
  { name: 'Реализация entity (model, logic, api)', cost: 3 },
  { name: 'Реализация роутера (рельс-роут, контроллер, файл с именами роутов, список маршрутов для vue-router)', cost: 3 },
  { name: 'Шаблоны фильтров для 1 отчёта', cost: 5 },
  { name: 'Дерево умное (отображение + обработка клика + работа с нодами)', cost: 8 },
  { name: 'Переменную в протокол', cost: 8 },
  { name: 'Просто добавить кнопку', cost: 100 },
];

const modifiers = [
  { name: 'Расписание', value: 1.5 },
  { name: 'Финансы - Счета', value: 4 },
  { name: 'Финансы - Платежи', value: 1 },
  { name: 'Финансы - Расходы', value: 1 },
  { name: 'Финансы - Эквайринг', value: 1 },
  { name: 'Пациенты - Личные данные', value: 1 },
  { name: 'Организации', value: 1.5 },
  { name: 'Медкарта - Услуги', value: 2 },
  { name: 'Медкарта - Планы лечения', value: 2 },
  { name: 'Медкарта - Протоколы', value: 3 },
  { name: 'Медкарта - СЭМД', value: 1 },
  { name: 'Задачи', value: 1.5 },
  { name: 'Маркетинг', value: 2 },
  { name: 'Коммуникации', value: 1.5 },
  { name: 'Результаты - Результаты', value: 1.5 },
  { name: 'Результаты - Заказ-наряды', value: 2 },
  { name: 'Результаты - Лабы', value: 3 },
  { name: 'PRODUCT', value: 2 },
  { name: 'CLIENT_WIDGET', value: 2 },
  { name: 'Написание тестов', value: 1.25 },
];

const rows = ref([{ task: '', modifier: '' }]);

function rmRow (row) {
  rows.value = rows.value.filter(item => item !== row)
}

const totalCost = computed(() => Math.ceil(rows.value.reduce((sum, row) => {
  const task = tasks.find(t => t.name === row.task);
  const modifier = modifiers.find(m => m.name === row.modifier);
  return sum + (task ? task.cost : 0) * (modifier ? modifier.value : 1);
}, 0)));
</script>

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
      <tr v-for="(row, index) in rows" :key="index">
        <td>
          <input list="task-list" v-model="row.task" />
          <datalist id="task-list">
            <option v-for="task in tasks" :key="task.name" :value="task.name">
              {{ task.cost }}: * {{ task.name }}
            </option>
          </datalist>
          <button @click="row.task = ''">x</button>
        </td>
        <td>
          <input list="modifier-list" v-model="row.modifier" />
          <datalist id="modifier-list">
            <option v-for="modifier in modifiers" :key="modifier.name" :value="modifier.name">
              {{ modifier.value }}: * {{ modifier.name }}
            </option>
          </datalist>
          <button @click="row.modifier = ''">x</button>
        </td>
        <td>
          {{ (tasks.find(t => t.name === row.task)?.cost || 0) * (modifiers.find(m => m.name === row.modifier)?.value || 1) }}
        </td>
        <td>
          <button @click="rows.push({ task: '', modifier: '' })">+</button>
        </td>
        <td>
          <button @click="rmRow(row)">-</button>
        </td>
      </tr>
      </tbody>
    </table>
    <button v-if="!rows.length" @click="rows.push({ task: '', modifier: '' })">+</button>


    <div>
      <strong>Итого: {{ totalCost }}</strong>
    </div>
  </div>
</template>

<style scoped>
input[list="task-list"] {
  width: 350px;
}

td {
  padding-right: 15px;
}
</style>
