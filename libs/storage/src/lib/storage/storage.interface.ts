export interface Storage {
  set(key: string, value: string): void;
  get(key: string): string | undefined;
  clear(): void;
  remove(key: string): void;
}
