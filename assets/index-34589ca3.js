const e=`import { useNavigate, useRouteData } from '@solidjs/router';
import { Component, onMount } from 'solid-js';

export interface RedirectProps {
  href?: string;
}

export const Redirect: Component<RedirectProps> = (props) => {
  const routeData = useRouteData<RedirectProps>();
  const navigate = useNavigate();

  onMount(() => {
    const href = props.href || routeData.href;
    href && navigate(href, { replace: true });
  });

  return <></>;
};
`;export{e as default};
//# sourceMappingURL=index-34589ca3.js.map