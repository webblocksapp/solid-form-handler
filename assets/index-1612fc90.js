const index = "import {\n  Accessor,\n  Component,\n  createContext,\n  createSignal,\n  JSX,\n  useContext,\n} from 'solid-js';\n\nconst SidebarContext = createContext<{\n  active: Accessor<boolean>;\n  open: () => void;\n  close: () => void;\n  toggle: () => void;\n}>();\nexport const useSidebarContext = () => useContext(SidebarContext);\n\nexport interface SidebarProviderProps {\n  children: JSX.Element;\n}\n\nexport const SidebarProvider: Component<SidebarProviderProps> = (props) => {\n  const [active, setActive] = createSignal(false);\n\n  const open = () => {\n    setActive(true);\n  };\n\n  const close = () => {\n    setActive(false);\n  };\n\n  const toggle = () => {\n    setActive((prev) => !prev);\n  };\n\n  return (\n    <SidebarContext.Provider\n      value={{\n        open,\n        close,\n        active,\n        toggle,\n      }}\n    >\n      {props.children}\n    </SidebarContext.Provider>\n  );\n};\n";

export { index as default };
