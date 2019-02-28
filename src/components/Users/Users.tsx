import * as React from 'react';
import { Table, Button } from 'reactstrap';
import { Query } from 'react-apollo';
import { GET_USERS } from '../../graphql/queries';
import { User } from '../../models';

export function Users(props) {
  const loadMoreHandler = (fetchMore) => () => {
    fetchMore({
      updateQuery: (prev, {fetchMoreResult}) => {
        return {
          users: [...prev.users, ...fetchMoreResult.users]
        }
      }
    })
  }
  return <Table hover>
    <thead>
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Email</th>
      <th>City</th>
    </tr>
    </thead>
    <tbody>
    <Query query={GET_USERS} >
      {({ data, fetchMore, loading, error }) => {
        if (loading || error) {
          return null;
        }
        return <React.Fragment>
          {data.users.map((user: User) =>
            <tr key={user.id}>
              <th scope="row">{user.id}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.address.city}</td>
            </tr>)}
          <Button onClick={loadMoreHandler(fetchMore)}>Load more</Button>
        </React.Fragment>
      }}
    </Query>
    </tbody>
  </Table>;
}