import gql from 'graphql-tag';

export const REMOVE_POST = gql`
mutation deletePost($postId: Number!) {
    deletePostResponse(id: $postId)
      @rest(type: "Post", path: "/posts/{args.id}", method: "DELETE") {
      NoResponse
    }
  }
`;
