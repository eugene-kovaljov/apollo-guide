import { AdvertisementSpecificCardContentProps } from './AdvertisementSpecificCardContent/AdvertisementSpecificCardContent.models';
import { AdvertisementGeneralCardContentProps } from './AdvertisementGeneralCardContent/AdvertisementGeneralCardContent.models';
import { ContentType } from '../../models';

export enum AdvertisementCardType {
  GENERAL = 'general',
  SPECIFIC = 'specific'
}

export interface AdvertisementCardProps extends AdvertisementSpecificCardContentProps, AdvertisementGeneralCardContentProps {
  contentType?: ContentType;
  advertisementType: AdvertisementCardType;
  learnMoreLink?: string;
}
