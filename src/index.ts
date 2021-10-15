type Option<T> = {
  reverse: (keyof T)[];
};

export function lycle<T extends Record<string, (...args: any[]) => void>>(
  def: (() => Partial<T>)[],
  option: Option<T>
): T {
  const lifeCycles = {} as { [K in keyof T]: T[K][] };
  def.forEach((block) => {
    const instance = block();
    Object.entries(instance).forEach(([key, fn]: [keyof T, any]) => {
      if (!lifeCycles[key]) lifeCycles[key] = [];
      lifeCycles[key].push(fn);
    });
  });
  const result = {} as T;
  Object.entries(lifeCycles).forEach(([key, fns]: [keyof T, any[]]) => {
    result[key] = ((...args: any[]) => {
      (option.reverse?.includes(key) ? fns.slice().reverse() : fns).forEach(
        (fn) => fn(...args)
      );
    }) as any;
  });
  return result;
}
