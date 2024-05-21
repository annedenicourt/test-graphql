import { gql } from "@apollo/client";

export const SIGNUP = gql`
  mutation signup($userInput: UserInput!) {
    signup(userInput: $userInput) {
      accessToken
    }
  }
`;

export const LOGIN = gql`
  mutation login($userInput: UserInput!) {
    login(userInput: $userInput) {
      accessToken
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($userId: String!, $userInput: UserInput!) {
    updateUser(userId: $userId, userInput: $userInput) {
      _id
    }
  }
`;

export const GET_ALL_USERS = gql`
  query getUsers {
    getUsers {
      _id
      firstName
      lastName
      email
      roles
    }
  }
`;

export const GET_USER = gql`
  query getUser {
    getUser {
      _id
      firstName
      lastName
      email
      roles
    }
  }
`;
