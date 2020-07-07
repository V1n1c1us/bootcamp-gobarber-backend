export default interface ICacheProvider {
  save(key: string, value: any): Promise<void>;
  recoverCache<T>(key: string): Promise<T | null>;
  invalidate(key: string): Promise<void>;
  invalidadeCachePrefix(prefix: string): Promise<void>;
}