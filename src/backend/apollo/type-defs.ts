import { gql } from 'apollo-server-micro'

export const typeDefs = gql`
  type Todo {
    _id: ID!
    title: String!
    completed: Boolean!
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
    updateUser(uid: String, email: String): User
  }
`
