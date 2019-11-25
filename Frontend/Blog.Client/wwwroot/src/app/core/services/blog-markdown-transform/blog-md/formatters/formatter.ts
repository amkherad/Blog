import {FormatParameters} from "core/services/blog-markdown-transform/blog-md/parser/format-parameters";

export interface Formatter {

  format(format: FormatParameters, value: string, name: string, params?: Record<string, any>): string;

}
