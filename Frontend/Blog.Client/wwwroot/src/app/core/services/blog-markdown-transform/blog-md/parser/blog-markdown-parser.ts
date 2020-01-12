import {FormatParameters} from "core/services/blog-markdown-transform/blog-md/parser/format-parameters";
import {HeaderFormatter} from "core/services/blog-markdown-transform/blog-md/formatters/header-formatter";
import {CodeFormatter} from "core/services/blog-markdown-transform/blog-md/formatters/code-formatter";
import {LineFormatter} from "core/services/blog-markdown-transform/blog-md/formatters/line-formatter";

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
const DashPattern: RegExp = new RegExp("-(-)+");
const EquationLinePattern: RegExp = new RegExp("=(=)+");


export class BlogMarkdownParser {

  private readonly format: FormatParameters;

  constructor() {
    this.format = {

      headerFormatter: new HeaderFormatter(),
      codeFormatter: new CodeFormatter(),
      lineFormatter: new LineFormatter(),

    } as FormatParameters;
  }

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

    const iterator = this.parse(cursor, request, this.format);

    for (const block of iterator) {
      output += block;
    }

    return output;
  }

  private subParse(str: string, parent: string) : string {

    return this.transform(str);
  }

  isEof(cursor: Cursor): boolean {
    return cursor.current > cursor.highestIndex;
  }

  peekChar(cursor: Cursor, request: TokenRequest, skip?: number): string {
    if (this.isEof(cursor)) {
      throw new this.EndOfFile(cursor);
    }

    if (typeof skip === 'undefined') {
      return cursor.source.charAt(cursor.current);
    } else {
      return cursor.source.charAt(cursor.current + skip);
    }
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

    if (length < 0) {
      throw new Error('Negative length passed to readString().');
    }

    if (length === 0) {
      return '';
    }

    const result = cursor.source.substr(cursor.current, length);

    cursor.current += length;

    return result;
  }


  getNearestBreakIndex(cursor: Cursor, request: TokenRequest): number {

    let offset = 0;
    const readLimit = cursor.length - cursor.current;
    const current = cursor.current;

    if (offset + 1 >= readLimit) {
      return current;
    }

    for(;;) {
      const index = current + offset;

      if (cursor.source[index] == "\n" || cursor.source[index] == "\r") {
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

    return current + offset;
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
        case '`': {
          yield this.readBacktick(cursor, request, format);
          break;
        }
        case '-': {
          yield this.readUnderline(cursor, request, format);
          break;
        }
        case '=': {
          yield this.readEqualUnderline(cursor, request, format);
          break;
        }
        // case '`': {
        //   yield this.readBacktick(cursor, request, format);
        //   break;
        // }
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

  private readPairComponents(cursor: Cursor, request: TokenRequest, pairChar: string, breakOnNewLine: boolean): string {

    const char = this.readChar(cursor, request);

    if (pairChar !== char) {
      this.UnexpectedSyntax(cursor);
      return;
    }

    const current = cursor.current;
    let offset = current;
    let readLimit = cursor.length;

    while (offset < readLimit) {
      const cChar = this.readChar(cursor, request);

      if (cChar === pairChar) {
        return cursor.source.substr(current, offset - current);
      }

      offset++;
    }

    return cursor.source.substring(current);
  }

  private readHeader(cursor: Cursor, request: TokenRequest, format: FormatParameters): string {

    const sharps = this.readWhileMatch(cursor, request, SharpsPattern);

    if (typeof sharps === 'undefined') {
      return '';
    }

    const headerType = sharps.length.toString();

    const valueOffset = this.getNearestBreakIndex(cursor, request);

    const value = this.subParse(
      this.readString(cursor, request, valueOffset - cursor.current),
      'header'
    );

    return format.headerFormatter.format(format, value, headerType);
  }


  private readBacktick(cursor: Cursor, request: TokenRequest, format: FormatParameters): string {

    let nextChar = this.peekChar(cursor, request);

    if (nextChar !== '`') {
      return nextChar;
    }

    nextChar = this.peekChar(cursor, request, 1);

    if (nextChar === '`') {
      nextChar = this.readChar(cursor, request);
      nextChar = this.peekChar(cursor, request);
      if (nextChar === '`') {
        nextChar = this.readChar(cursor, request);
        nextChar = this.peekChar(cursor, request);

        if (nextChar !== '`') {
          return '';
        }

        nextChar = this.readChar(cursor, request);
      }

      return this.readWhileMatch(cursor, request, /^```/);

    } else {
      const code = this.readPairComponents(cursor, request, '`', true);

      return format.codeFormatter.format(format, code, '@inline');
    }
  }


  private readUnderline(cursor: Cursor, request: TokenRequest, format: FormatParameters): string {

    let nextChar = this.peekChar(cursor, request);

    if (nextChar !== '-') {
      return nextChar;
    }

    nextChar = this.peekChar(cursor, request, 1);

    if (nextChar !== '-') {
      return nextChar;
    }

    const characters = this.readWhileMatch(cursor, request, DashPattern);

    return format.lineFormatter.format(format, characters.length.toString(), 'hr');
  }

  private readEqualUnderline(cursor: Cursor, request: TokenRequest, format: FormatParameters): string {

    let nextChar = this.peekChar(cursor, request);

    if (nextChar !== '=') {
      return nextChar;
    }

    nextChar = this.peekChar(cursor, request, 1);

    if (nextChar !== '=') {
      return nextChar;
    }

    const characters = this.readWhileMatch(cursor, request, EquationLinePattern);

    return format.lineFormatter.format(format, characters.length.toString(), 'hr');
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
