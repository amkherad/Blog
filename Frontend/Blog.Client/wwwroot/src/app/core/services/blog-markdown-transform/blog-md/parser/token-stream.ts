import {TokenInfo} from "./token-info";

type PushTokenCallback = (token: TokenInfo) => void;
type StreamState = {
  continue: boolean;
  cancelReason: undefined | string;
};

export class TokenStream {

  private input: ReadableStream;

  constructor(stream: ReadableStream) {
    this.input = stream;
  }

  read(): ReadableStream<TokenInfo> {

    const state: StreamState = {
      continue: true,
      cancelReason: undefined
    };

    const readable = new ReadableStream<TokenInfo>({
      cancel: reason => {
        state.continue = false;
        state.cancelReason = reason;
      },
      pull: controller => {
        console.log('pull');
      },
      start: async controller => {
        console.log('start');
        const reader = this.input.getReader();
        let block = await reader.read();
        while (!block.done && state.continue) {

          const buffer = block.value;

          const pushToken: PushTokenCallback = token => {
            controller.enqueue(token);
          };

          this.transformLine(pushToken, '');

          block = await reader.read();
        }
        reader.releaseLock();
      }
    });

    return readable;
  }

  transformLine(pushToken: PushTokenCallback, line: string): void {

  }
}
