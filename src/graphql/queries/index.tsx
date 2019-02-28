import gql from 'graphql-tag';

export const GET_POSTS = gql`
  query posts {
    posts @rest(type: "Post", path: "/posts") {
      title
      body
      id
    }
  }
`;

export const GET_POST = gql`
  query post($postId: Number!) {
    post(postId: $postId) @rest(type: "Post", path: "/posts/{args.postId}") {
      title
      body
      id
    }
  }
`;

export const GET_USERS = gql`
  query users {
    users @rest(type: "User", path: "/users") {
      name
      email
      id
      address @type(name: "Address") {
        city
      }
    }
  }
`;

export const GET_USER = gql`
  query user($userId: Number!) {
    user(userId: $userId) @rest(type: "User", path: "/users/{args.userId}") {
      name
      email
      id
      address @type(name: "Address") {
        city
      }
    }
  }
`;