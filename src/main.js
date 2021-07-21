import App from "./App.svelte";

const $root = document.createElement("div");
document.body.appendChild($root);

const app = new App({
  target: $root,
});

export default app;
