<template>
  <v-navigation-drawer v-model="drawer" app :temporary="$vuetify.display.smAndDown">
    <v-list>
      <v-list-item title="Task Manager" />
    </v-list>
  </v-navigation-drawer>

  <v-app-bar app color="primary" dark>
    <v-app-bar-nav-icon @click="drawer = !drawer" />
    <v-toolbar-title>Task Management Dashboard</v-toolbar-title>
    <v-spacer />
    <v-btn icon @click="toggleTheme">
      <v-icon>{{ theme.global.name.value === 'light' ? 'mdi-weather-night' : 'mdi-white-balance-sunny' }}</v-icon>
    </v-btn>
  </v-app-bar>

  <v-main>
    <DashboardPage />
  </v-main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTheme } from 'vuetify'
import DashboardPage from '../pages/DashboardPage.vue'

const drawer = ref(false)
const theme = useTheme()

function toggleTheme() {
  theme.global.name.value = theme.global.name.value === 'light' ? 'dark' : 'light'
}
</script>
