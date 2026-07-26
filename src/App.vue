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
  <!-- Content -->
    <div class="px-3 py-10 md:px-10">
        <div class="w-full sm:w-1/2 lg:w-1/3 mx-auto">

            <!-- Todo spinner -->
            <ToDoSpinner v-if="loading" />
            <!--/ Todo spinner -->

            <template v-else>
                <!-- Todo form -->
                <ToDoFormAdd />
                <!--/ Todo form -->

                <!-- Todo items -->
                <ToDoItems v-if="todos.length" />
                <!--/ Todo items -->

                <!-- Todo empty -->
                <ToDoEmpty v-else />
                <!--/ Todo empty -->
            </template>
        </div>
    </div>
    <!--/ Content --> 
</template>

<style scoped></style>
