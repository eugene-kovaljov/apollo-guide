import { RestLink } from 'apollo-link-rest';

export const AddressPatcher = {
  User: (
    data: any,
    outerType: string,
    patchDeeper: RestLink.FunctionalTypePatcher,
  ): any => {
    if (data.typePatchedResults != null) {
      data.typePatchedResults = data.typePatchedResults.map( address => ({ __typename: "Address", ...address }));
    }

    return data;
  },
};
