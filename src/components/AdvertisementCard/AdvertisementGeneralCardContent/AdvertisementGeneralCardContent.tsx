import * as React from 'react';
import styled from 'styled-components';
import { AdvertisementGeneralCardContentProps } from './AdvertisementGeneralCardContent.models';
import { EmptyAddIcon } from '../EmptyAddIcon/EmptyAddIcon';
import Icon from '@pluralsight/ps-design-system-icon/react';
// <editor-fold desc="Styled Component">
const ContentContainer = styled.div`
  position: relative;
  padding: 0 32px 12px 24px;
  height: 100%;
  overflow-y: hidden;
`;

const MainContentContainer = styled.div`
  padding-top: 24px;
`;

const ContentImage = styled.img`
  max-width: 24px;
  max-height: 24px;
  height: 24px;
  width: 24px;
`;

const IconContainer = styled.div`
  margin-right: 16px;
  max-width: 24px;
  max-height: 24px;
`;

const StyledIcon = styled(Icon)`
  opacity: 0.5;
  float: left;
  svg {
    float: left;
  }
`;

const ContentTitle = styled.div`
  color: #222222;
  font-size: 18px;
  font-weight: bold;
  line-height: 20px;
  &.adv-title__empty {
    opacity: 0.5;
  }
`;

const ContentDescription = styled.div`
  color: #222222;
  font-size: 13px;
  font-weight: 300;
  line-height: 20px;
  &.adv-description__empty {
    opacity: 0.5;
  }
`;

const ContentTextContainer = styled.div`
  width: 100%;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 24px;
  margin-bottom: 16px;
`;

// </edtor-fold>
export class AdvertisementGeneralCardContent extends React.Component<AdvertisementGeneralCardContentProps, any> {
  public withPreviewMode = (jsx: React.ReactNode) => {
    return this.props.previewMode ? jsx : null;
  };

  public renderIcon(): React.ReactNode {
    return this.props.icon ? (
      <ContentImage alt={'Adv icon'} src={this.props.icon} />
    ) : (
      this.withPreviewMode(
        <StyledIcon>
          <EmptyAddIcon />
        </StyledIcon>
      )
    );
  }

  public renderTitle(): React.ReactNode {
    return this.props.title ? (
      <ContentTitle className={'adv-title'}>{this.props.title}</ContentTitle>
    ) : (
      this.withPreviewMode(<ContentTitle className={'adv-title__empty'}>Title</ContentTitle>)
    );
  }

  public renderDescription(): React.ReactNode {
    return this.props.description ? (
      <ContentDescription
        className={'adv-description'}
        dangerouslySetInnerHTML={{
          __html: this.props.description
        }}
      />
    ) : (
      this.withPreviewMode(
        <ContentDescription className={'adv-description__empty'}>Description</ContentDescription>
      )
    );
  }

  render(): React.ReactNode {
    return (
      <React.Fragment>
        <ContentContainer>
          <MainContentContainer>
            <TitleContainer>
              <IconContainer>{this.renderIcon()}</IconContainer>
              {this.renderTitle()}
            </TitleContainer>
            <ContentTextContainer>{this.renderDescription()}</ContentTextContainer>
          </MainContentContainer>
        </ContentContainer>
      </React.Fragment>
    );
  }
}
