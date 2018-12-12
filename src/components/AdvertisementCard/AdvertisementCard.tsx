import * as React from 'react';
import styled from 'styled-components';
import { AdvertisementGeneralCardContent } from './AdvertisementGeneralCardContent/AdvertisementGeneralCardContent';
import { AdvertisementCardProps, AdvertisementCardType } from './AdvertisementCard.models';
import { AdvertisementSpecificCardContent } from './AdvertisementSpecificCardContent/AdvertisementSpecificCardContent';
import Button from '@pluralsight/ps-design-system-button/react';

const isServer = process.env.SERVER_ENV;
// <editor-fold desc="Styled Component">
const CardContainer = styled.div`
  width: 100%;
  min-height: 250px;
  max-height: 300px;
`;

const LearnMoreContainer = styled.div`
  min-height: 56px;
  max-height: 56px;
  width: 100%;
  margin-top: auto;
  padding: 12px 28px 12px 16px;
  border-top: 1px solid #dedfe1;
`;

const LearnMoreLink = styled.a`
  button {
    color: #137bc2;
    font-size: 13px;
    font-weight: 500;
    line-height: 24px;
    text-align: center;
  }
  text-decoration: none;
`;

const FlippingContent = styled.div`
  backface-visibility: hidden;
  min-height: 250px;
  position: relative;
  width: 100%;
  top: 0;
  bottom: 0;
  background-color: #fff;
  border: 1px solid #dedfe1;
  display: flex;
  flex-flow: column;

  &.front {
    z-index: 10;
  }
  &.back {
    transform: rotateY(180deg);
    position: absolute;
  }
`;

const ContainerCard = styled.div`
  perspective: 500px;

  &.closing ${CardContainer} {
    transform: rotateY(180deg);
  }

  ${CardContainer} {
    transition: transform 0.7s;
    transform-style: preserve-3d;
  }
`;

const WarningContainer = styled.div`
  padding: 8px;
  background: #ffc200;
  color: black;
  font-weight: bold;
  margin-top: 8px;
`;

// </editor-fold>
export class AdvertisementCard extends React.Component<AdvertisementCardProps, any> {
  public showWarning = false;

  private cardDescriptionReference: any;

  public renderCardContent(): React.ReactNode {
    switch (this.props.advertisementType) {
      case AdvertisementCardType.GENERAL: {
        return <AdvertisementGeneralCardContent {...this.props} />;
      }
      case AdvertisementCardType.SPECIFIC: {
        return <AdvertisementSpecificCardContent {...this.props} />;
      }
      default: {
        return <AdvertisementGeneralCardContent {...this.props} />;
      }
    }
  }

  componentDidUpdate(prevProps: Readonly<AdvertisementCardProps>, prevState: Readonly<any>, snapshot?: any): void {
    if (prevProps.advertisementType !== this.props.advertisementType) {
      this.cardDescriptionReference = null;
    }

    this.checkCardDescriptionHeight();
  }

  render(): React.ReactNode {
    return (
      <ContainerCard>
        <CardContainer className="card">
          <FlippingContent className="front">
            {this.renderCardContent()}
            <LearnMoreContainer>
              <LearnMoreLink href={this.props.learnMoreLink} className={'learn-more-link'}>
                <Button appearance={Button.appearances.flat} size={Button.sizes.small}>
                  Learn more
                </Button>
              </LearnMoreLink>
            </LearnMoreContainer>
          </FlippingContent>
        </CardContainer>
        {this.showWarning && (
          <WarningContainer>
            <p>The advertisement card is getting too big</p>
            <p>Please limit the text to 5-6 lines</p>
          </WarningContainer>
        )}
      </ContainerCard>
    );
  }

  private checkCardDescriptionHeight(): void {
    if (isServer) {
      return;
    }

    if (!this.cardDescriptionReference) {
      this.cardDescriptionReference = document.querySelector('.adv-description');

      if (!this.cardDescriptionReference) {
        return;
      }
    }

    const cardHeight = this.props.advertisementType === AdvertisementCardType.SPECIFIC ? 156 : 180;
    const previousValue = this.showWarning;
    this.showWarning = this.cardDescriptionReference.clientHeight > cardHeight;

    if (previousValue !== this.showWarning) {
      this.forceUpdate();
    }
  }
}
