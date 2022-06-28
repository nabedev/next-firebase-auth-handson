import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  addTodo?: Maybe<Todo>;
  deleteTodo?: Maybe<Scalars['Boolean']>;
  updateTodo?: Maybe<Scalars['Boolean']>;
  updateUser?: Maybe<User>;
};


export type MutationAddTodoArgs = {
  title: Scalars['String'];
};


export type MutationDeleteTodoArgs = {
  todoId: Scalars['String'];
};


export type MutationUpdateTodoArgs = {
  completed: Scalars['Boolean'];
  title: Scalars['String'];
  todoId: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  email?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  user?: Maybe<User>;
};

export type Todo = {
  __typename?: 'Todo';
  _id: Scalars['ID'];
  completed: Scalars['Boolean'];
  deleted: Scalars['Boolean'];
  title: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  todos?: Maybe<Array<Todo>>;
};

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', _id: string, todos?: Array<{ __typename?: 'Todo', _id: string, title: string, completed: boolean }> | null } | null };


export const UserDocument = gql`
    query User {
  user {
    _id
    todos {
      _id
      title
      completed
    }
  }
}
    `;

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
export function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;