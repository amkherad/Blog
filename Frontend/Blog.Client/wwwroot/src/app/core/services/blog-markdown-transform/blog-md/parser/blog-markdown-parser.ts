import {FormatParameters} from "core/services/blog-markdown-transform/blog-md/parser/format-parameters";
import {HeaderFormatter} from "core/services/blog-markdown-transform/blog-md/formatters/header-formatter";

type Cursor = {
  source: string;

  length: number;
  highestIndex: number;

  current: number;
};

type TokenRequest = {
  trimWhitespace: boolean;
};


const StringPattern: RegExp = new RegExp("^(\"|\')(?:\\\\\\1|[^\\1])*?\\1");
const IdentifierPattern: RegExp = new RegExp("^\\w+");
const SharpsPattern: RegExp = new RegExp("^#+");


export class BlogMarkdownParser {

  transform(input: string): string {

    let output = '';

    const cursor = {

      source: input,
      current: 0,
      length: input.length,
      highestIndex: Math.max(0, input.length - 1)

    } as Cursor;

    const request = {

      trimWhitespace: true

    } as TokenRequest;

    const format = {

      headerFormatter: new HeaderFormatter()

    } as FormatParameters;

    const iterator = this.parse(cursor, request, format);

    for (const block of iterator) {
      output += block;
    }

    return output;
  }

  isEof(cursor: Cursor): boolean {
    return cursor.current >= cursor.highestIndex;
  }

  peekChar(cursor: Cursor, request: TokenRequest): string {
    if (this.isEof(cursor)) {
      throw new this.EndOfFile(cursor);
    }

    return cursor.source.charAt(cursor.current);
  }

  readChar(cursor: Cursor, request: TokenRequest): string {
    if (this.isEof(cursor)) {
      throw new this.EndOfFile(cursor);
    }

    const result = cursor.source[cursor.current];
    cursor.current++;
    return result;
  }

  whileMatchLength(cursor: Cursor, request: TokenRequest, regex: RegExp): number {
    const str = cursor.source.substring(cursor.current, cursor.highestIndex);

    const match = str.match(regex);

    if (typeof match[0] === 'undefined') {
      return 0;
    }

    return match[0].length;
  }

  readWhileMatch(cursor: Cursor, request: TokenRequest, regex: RegExp): string | undefined {
    const matchLength = this.whileMatchLength(cursor, request, regex);

    if (matchLength <= 0) {
      return undefined;
    }

    const result = cursor.source.substr(cursor.current, matchLength);
    cursor.current += matchLength;
    return result;
  }

  peekWhileMatch(cursor: Cursor, request: TokenRequest, regex: RegExp): string | undefined {
    const matchLength = this.whileMatchLength(cursor, request, regex);

    if (matchLength <= 0) {
      return undefined;
    }

    return cursor.source.substr(cursor.current, matchLength);
  }


  readString(cursor: Cursor, request: TokenRequest, length: number) : string {
    const result = cursor.source.substr(cursor.current, length);

    cursor.current += length;

    return result;
  }


  getNearestBreakIndex(cursor: Cursor, request: TokenRequest): number {

    let offset = 0;
    let readLimit = cursor.length - cursor.current;
    const current = cursor.current;

    for(;;) {
      const index = current + offset;

      if (cursor.source[index] == '\n' || cursor.source[index] == '\r') {
        break;
      }

      if (offset + 1 >= readLimit || (
        cursor.source[index] === ' ' &&
        cursor.source[index + 1] === ' '
      )) {
        break;
      }

      offset ++;
    }

    return offset;
  }


  private* parse(cursor: Cursor, request: TokenRequest, format: FormatParameters) {

    let index = cursor.current;

    while (!this.isEof(cursor)) {
      const char = this.peekChar(cursor, request);

      switch (char) {
        case '#': {
          yield this.readHeader(cursor, request, format);
          break;
        }
        case '*': {
          yield this.readList(cursor, request, format);
          break;
        }
        case '-': {
          yield this.readList(cursor, request, format);
          break;
        }
        case '`': {
          yield this.readBacktick(cursor, request, format);
          break;
        }
        default: {
          yield this.readChar(cursor, request);
          break;
        }
      }

      if (cursor.current === index) {
        break;
      }
    }
  }

  private readPairComponents(cursor: Cursor, request: TokenRequest, pairChar: string): string {

    return '';
  }

  private readHeader(cursor: Cursor, request: TokenRequest, format: FormatParameters): string {

    const sharps = this.readWhileMatch(cursor, request, SharpsPattern);

    if (typeof sharps === 'undefined') {
      return '';
    }

    const headerType = sharps.length.toString();

    const valueOffset = this.getNearestBreakIndex(cursor, request);

    const value = this.readString(cursor, request, valueOffset);

    return format.headerFormatter.format(format, value, headerType);
  }


  private readBacktick(cursor: Cursor, request: TokenRequest, format: FormatParameters): string {

    const sharps = this.readWhileMatch(cursor, request, SharpsPattern);

    const headerType = `h${sharps.length}`;

    const valueOffset = this.getNearestBreakIndex(cursor, request);

    const value = cursor.source.substr(cursor.current, valueOffset);

    return format.headerFormatter.format(format, value, headerType);
  }


  private readList(cursor: Cursor, request: TokenRequest, format: FormatParameters): string {

    const sharps = this.readWhileMatch(cursor, request, SharpsPattern);

    const headerType = `h${sharps.length}`;

    const valueOffset = this.getNearestBreakIndex(cursor, request);

    const value = cursor.source.substr(cursor.current, valueOffset);

    return format.headerFormatter.format(format, value, headerType);
  }


  private EndOfFile(cursor: Cursor): void {
    throw new Error('End of data stream reached.');
  }

  private UnexpectedSyntax(cursor: Cursor): void {
    throw new Error('Unexpected syntax.');
  }

}
