
export type TransformPipelineBufferReader = <T>(obj: TransformPipelineBuffer<T>) => boolean;

export class TransformPipelineBuffer<T> {

  private readonly queue: T[] = [];
  private readonly reader: TransformPipelineBufferReader;

  constructor(reader: TransformPipelineBufferReader) {
    this.reader = reader;
  }

  push(data: T) {
    this.queue.push(data);
  }

  isEmpty(): boolean {
    return this.queue.length == 0;
  }

  getLength(): number {
    return this.queue.length;
  }

  take(): T | undefined {
    if (this.isEmpty()) {
      if(!this.reader(this)) {
        return undefined;
      }
    }

    return this.queue.shift();
  }

  peek(): T | undefined {
    if (this.isEmpty()) {
      if(!this.reader(this)) {
        return undefined;
      }
    }

    return this.queue[this.queue.length];
  }
}
