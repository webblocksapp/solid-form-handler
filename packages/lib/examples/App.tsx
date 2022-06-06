import { Link, useRoutes } from 'solid-app-router';
import { Component } from 'solid-js';
import { mainRoutes } from '@routes';

export const App: Component = () => {
  return (
    <div style="display: grid; grid-template-columns: 200px 1fr">
      <div>
        <div>
          <Link href="checkbox-impl">checkbox-impl</Link>
        </div>
        <div>
          <Link href="select-impl">select-impl</Link>
        </div>
        <div>
          <Link href="text-input-impl">text-input-impl</Link>
        </div>
        <div>
          <Link href="form-impl">form-impl</Link>
        </div>
        <div>
          <Link href="complex-form-impl">complex-form-impl</Link>
        </div>
      </div>
      <div>{useRoutes(mainRoutes)}</div>
    </div>
  );
};
