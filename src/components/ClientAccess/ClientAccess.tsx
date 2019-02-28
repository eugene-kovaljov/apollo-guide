import * as React from 'react';
import { ApolloConsumer, withApollo } from 'react-apollo';
import { ApolloClient } from 'apollo-client';

function ApolloConsumerExample() {
  return (
    <ApolloConsumer>
      {(client: ApolloClient<any>) => {
        console.log(client);
        return (
          <div>I have a client</div>
        );
      }}
    </ApolloConsumer>
  );
}

type WithApolloExampleComponentProps = {} & { client: ApolloClient<any> };

function WithApolloExampleComponent(props: WithApolloExampleComponentProps) {
  console.log(props);
  return (
    <div>I also have a client</div>
  );
}

const WithApolloExample = withApollo<{}>(WithApolloExampleComponent);

export function ClientAccess() {
  return (
    <React.Fragment>
      <ApolloConsumerExample/>
      <WithApolloExample/>
    </React.Fragment>
  )
}