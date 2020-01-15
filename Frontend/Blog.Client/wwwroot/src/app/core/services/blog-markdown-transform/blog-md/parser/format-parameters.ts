import {HeaderFormatter} from "core/services/blog-markdown-transform/blog-md/formatters/header-formatter";
import {CodeFormatter} from "core/services/blog-markdown-transform/blog-md/formatters/code-formatter";
import {LineFormatter} from "core/services/blog-markdown-transform/blog-md/formatters/line-formatter";
import {ListFormatter} from "core/services/blog-markdown-transform/blog-md/formatters/list-formatter";
import {NewLineFormatter} from "core/services/blog-markdown-transform/blog-md/formatters/new-line-formatter";

export class FormatParameters {

  headerFormatter: HeaderFormatter;

  lineFormatter: LineFormatter;

  codeFormatter: CodeFormatter;

  newLineFormatter: NewLineFormatter;

  listFormatter: ListFormatter;

}
