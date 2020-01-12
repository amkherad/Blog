import {HeaderFormatter} from "core/services/blog-markdown-transform/blog-md/formatters/header-formatter";
import {CodeFormatter} from "core/services/blog-markdown-transform/blog-md/formatters/code-formatter";
import {LineFormatter} from "core/services/blog-markdown-transform/blog-md/formatters/line-formatter";

export class FormatParameters {

  headerFormatter: HeaderFormatter;

  lineFormatter: LineFormatter;

  codeFormatter: CodeFormatter;

}
