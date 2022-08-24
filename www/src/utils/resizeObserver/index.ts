export const resizeObserver = (element?: HTMLElement) => {
  let observer: ResizeObserver | undefined;

  const api = {
    observe: <T extends keyof ResizeObserverEntry>(
      prop: keyof ResizeObserverEntry,
      callback: (value: ResizeObserverEntry[T]) => void
    ) => {
      observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const value = entry[prop] as ResizeObserverEntry[T];
          if (value) {
            callback(value);
          }
        }
      });

      element && observer.observe(element);
      return api;
    },
    unobserve: () => {
      observer && element && observer.unobserve(element);
      return this;
    },
  };

  return api;
};
