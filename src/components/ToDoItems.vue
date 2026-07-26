<template>
    <div class="space-y-3">
        <ToDoItem 
            v-for="todo in $store.state.todos"
            :key="todo.id"
            :todo="todo"
        />
    </div>
</template>

<script>
import ToDoItem from './ToDoItem.vue';
export default {
    components: { ToDoItem }
}
</script>
