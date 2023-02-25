import { formatObjectPath, get, isNumber } from '@utils';
import { createStore as baseCreateStore } from 'solid-js/store';

export const createStore = <T extends Object>(data: T): [T, (path: string, value: any) => void] => {
  const [store, setBaseStore] = baseCreateStore<any>(data);

  const setStore = (path: string, value: any) => {
    const arrPath = formatObjectPath(path).split('.');
    let builtPath = '';

    for (let i = 0; i < arrPath.length; i++) {
      const dot = builtPath ? '.' : '';
      const currentKey = arrPath[i];
      const nextKey = arrPath[i + 1];
      builtPath = `${builtPath}${dot}${currentKey}`;

      const currentValue = get(store, builtPath);
      const builtPathArr = builtPath.split('.') as [];
      let obj: any = undefined;

      if (isNumber(currentKey) && isNumber(nextKey)) obj = [];
      if (!isNumber(currentKey) && isNumber(nextKey)) obj = [];
      if (isNumber(currentKey) && !isNumber(nextKey)) obj = {};
      if (!isNumber(currentKey) && !isNumber(nextKey)) obj = {};
      if (currentValue === undefined && nextKey !== undefined) setBaseStore(...builtPathArr, obj);
      if (nextKey === undefined) setBaseStore(...builtPathArr, value);
    }
  };

  return [store, setStore];
};
