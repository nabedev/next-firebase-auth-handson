export const getUser = async (db, userID) => {
  const user = await db
    .collection('users').findOne({
      _id: userID
    })
    // .aggregate([
    //   { $match: { _id: userID } },
    //   { $unwind: '$todos' },
    //   { $match: { 'todos.deleted': false } },
    //   {
    //     $group: {
    //       _id: '$_id',
    //       todos: {
    //         $push: {
    //           _id: '$todos._id',
    //           title: '$todos.title',
    //           completed: '$todos.completed',
    //           deleted: '$todos.deleted',
    //         },
    //       },
    //     },
    //   },
    // ])
    // .toArray()
  if (user === null) return null
  return {
    _id: user._id,
    todos: user.todos.filter(todo => !todo.deleted)
  }
}
