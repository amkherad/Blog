export class BlogMarkdownTransformStream implements ReadableStream<string> {
  readonly locked: boolean;

  cancel(reason?: any): Promise<void> {
    return undefined;
  }

  getReader(options: { mode: "byob" }): ReadableStreamBYOBReader;
  getReader(): ReadableStreamDefaultReader<string>;
  getReader(options?: { mode: "byob" }): any {
  }

  pipeThrough<T>({writable, readable}: { writable: WritableStream<string>; readable: ReadableStream<T> }, options?: PipeOptions): ReadableStream<T> {
    return undefined;
  }

  pipeTo(dest: WritableStream<string>, options?: PipeOptions): Promise<void> {
    return undefined;
  }

  tee(): [ReadableStream<string>, ReadableStream<string>] {
    return [undefined, undefined];
  }


  constructor(stream: ReadableStream) {

  }

}
