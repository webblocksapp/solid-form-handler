import { Code } from '@components';
import { NavLink } from '@solidjs/router';
import { getRaw } from '@utils';
import { Component } from 'solid-js';

export const QuickStart: Component = () => (
  <>
    <h2 class="mb-4 border-bottom">Quick Start</h2>
    <p>
      You can start by creating your own form field{' '}
      <NavLink href="../components">components</NavLink> by using each of the
      code given on the docs website. The following is a final implementation of
      them:
    </p>
    <Code content={getRaw('quickStart1')} />
  </>
);
