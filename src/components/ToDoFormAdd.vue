<template>
  <form 
    @submit.stop.prevent="addTodo"
    class="mb-5 flex flex-col gap-3 rounded-lg border border-slate-700 bg-slate-950 p-3 shadow-inner shadow-black/20 sm:flex-row sm:items-center">
    <input
      v-model="title"
      placeholder="Adicione um novo item ..."
      type="text"
      class="min-h-11 flex-1 rounded-md border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
    >

    <button
      class="min-h-11 rounded-md bg-emerald-400 px-5 text-sm font-bold text-slate-950 transition hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-slate-950 active:scale-[0.98]"
      type="submit"
    >
      Adicionar
    </button>
  </form>
</template>

<script>
  export default {
    data() {
      return {
        title: ""
      }
    },

    methods: {
      async addTodo() {
        const title = this.title.trim()

        if (!title) {
          return false;
        }

        try {
          await this.$store.dispatch('addTodo', {
            title,
            completed: false
          })
          this.title = ''
        } catch (error) {
          console.error('Erro ao adicionar tarefa:', error)
        }
      }
    }
  }
</script>
