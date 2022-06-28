import { Db } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'

export const resolvers = {
  Query: {
    user: async (parent, args, context: { db: Db; userID: string }, info) => {
      console.log('user query')
      const user = await context.db
        .collection('users')
        .aggregate([
          { $match: { _id: context.userID } },
          { $unwind: '$todos' },
          { $match: { 'todos.deleted': false } },
          {
            $group: {
              _id: '$_id',
              todos: {
                $push: {
                  _id: '$todos._id',
                  title: '$todos.title',
                  completed: '$todos.completed',
                },
              },
            },
          },
        ])
        .toArray()
      console.log(user[0])
      return user[0]
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
          },
        },
        {
          upsert: true,
        }
      )
      return { _id: args.uid }
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
      return { _id: todoID, title: args.title, completed: false }
    },

    deleteTodo: async (parent, args, context, info) => {
      console.log(context.todoId)
      await context.db.collection('users').updateOne(
        {
          _id: context.userID,
          'todos._id': args.todoId,
        },
        {
          $set: { 'todos.$.deleted': true },
        }
      )
      return true
    },
    updateTodo: async (parent, args, context, info) => {
      console.log(args)
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
      return true
    },
  },
}
