const todos = [
  {
    id: 1,
    title: 'Write document',
    completed: false,
  },
  {
    id: 2,
    title: 'Attend weekly meeting',
    completed: true,
  },
]

export const resolvers = {
  Query: {
    todos: () => todos,
  },
}
