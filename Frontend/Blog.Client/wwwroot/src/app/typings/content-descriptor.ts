import {ResourceReference} from "typings/resource-reference.type";

export type ContentDescriptorReference = ResourceReference;

export type ContentDescriptorResolved = {
  contentType: string;
  content: string;
}

export type ContentDescriptor = ContentDescriptorReference | ContentDescriptorResolved;
