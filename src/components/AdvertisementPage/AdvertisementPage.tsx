import * as React from 'react';
import { AdvertisementCard } from '../AdvertisementCard/AdvertisementCard';
import { AdvertisementCardType } from '../AdvertisementCard/AdvertisementCard.models';
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
      <AdvertisementCard advertisementType={AdvertisementCardType.GENERAL} title={'Hello'} description={'Hi'} key={'k1'}/>
      <AdvertisementCard advertisementType={AdvertisementCardType.GENERAL} key={'k1'}/>
      <AdvertisementCard advertisementType={AdvertisementCardType.GENERAL} key={'k1'}/>
      <AdvertisementCard advertisementType={AdvertisementCardType.GENERAL} key={'k1'}/>
    </AdvertisementGrid>);
  }
}