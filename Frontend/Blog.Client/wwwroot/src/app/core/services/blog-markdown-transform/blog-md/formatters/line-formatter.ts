import {Formatter} from "core/services/blog-markdown-transform/blog-md/formatters/formatter";
import {FormatParameters} from "core/services/blog-markdown-transform/blog-md/parser/format-parameters";

export class LineFormatter implements Formatter {

  format(format: FormatParameters, value: string, name: string, params?: Record<string, any>): string {

    return `<hr></hr>`;

  }

}
