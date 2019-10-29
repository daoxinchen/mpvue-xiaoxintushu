<template>
    <div>
        <h1>vuejs is good</h1>
        总有一些不如人意的地方
        <!-- <TodoList></TodoList> -->
    </div>
</template>

<script>
import TodoList from '@/components/Todolist'
export default {
  componetns: {
    TodoList
  }
}
</script>
<style scoped>
h1 {
    color: red;
}
</style>