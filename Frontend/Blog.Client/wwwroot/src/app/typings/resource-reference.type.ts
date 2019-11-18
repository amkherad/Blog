
export type ResourceReferenceExtended = {

  uri: string;
  hash?: string;
  algorithm?: string;

};

export type ResourceReference = string | ResourceReferenceExtended;
