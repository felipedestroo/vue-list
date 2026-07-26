<template>
    <article
      class="rounded-lg border border-slate-800 bg-slate-900 transition hover:border-slate-700 hover:bg-slate-800/70"
      :class="{ 'opacity-75': isCompleted }"
    >
        <div class="flex items-center gap-3 px-3 py-3 sm:px-4">
            <div class="flex items-center justify-center">
                <button 
                  type="button"
                  aria-label="Alternar status da tarefa"
                  class="flex h-9 w-9 items-center justify-center rounded-full border transition focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-slate-900"
                  :class="{
                    'border-emerald-400 bg-emerald-400 text-slate-950': isCompleted,
                    'border-slate-700 bg-slate-950 text-slate-500 hover:border-emerald-400 hover:text-emerald-300': !isCompleted
                  }"
                  @click="onCheckClick"
                >
                    <svg class="h-5 w-5" fill="none" 
                      stroke="currentColor" viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" 
                      stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                </button>
            </div>

            <div class="w-full">
              <input
                  v-model="title"
                  type="text"
                  placeholder="Digite a sua tarefa"
                  readonly
                  :class="{ 'line-through': isCompleted }"
                  class="block w-full appearance-none bg-transparent text-sm font-medium leading-normal text-slate-100 placeholder-slate-500 outline-none sm:text-base"
                  >
            </div>

            <div class="ml-auto flex items-center justify-center">
              <button 
                type="button" 
                aria-label="Excluir tarefa"
                class="flex h-9 w-9 items-center justify-center rounded-md text-slate-500 transition hover:bg-rose-500/10 hover:text-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-2 focus:ring-offset-slate-900"
                @click="onDelete"
              >
                <svg
                    class="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      d="M19 7L18.1327 19.1425C18.0579 
                      20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 
                      19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 
                      3 9 3.44772 9 4V7M4 7H20"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
    </article>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      default: () => ({}),
    }
  },

  data () {
    return {
      title: this.todo.title,
      isCompleted: this.todo.completed,
    }
  },

  methods: {
    onTitleChange() {

      if (!this.title) {
        return
      }

      this.updateTodo()
    },

    updateTodo() {
      const payload = {
        id: this.todo.id,
        data: {
          title: this.title,
          completed: this.isCompleted
        }
      }
      return this.$store.dispatch('updateTodo', payload)
    },

    onCheckClick() {
      this.isCompleted = !this.isCompleted
      this.updateTodo().catch((error) => {
        this.isCompleted = !this.isCompleted
        console.error('Erro ao atualizar tarefa:', error)
      })
    },

    onDelete() {
      this.$store.dispatch('deleteTodo', this.todo.id).catch((error) => {
        console.error('Erro ao excluir tarefa:', error)
      })
    }
  },
}
</script>
