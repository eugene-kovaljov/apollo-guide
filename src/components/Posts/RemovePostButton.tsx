import * as React from 'react';
import { Button } from 'reactstrap';
import { Mutation } from 'react-apollo';
import { REMOVE_POST } from '../../graphql/mutations';
import { DataProxy } from 'apollo-cache';
import { GET_USERS } from '../../graphql/queries';

export function RemovePostButton(props: {postId: number}) {
  return (
    <Mutation mutation={REMOVE_POST} onCompleted={() => {
      console.log('removal complete')
    }} update={(cache: DataProxy, {data}) => {
      console.log(cache);
    }} refetchQueries={[{
     query: GET_USERS
    }]}>
      {(mutationFunction) => {
        return <Button onClick={() => {
          mutationFunction({variables: {postId: props.postId}})
        }}>Remove</Button>
      }}
    </Mutation>
  )
}