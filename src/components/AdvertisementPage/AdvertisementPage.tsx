import * as React from 'react';
import styled from 'styled-components';

const AdvertisementGrid = styled.div`
  display: flex;
  justify-content: center;
  & > div {
    width: 350px;
    margin: 12px
  }
`;

export class AdvertisementPage extends React.Component {
  render(): React.ReactNode {
    return (<AdvertisementGrid>
    </AdvertisementGrid>);
  }
}