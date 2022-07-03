export const getUser = async (db, userID) => {
  const user = await db
    .collection('users')
    .aggregate([
      { $match: { _id: userID } },
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
              deleted: '$todos.deleted',
            },
          },
        },
      },
    ])
    .toArray()
  return user[0]
}
