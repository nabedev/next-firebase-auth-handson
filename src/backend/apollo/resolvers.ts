import { Db } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'

import { getUser } from '../mongodb/utils'

export const resolvers = {
  Query: {
    user: async (parent, args, context: { db: Db; userID: string }, info) => {
      const user = await getUser(context.db, context.userID)
      if (user === null) {
        const doc = {
          _id: context.userID,
          todos: []
        }
        await context.db.collection('users').insertOne(doc)
        return doc
      }
      return user
    },
  },

  Mutation: {
    updateUser: async (parent, args, context, info) => {
      await context.db.collection('users').updateOne(
        {
          _id: context.userID,
        },
        {
          $set: {
            _id: context.userID,
            todos: []
          },
        },
        {
          upsert: true,
        }
      )
      return await getUser(context.db, context.userID)
    },

    addTodo: async (parent, args, context, info) => {
      const todoID = uuidv4()
      await context.db.collection('users').updateOne(
        { _id: context.userID },
        {
          $push: {
            todos: {
              _id: todoID,
              title: args.title,
              completed: false,
              deleted: false,
            },
          },
        },
        { upsert: true }
      )
      return await getUser(context.db, context.userID)
    },

    deleteTodo: async (parent, args, context, info) => {
      await context.db.collection('users').updateOne(
        {
          _id: context.userID,
          'todos._id': args.todoId,
        },
        {
          $set: { 'todos.$.deleted': true },
        }
      )
      return await getUser(context.db, context.userID)
    },
    updateTodo: async (parent, args, context, info) => {
      await context.db.collection('users').updateOne(
        {
          _id: context.userID,
          'todos._id': args.todoId,
        },
        {
          $set: {
            'todos.$.completed': args.completed,
            'todos.$.title': args.title,
          },
        }
      )
      return await getUser(context.db, context.userID)
    },
  },
}
