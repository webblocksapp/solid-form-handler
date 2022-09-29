import logo from '@images/logo.svg';
import npmLogo from '@images/npm-logo.png';

export const MAIN_MENU = [
  { text: 'Docs', route: '/docs' },
  { text: 'API', route: '/api' },
];

export const MAIN_RIGHT_MENU = [
  {
    icon: <i class="fa fa-github" aria-hidden="true"></i>,
    route: 'https://github.com/webblocksapp/solid-form-handler',
    external: true,
  },
  {
    icon: (
      <img
        src={npmLogo}
        width={28}
        style="margin-top: 2px; filter: grayscale(100%);"
      />
    ),
    route: 'https://www.npmjs.com/package/solid-form-handler',
    external: true,
  },
  {
    icon: (
      <img
        src={logo}
        width={30}
        style="margin-top: 2px; filter: grayscale(100%);"
      />
    ),
    route: 'https://www.solidjs.com/',
    external: true,
  },
];
