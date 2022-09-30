import {
  Accessor,
  Component,
  createContext,
  createSignal,
  JSX,
  Setter,
  useContext,
} from 'solid-js';

const SidebarContext = createContext<{
  open: Accessor<boolean>;
  setOpen: Setter<boolean>;
}>();
export const useSidebarContext = () => useContext(SidebarContext);

export interface SidebarProviderProps {
  children: JSX.Element;
}

export const SidebarProvider: Component<SidebarProviderProps> = (props) => {
  const [open, setOpen] = createSignal(false);

  return (
    <SidebarContext.Provider
      value={{
        open,
        setOpen,
      }}
    >
      {props.children}
    </SidebarContext.Provider>
  );
};
