import * as React from 'react';
import { Users } from '../Users/Users';
import { Button } from 'reactstrap';
import { withApollo } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { GET_USER, GET_USERS } from '../../graphql/queries';
import { useState } from 'react';
import { Posts } from '../Posts/Posts';

export function FetchPolicyComponent(props: {client: ApolloClient<any>}) {
  const {client} = props;
  const [toggle, toggleItems] = useState(false);
  const clearUsers = () => {
    client.writeQuery({
      query: GET_USERS,
      data: {
        users: []
      }
    })
  };

  const addItem = async () => {
    const result: any = await client.query({
      query: GET_USER,
      variables: {
        userId: 1
      },
    });

    const data = client.readQuery({
      query: GET_USERS
    });


    client.writeQuery({
      query: GET_USERS,
      data: {
        users: [result.data.user, ...data.users]
      }
    })
  };

  const togglePosts = () => {
    toggleItems(!toggle)
  }

  return (
    <div className={'row'}>
      <div className={'col-sm-8'}>
        <Users/>
        {toggle && <Posts/>}
      </div>
      <div className={'col-sm-4'}>
        <Button onClick={clearUsers}>Remove</Button>
        <Button onClick={addItem}>Add item</Button>
        <Button onClick={togglePosts}>Toggle posts</Button>
      </div>
    </div>
  )
}

export const FetchPolicy = withApollo(FetchPolicyComponent);