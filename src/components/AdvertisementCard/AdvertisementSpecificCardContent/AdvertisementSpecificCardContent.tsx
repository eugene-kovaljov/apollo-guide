import * as React from 'react';
import styled from 'styled-components';
import { AdvertisementSpecificCardContentProps } from './AdvertisementSpecificCardContent.models';
import { EmptyAddIcon } from '../EmptyAddIcon/EmptyAddIcon';
import Icon from '@pluralsight/ps-design-system-icon/react';
import { contentTypes } from '../../../mocks/content-type.mock';
// import { contentTypes } from '../../../test/mocks/content-type/content-type.mock';
// <editor-fold desc="Styled Component">
const ContentContainer = styled.div`
  position: relative;
  padding: 0 32px 12px 24px;
  height: 100%;
  overflow-y: hidden;
`;
const StyledHeaderIcon = styled(Icon)`
  width: 20px !important;
  height: 20px !important;
  margin-right: 8px;
  svg {
    float: left;
    fill: #fff !important;
    width: 100%;
    height: 100%;
    g {
      fill: #fff !important;
    }
  }
`;

const CloseIcon = styled(StyledHeaderIcon)`
  margin-left: auto;
  margin-right: 0;
  cursor: pointer;
`;

const ContentHeaderTitle = styled.div`
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  line-height: 24px;
`;

const SpecificAdvertisementHeader = styled.div`
   max-height: 40px;
   min-height: 40px;
   background-color: #1074B7;
   padding: 8px 12px; 
   display: flex;
   align-items: center;
   &.empty-header {
    ${ContentHeaderTitle}, ${StyledHeaderIcon}, ${CloseIcon} {
    opacity: 0.5;
   }
`;

const MainContentContainer = styled.div`
  display: flex;
  padding-top: 24px;
`;

const ContentImage = styled.img`
  max-width: 64px;
  max-height: 64px;
  height: 64px;
  width: 64px;
`;

const IconContainer = styled.div`
  margin-right: 16px;
`;

const ContentTitle = styled.div`
  color: #222222;
  font-size: 14px;
  font-weight: bold;
  line-height: 20px;
  margin-bottom: 8px;
  &.adv-title__empty {
    opacity: 0.5;
  }
`;

const ContentDescription = styled.div`
  color: #222222;
  font-size: 12px;
  font-weight: 300;
  line-height: 18px;
  &.adv-description__empty {
    opacity: 0.5;
  }
`;

const ContentTextContainer = styled.div`
  width: 100%;
`;

// </edtor-fold>
export class AdvertisementSpecificCardContent extends React.Component<AdvertisementSpecificCardContentProps, any> {
  public withPreviewMode = (jsx: React.ReactNode) => {
    return this.props.previewMode ? jsx : null;
  };

  public get contentTypeProvided(): boolean {
    return !!this.props.advertisementType;
  }

  public get contentTypeDisplayName() {
    return typeof this.props.advertisementType === 'string'
      ? this.getDisplayName(this.props.advertisementType)
      : this.props.advertisementType.key;
  }

  public get contentTypeIcon() {
    return typeof this.props.advertisementType === 'string'
      ? this.getIcon(this.props.advertisementType)
      : this.props.advertisementType.icon;
  }

  public handleCloseAdvertisement = () => {
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  public renderHeader(): React.ReactNode {
    return !!this.props.advertisementType ? (
      <React.Fragment>
        <StyledHeaderIcon id={this.contentTypeIcon} />
        <ContentHeaderTitle className={'card-header-title'}>
          {this.contentTypeDisplayName} advertisement
        </ContentHeaderTitle>
      </React.Fragment>
    ) : (
      this.withPreviewMode(
        <React.Fragment>
          <StyledHeaderIcon>
            <EmptyAddIcon />
          </StyledHeaderIcon>
          <ContentHeaderTitle className={'card-header-title'}>Content type</ContentHeaderTitle>
        </React.Fragment>
      )
    );
  }

  public renderAdvertisementTitle(): React.ReactNode {
    return this.props.title ? (
      <ContentTitle className={'adv-title'}>{this.props.title}</ContentTitle>
    ) : (
      this.withPreviewMode(<ContentTitle className={'adv-title__empty'}>Title</ContentTitle>)
    );
  }

  public renderAdvertisementDescription(): React.ReactNode {
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
        <SpecificAdvertisementHeader className={this.contentTypeProvided ? '' : 'empty-header'}>
          {this.renderHeader()}
          <CloseIcon id={Icon.ids.close} onClick={this.handleCloseAdvertisement} />
        </SpecificAdvertisementHeader>
        <ContentContainer>
          <MainContentContainer>
            {this.props.icon && (
              <IconContainer>
                <ContentImage alt={'Adv icon'} className={'adv-icon'} src={this.props.icon} />
              </IconContainer>
            )}
            <ContentTextContainer>
              {this.renderAdvertisementTitle()}
              {this.renderAdvertisementDescription()}
            </ContentTextContainer>
          </MainContentContainer>
        </ContentContainer>
      </React.Fragment>
    );
  }

  private getDisplayName(key: string): any {
    const contentType = contentTypes.find(type => type.key === key);

    return contentType ? contentType.displayName : {};
  }

  private getIcon(key: string): any {
    const contentType = contentTypes.find(type => type.key === key);

    return contentType ? contentType.icon : {};
  }
}
