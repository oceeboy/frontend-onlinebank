export interface QueuePromise {
  resolve: (value: Response | PromiseLike<Response>) => void;
  reject: (reason?: unknown) => void;
}
