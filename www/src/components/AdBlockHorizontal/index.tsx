import { Component, onMount } from 'solid-js';
import './index.css';

export const AdBlockHorizontal: Component = () => {
  onMount(() => {
    const w: any = window;
    (w.adsbygoogle = w.adsbygoogle || []).push({});
  });

  return (
    <ins
      class="adsbygoogle mt-5 ad-horizontal"
      style="display:block"
      data-ad-client="ca-pub-5056055199537470"
      data-ad-slot="4665847862"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};
