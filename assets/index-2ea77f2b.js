const n=`import {
  Accessor,
  Component,
  createContext,
  createSignal,
  JSX,
  useContext,
} from 'solid-js';

const SidebarContext = createContext<{
  active: Accessor<boolean>;
  open: () => void;
  close: () => void;
  toggle: () => void;
}>();
export const useSidebarContext = () => useContext(SidebarContext);

export interface SidebarProviderProps {
  children: JSX.Element;
}

export const SidebarProvider: Component<SidebarProviderProps> = (props) => {
  const [active, setActive] = createSignal(false);

  const open = () => {
    setActive(true);
  };

  const close = () => {
    setActive(false);
  };

  const toggle = () => {
    setActive((prev) => !prev);
  };

  return (
    <SidebarContext.Provider
      value={{
        open,
        close,
        active,
        toggle,
      }}
    >
      {props.children}
    </SidebarContext.Provider>
  );
};
`;export{n as default};
//# sourceMappingURL=index-2ea77f2b.js.map
