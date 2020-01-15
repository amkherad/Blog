import {Formatter} from "core/services/blog-markdown-transform/blog-md/formatters/formatter";
import {FormatParameters} from "core/services/blog-markdown-transform/blog-md/parser/format-parameters";

export class ListFormatter implements Formatter {

  format(format: FormatParameters, value: string, name: string, params?: Record<string, any>): string {

    let content = '';

    for (let lineKey in params) {
      if (params.hasOwnProperty(lineKey)) {
        const line = params[lineKey];

        content += `<li>${line}</li>`;
      }
    }

    return `<ul>${content}</ul>`;
  }

}
