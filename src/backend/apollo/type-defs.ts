import { gql } from 'apollo-server-micro'

export const typeDefs = gql`
  type Todo {
    _id: ID!
    title: String!
    completed: Boolean!
    deleted: Boolean!
  }

  type User {
    _id: ID!
    email: String!
    todos: [Todo]
  }

  type Query {
    user: User
  }

  type Mutation {
    addTodo(title: String!): Todo
    deleteTodo(todoId: String!): Boolean
    updateTodo(todoId: String!, title: String!, completed: Boolean!): Boolean
    updateUser(uid: String, email: String): User
  }
`
