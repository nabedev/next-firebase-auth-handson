import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Mutation = {
  __typename?: 'Mutation'
  addTodo?: Maybe<User>
  deleteTodo?: Maybe<User>
  updateTodo?: Maybe<User>
  updateUser?: Maybe<User>
}

export type MutationAddTodoArgs = {
  title: Scalars['String']
}

export type MutationDeleteTodoArgs = {
  todoId: Scalars['ID']
}

export type MutationUpdateTodoArgs = {
  completed: Scalars['Boolean']
  title: Scalars['String']
  todoId: Scalars['ID']
}

export type MutationUpdateUserArgs = {
  userID: Scalars['ID']
}

export type Query = {
  __typename?: 'Query'
  user?: Maybe<User>
}

export type Todo = {
  __typename?: 'Todo'
  _id: Scalars['ID']
  completed: Scalars['Boolean']
  deleted: Scalars['Boolean']
  title: Scalars['String']
}

export type User = {
  __typename?: 'User'
  _id: Scalars['ID']
  todos: Array<Todo>
}

export type AddTodoMutationVariables = Exact<{
  title: Scalars['String']
}>

export type AddTodoMutation = {
  __typename?: 'Mutation'
  addTodo?: {
    __typename?: 'User'
    _id: string
    todos: Array<{
      __typename?: 'Todo'
      _id: string
      title: string
      completed: boolean
      deleted: boolean
    }>
  } | null
}

export type DeleteTodoMutationVariables = Exact<{
  todoId: Scalars['ID']
}>

export type DeleteTodoMutation = {
  __typename?: 'Mutation'
  deleteTodo?: {
    __typename?: 'User'
    _id: string
    todos: Array<{
      __typename?: 'Todo'
      _id: string
      title: string
      completed: boolean
      deleted: boolean
    }>
  } | null
}

export type UpdateTodoMutationVariables = Exact<{
  todoId: Scalars['ID']
  title: Scalars['String']
  completed: Scalars['Boolean']
}>

export type UpdateTodoMutation = {
  __typename?: 'Mutation'
  updateTodo?: {
    __typename?: 'User'
    _id: string
    todos: Array<{
      __typename?: 'Todo'
      _id: string
      title: string
      completed: boolean
      deleted: boolean
    }>
  } | null
}

export type UpdateUserMutationVariables = Exact<{
  userID: Scalars['ID']
}>

export type UpdateUserMutation = {
  __typename?: 'Mutation'
  updateUser?: {
    __typename?: 'User'
    _id: string
    todos: Array<{ __typename?: 'Todo'; _id: string; title: string }>
  } | null
}

export type UserQueryVariables = Exact<{ [key: string]: never }>

export type UserQuery = {
  __typename?: 'Query'
  user?: {
    __typename?: 'User'
    _id: string
    todos: Array<{
      __typename?: 'Todo'
      _id: string
      title: string
      completed: boolean
      deleted: boolean
    }>
  } | null
}

export const AddTodoDocument = gql`
  mutation AddTodo($title: String!) {
    addTodo(title: $title) {
      _id
      todos {
        _id
        title
        completed
        deleted
      }
    }
  }
`
export type AddTodoMutationFn = Apollo.MutationFunction<
  AddTodoMutation,
  AddTodoMutationVariables
>

/**
 * __useAddTodoMutation__
 *
 * To run a mutation, you first call `useAddTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTodoMutation, { data, loading, error }] = useAddTodoMutation({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useAddTodoMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddTodoMutation,
    AddTodoMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddTodoMutation, AddTodoMutationVariables>(
    AddTodoDocument,
    options
  )
}
export type AddTodoMutationHookResult = ReturnType<typeof useAddTodoMutation>
export type AddTodoMutationResult = Apollo.MutationResult<AddTodoMutation>
export type AddTodoMutationOptions = Apollo.BaseMutationOptions<
  AddTodoMutation,
  AddTodoMutationVariables
>
export const DeleteTodoDocument = gql`
  mutation DeleteTodo($todoId: ID!) {
    deleteTodo(todoId: $todoId) {
      _id
      todos {
        _id
        title
        completed
        deleted
      }
    }
  }
`
export type DeleteTodoMutationFn = Apollo.MutationFunction<
  DeleteTodoMutation,
  DeleteTodoMutationVariables
>

/**
 * __useDeleteTodoMutation__
 *
 * To run a mutation, you first call `useDeleteTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTodoMutation, { data, loading, error }] = useDeleteTodoMutation({
 *   variables: {
 *      todoId: // value for 'todoId'
 *   },
 * });
 */
export function useDeleteTodoMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteTodoMutation,
    DeleteTodoMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteTodoMutation, DeleteTodoMutationVariables>(
    DeleteTodoDocument,
    options
  )
}
export type DeleteTodoMutationHookResult = ReturnType<
  typeof useDeleteTodoMutation
>
export type DeleteTodoMutationResult = Apollo.MutationResult<DeleteTodoMutation>
export type DeleteTodoMutationOptions = Apollo.BaseMutationOptions<
  DeleteTodoMutation,
  DeleteTodoMutationVariables
>
export const UpdateTodoDocument = gql`
  mutation UpdateTodo($todoId: ID!, $title: String!, $completed: Boolean!) {
    updateTodo(todoId: $todoId, title: $title, completed: $completed) {
      _id
      todos {
        _id
        title
        completed
        deleted
      }
    }
  }
`
export type UpdateTodoMutationFn = Apollo.MutationFunction<
  UpdateTodoMutation,
  UpdateTodoMutationVariables
>

/**
 * __useUpdateTodoMutation__
 *
 * To run a mutation, you first call `useUpdateTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTodoMutation, { data, loading, error }] = useUpdateTodoMutation({
 *   variables: {
 *      todoId: // value for 'todoId'
 *      title: // value for 'title'
 *      completed: // value for 'completed'
 *   },
 * });
 */
export function useUpdateTodoMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateTodoMutation,
    UpdateTodoMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateTodoMutation, UpdateTodoMutationVariables>(
    UpdateTodoDocument,
    options
  )
}
export type UpdateTodoMutationHookResult = ReturnType<
  typeof useUpdateTodoMutation
>
export type UpdateTodoMutationResult = Apollo.MutationResult<UpdateTodoMutation>
export type UpdateTodoMutationOptions = Apollo.BaseMutationOptions<
  UpdateTodoMutation,
  UpdateTodoMutationVariables
>
export const UpdateUserDocument = gql`
  mutation UpdateUser($userID: ID!) {
    updateUser(userID: $userID) {
      _id
      todos {
        _id
        title
      }
    }
  }
`
export type UpdateUserMutationFn = Apollo.MutationFunction<
  UpdateUserMutation,
  UpdateUserMutationVariables
>

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      userID: // value for 'userID'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument,
    options
  )
}
export type UpdateUserMutationHookResult = ReturnType<
  typeof useUpdateUserMutation
>
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserMutation,
  UpdateUserMutationVariables
>
export const UserDocument = gql`
  query User {
    user {
      _id
      todos {
        _id
        title
        completed
        deleted
      }
    }
  }
`

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserQuery(
  baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options)
}
export function useUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(
    UserDocument,
    options
  )
}
export type UserQueryHookResult = ReturnType<typeof useUserQuery>
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>
