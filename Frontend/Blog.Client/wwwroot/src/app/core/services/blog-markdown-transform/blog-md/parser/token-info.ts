import {TokenType} from "./token-type.enum";

export class TokenInfo {

  type: TokenType;

  line: number;
  column: number;
  charLength: number;

  fileName: string;

  getDebugInfo() : string {
    return `${this.type} in '${this.fileName}' at ${this.line}:${this.column}-${this.charLength}`;
  }

}
