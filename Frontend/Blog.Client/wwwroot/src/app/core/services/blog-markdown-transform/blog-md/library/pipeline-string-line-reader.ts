import {TransformPipelineBuffer} from "./transform-pipeline-buffer";
import {TokenInfo} from "core/services/blog-markdown-transform/blog-md/parser/token-info";

export class PipelineStringLineReader {

  async pushLinesToBuffer(source: ReadableStream<string>, buffer: TransformPipelineBuffer<string>) {

    const reader = source.getReader();
    let block = await reader.read();

    let line = '';

    while (!block.done) {
      const buffer = block.value;

      const ln = buffer.indexOf('\n'); //a single line
      let newLineCharIndex = ln;

      while(newLineCharIndex < buffer.length - 1) {
        if (typeof newLineCharIndex !== 'undefined' && newLineCharIndex >= 0) {
          if (buffer.length - 1 > newLineCharIndex) {
            if (buffer[newLineCharIndex + 1] == '\r') {
              newLineCharIndex++;
            }
          }
        } else {
          line += buffer;
        }
      }

      this.transformLine(buffer, '');

      block = await reader.read();
    }
    reader.releaseLock();
  }


  transformLine(pushToken: PushTokenCallback, line: string): void {

  }
}
