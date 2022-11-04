import { Component, onMount } from 'solid-js';

export const AdBlockVertical: Component = () => {
  onMount(() => {
    const w: any = window;
    (w.adsbygoogle = w.adsbygoogle || []).push({});
  });

  return (
    <ins
      class="adsbygoogle"
      style="display:inline-block;width:180px;height:728px"
      data-ad-client="ca-pub-5056055199537470"
      data-ad-slot="4665847862"
    ></ins>
  );
};
