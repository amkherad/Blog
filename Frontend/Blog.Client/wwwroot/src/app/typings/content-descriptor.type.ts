import {
  isResourceReferenceExtended,
  ResourceReference,
  ResourceReferenceExtended
} from "typings/resource-reference.type";

export type ContentDescriptorReference = ResourceReference;

export type ContentDescriptorResolved = {
  contentType: string;
  content: string;
}

export type ContentDescriptor = ContentDescriptorReference | ContentDescriptorResolved;

export const isContentDescriptor = (obj: any): obj is ContentDescriptor => (
    typeof (obj as ContentDescriptorResolved).content !== 'undefined' &&
    typeof (obj as ContentDescriptorResolved).contentType !== 'undefined'
  ) ||
  typeof obj === 'string' ||
  isResourceReferenceExtended(obj)
;

export const isContentDescriptorResolved = (obj: any): obj is ContentDescriptorResolved => (
  typeof (obj as ContentDescriptorResolved).content !== 'undefined' &&
  typeof (obj as ContentDescriptorResolved).contentType !== 'undefined'
);
