<script setup>
import { computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import ToDoEmpty from './components/ToDoEmpty.vue';
import ToDoFormAdd from './components/ToDoFormAdd.vue';
import ToDoItems from './components/ToDoItems.vue';
import ToDoSpinner from './components/ToDoSpinner.vue';

const store = useStore();
const loading = ref(false);
const todos = computed(() => store.state.todos);
const completedTodos = computed(() => todos.value.filter((todo) => todo.completed).length);
const pendingTodos = computed(() => todos.value.length - completedTodos.value);

onMounted(() => {
    loading.value = true
    store.dispatch('getTodos')
        .catch((error) => {
            console.error('Erro ao buscar tarefas:', error)
        })
        .finally(() => {
            loading.value = false
        })
});


</script>

<template>
    <main class="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
        <section class="mx-auto flex w-full max-w-3xl flex-col gap-8">
            <header class="space-y-4 text-center sm:text-left">
                <div class="inline-flex items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase text-emerald-200">
                    Vue 3 + Vuex + JSON Server
                </div>

                <div class="space-y-3">
                    <h1 class="text-3xl font-bold text-white sm:text-5xl">
                        Lista de Tarefas
                    </h1>
                    <p class="max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                        Um gerenciador de tarefas simples, responsivo e integrado com API local para criar, concluir e remover atividades.
                    </p>
                </div>
            </header>

            <div class="overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-2xl shadow-slate-950/40">
                <div class="border-b border-slate-800 bg-slate-900/80 px-4 py-4 sm:px-6">
                    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 class="text-lg font-semibold text-white">
                                Minhas tarefas
                            </h2>
                            <p class="text-sm text-slate-400">
                                Organize sua rotina com persistencia local via JSON Server.
                            </p>
                        </div>

                        <div class="grid grid-cols-3 gap-2 text-center text-xs sm:w-72">
                            <div class="rounded-lg border border-slate-800 bg-slate-950 px-3 py-2">
                                <strong class="block text-base text-white">{{ todos.length }}</strong>
                                <span class="text-slate-400">total</span>
                            </div>
                            <div class="rounded-lg border border-slate-800 bg-slate-950 px-3 py-2">
                                <strong class="block text-base text-amber-300">{{ pendingTodos }}</strong>
                                <span class="text-slate-400">ativas</span>
                            </div>
                            <div class="rounded-lg border border-slate-800 bg-slate-950 px-3 py-2">
                                <strong class="block text-base text-emerald-300">{{ completedTodos }}</strong>
                                <span class="text-slate-400">feitas</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="p-4 sm:p-6">
                    <ToDoSpinner v-if="loading" />

                    <template v-else>
                        <ToDoFormAdd />
                        <ToDoItems v-if="todos.length" />
                        <ToDoEmpty v-else />
                    </template>
                </div>
            </div>
        </section>
    </main>
</template>

<style scoped></style>
