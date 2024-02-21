export class ExecutionCache<TInputs extends Array<unknown>, TOutput> {
  private cache: Map<string, Promise<TOutput>> = new Map();

  constructor(private readonly handler: (...args: TInputs) => Promise<TOutput>) {}

  async fire(key: string, ...args: TInputs): Promise<TOutput> {
    /**
     * insert your code here
     */
    const cacheKey = this.generateCacheKey(key, args);

    if (!this.cache.has(cacheKey)) {
      const executionPromise = this.handler(...args);
      this.cache.set(cacheKey, executionPromise);
    }

    return this.cache.get(cacheKey) as Promise<TOutput>;
  }

  private generateCacheKey(key: string, args: TInputs): string {
    return `${key}:${args.map(arg => JSON.stringify(arg)).join(':')}`;
  }
}






