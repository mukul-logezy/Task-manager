import { defineStore } from 'pinia'

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [] as any[],
  }),
  actions: {
    loadTasks() {
      const saved = localStorage.getItem('tasks')
      this.tasks = saved ? JSON.parse(saved) : []
    },
    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    },
    addTask(task: any) {
      task.id = Date.now()
      this.tasks.push(task)
      this.saveTasks()
    },
    updateTask(updated: any) {
      const idx = this.tasks.findIndex(t => t.id === updated.id)
      if (idx > -1) this.tasks[idx] = updated
      this.saveTasks()
    },
    deleteTask(id: number) {
      this.tasks = this.tasks.filter(t => t.id !== id)
      this.saveTasks()
    },
    getFilteredTasks(filters: any) {
      return this.tasks.filter(task => {
        const statusMatch = !filters.status || task.status === filters.status
        const priorityMatch = !filters.priority || task.priority === filters.priority
        return statusMatch && priorityMatch
      })
    }
  }
})
