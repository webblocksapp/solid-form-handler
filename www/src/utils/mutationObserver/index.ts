export const mutationObserver = (element?: HTMLElement) => {
  let observer: MutationObserver | undefined;

  const api = {
    observe: <T extends keyof MutationRecord>(
      prop: keyof MutationRecord,
      callback: (value: MutationRecord[T]) => void,
      options: Partial<MutationObserverInit> = { childList: true }
    ) => {
      observer = new MutationObserver((mutationList) => {
        mutationList.forEach((mutation) => {
          mutation[prop] && callback(mutation[prop] as MutationRecord[T]);
        });
      });

      element && observer.observe(element, options);
      return api;
    },
    disconnect: () => {
      observer && element && observer.disconnect();
      return this;
    },
  };

  return api;
};
