const index = "import { useNavigate, useRouteData } from '@solidjs/router';\nimport { Component, onMount } from 'solid-js';\n\nexport interface RedirectProps {\n  href?: string;\n}\n\nexport const Redirect: Component<RedirectProps> = (props) => {\n  const routeData = useRouteData<RedirectProps>();\n  const navigate = useNavigate();\n\n  onMount(() => {\n    const href = props.href || routeData.href;\n    href && navigate(href, { replace: true });\n  });\n\n  return <></>;\n};\n";

export { index as default };
