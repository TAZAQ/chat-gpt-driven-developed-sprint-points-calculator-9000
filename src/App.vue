<template>
  <video ref="videoElement" class="background-video" autoplay></video>
  <button 
    @click="toggleCamera"
    class="btn btn-camera camera-toggle"
  >
    <span class="mirror-icon">⚆</span>
    <span class="mirror-text">{{ isCameraEnabled ? 'Выключить' : 'Включить' }} зеркало</span>
  </button>
  <div class="content">
    <h1 class="title">Sprint Points Calculator 9000</h1>
    <div class="sprint-point-calculator">
      <table v-if="rows.length" class="data-table">
        <thead>
        <tr>
          <th>Вид работы</th>
          <th>Модификатор</th>
          <th>Кол-во</th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
        </thead>
        <tbody>
          <table-row
            v-for="(row, index) in rows"
            :key="index"
            :row="row"
            @addRow="addRow"
            @rmRow="rmRow(row)"
            @cloneRow="cloneRow(row)"
          />
        </tbody>
      </table>

      <div class="button-group">
        <button
            v-if="!rows.length"
            @click="addRow"
            class="btn btn-add"
        >
          <span>Добавить строку</span>
        </button>

        <button
            @click="resetRows"
            class="btn btn-reset"
        >
          <span>Сбросить</span>
        </button>
      </div>

      <div class="total-cost">
        <strong>Итого: {{ totalCost }}</strong>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import TableRow from  './components/TableRow.vue'
import {TableRowAPI} from "./api/TableRowAPI.js";

const rows = ref([new TableRowAPI()]);
const videoElement = ref(null);
const isCameraEnabled = ref(false);

const totalCost = computed(() => Math.ceil(
  rows.value.reduce((sum, row) => {
    return sum + row.taskCost * row.modValue * row.count;
  }, 0))
);

async function toggleCamera() {
  if (isCameraEnabled.value) {
    if (videoElement.value && videoElement.value.srcObject) {
      const tracks = videoElement.value.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoElement.value.srcObject = null;
    }
    isCameraEnabled.value = false;
  } else {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoElement.value) {
        videoElement.value.srcObject = stream;
        videoElement.value.style.transform = 'scaleX(-1)';
        isCameraEnabled.value = true;
      }
    } catch (err) {
      console.error('Ошибка доступа к камере:', err);
    }
  }
}

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

<style scoped>
.background-video {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  object-fit: cover;
  opacity: 0.9;
}

.camera-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 100;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid silver;
  backdrop-filter: blur(5px);
}

.mirror-icon {
  font-size: 1.2rem;
  margin-right: 0.5rem;
  transform: scaleX(-1);
}

.mirror-text {
  font-size: 0.9rem;
  font-weight: 500;
}

.content {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
  backdrop-filter: blur(4px);
}

.title {
  font-size: 3rem;
  color: #1a237e;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.data-table {
  width: 100%;
  background-color: white;
  border-radius: 12px;
  border-collapse: separate;
  border-spacing: 0;
  margin-bottom: 2rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.data-table th {
  background-color: #f3f4f6;
  padding: 1.2rem;
  text-align: left;
  font-weight: 600;
  color: #1a237e;
  border-bottom: 2px solid #e5e7eb;
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 0.05em;
}

.button-group {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  justify-content: center;
}

.btn {
  padding: 0.875rem 2rem;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.btn-add {
  background-color: #2e7d32;
  color: white;
}

.btn-add:hover {
  background-color: #1b5e20;
  transform: translateY(-2px);
}

.btn-reset {
  background-color: #d32f2f;
  color: white;
}

.btn-reset:hover {
  background-color: #b71c1c;
  transform: translateY(-2px);
}

.btn-camera {
  color: #1565c0;
  transition: all 0.3s ease;
}

.btn-camera:hover {
  transform: scale(1.05);
  box-shadow: 0 0 15px rgba(21, 101, 192, 0.3);
}

.total-cost {
  text-align: right;
  font-size: 1.75rem;
  color: #1a237e;
  padding: 1.5rem;
  background-color: #f3f4f6;
  border-radius: 12px;
  margin-top: 2rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}
</style>
