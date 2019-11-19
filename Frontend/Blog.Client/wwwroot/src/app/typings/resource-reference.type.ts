
export type ResourceReferenceExtended = {

  uri: string;
  hash?: string;
  algorithm?: string;

};

export type ResourceReference = string | ResourceReferenceExtended;

export const isResourceReferenceExtended = (obj: any): obj is ResourceReferenceExtended => {
  return typeof (obj as ResourceReferenceExtended).uri !== 'undefined';
};
