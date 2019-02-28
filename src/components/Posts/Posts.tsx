import * as React from 'react';
import { Query } from 'react-apollo';
import { GET_POSTS } from '../../graphql/queries';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardColumns } from 'reactstrap';
import { Post } from '../../models';
import { RemovePostButton } from './RemovePostButton';

const clickHandler = (refetch) => () => {
  refetch();
}
export function Posts(props) {
  return <Query query={GET_POSTS} onCompleted={() => {
    console.log('on complete')
  }}>
    {({data, loading, error, variables, refetch}) => {
      debugger;
      if (loading || Object.keys(data).length === 0) {
        console.log('loading');
        return <h1>Loading</h1>
      }

      if (error) {
        console.log('error');
        return <h1>Ooops...</h1>
      }

      console.log('posts retrieved');

      const { posts } = data;

      console.log(variables);

      return <CardColumns>
        {posts.map((item: Post) => {
          return (
            <Card key={item.id}>
              <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
              <CardBody>
                <CardTitle>{item.title}</CardTitle>
                <CardText>{item.body}</CardText>
                <Button onClick={clickHandler(refetch)}>Refetch query</Button>
                <RemovePostButton postId={item.id}/>
              </CardBody>
            </Card>
          )
        })}
      </CardColumns>
    }}
  </Query>
}