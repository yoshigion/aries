<template>
  <div id="todo">
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 5 }" @submit="createTodo">
      <a-form-item label="TODO">
        <span class="ant-form-text"> </span>
      </a-form-item>
      <a-form-item label="Name">
        <a-input v-model="input.name" placeholder="input"></a-input>
      </a-form-item>
      <a-form-item label="Description">
        <a-input v-model="input.description" placeholder="placeholder"></a-input>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 5, offset: 5 }">
        <a-button type="primary" html-type="submit">ADD</a-button>
      </a-form-item>
    </a-form>
    <ul>
      <li v-for="todo in todos" :key="todo.name">
        <span class="todo-wrapper">{{ todo.name }}:{{ todo.description }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import {API, graphqlOperation} from 'aws-amplify'
import * as mutations from '@/graphql/mutations'
import * as queries from '@/graphql/queries'

export default {
  name: 'todo',
    data: function () {
    return {
      input: {
        name: '',
        description: ''
      },
      todos: [],
      formLayout: 'vertical',
      form: this.$form.createForm(this)
    }
  },
  created: async function () {
    await this.listTodos()

  },
  methods: {
    createTodo: async function () {
      if (this.input.name !== '' || this.input.description !== '') {
        await API.graphql(graphqlOperation(mutations.createTodo, {input: this.input}))
         .catch(err => console.error(err))
        await this.listTodos()
      } else {
        console.info('input empty')
      }
    },
    listTodos: async function () {
      const res = await API.graphql(graphqlOperation(queries.listTodos))
        .catch(err => console.error(err))
      this.todos = res.data.listTodos.items
    }
  }
}
</script>

<style scoped>
.todo-wrapper {
  margin: 5px;
  padding: 0;
}
</style>
