import * as React from "react"
import { useQuery, gql } from '@apollo/client'

const TodoList: React.FC = () => {
  const { loading, error, data } = useQuery(gql`query ExampleQuery {
    todos {
      title
    }
  }`)
  console.log({data})

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return <ul>
    {data.todos.map((val, key)=> <li key={key}>{val.title}</li>)}
  </ul>
}

export default TodoList
