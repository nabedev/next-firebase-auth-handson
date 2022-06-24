import { v4 as uuidv4 } from 'uuid'
import { Db } from 'mongodb'


export const resolvers = {
  Query: {
    user: async (parent, args, context: {db: Db, uid: string}, info) => {
      console.log('user query')
      const user = await context.db
        .collection('users')
        .aggregate([
          { "$match": { "_id": context.uid} },
          { "$unwind": "$todos" },
          { "$match": { "todos.deleted": false }},
          { "$group": {
            "_id": "$_id",
            // "email": "$email",
            "todos": { "$push": { "_id": "$todos._id", "title": "$todos.title", "completed": "$todos.completed" }}
        }}
        ]).toArray()
      return user[0]
    },
  },

  Mutation: {
    updateUser: async (parent, args, context, info) => {
      await context.db.collection('users').updateOne(
        {
          _id: context.uid,
        },
        {
          $set: {
            _id: context.uid,
            email: args.email,
          },
        },
        {
          upsert: true,
        }
      )
      return { _id: args.uid }
    },

    addTodo: async (parent, args, context, info) => {
      const uid = uuidv4()
      await context.db.collection('users').updateOne(
        { _id: context.uid },
        {
          $push: {
            todos: { _id: uid, title: args.title, completed: false, deleted: false },
          },
        },
        { upsert: true }
      )
      return { _id: uid, title: args.title, completed: false }
    },

    deleteTodo: async (parent, args, context, info) => {
      console.log(context.todoId)
      await context.db.collection('users').updateOne(
        {
          _id: context.uid,
          'todos._id': args.todoId
        },
        {
          $set: { "todos.$.deleted" : true }
        }
      )
      return true
    }
  },
}
