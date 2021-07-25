<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function close() {
    dispatch("close");
  }
</script>

<div class="desktop">
  <div class="header">
    <div class="wrapper">
      <button on:click|preventDefault={close}>Close</button>
    </div>
  </div>
  <div class="wrapper">
    <slot />
  </div>
</div>

<style>
  .desktop {
    all: initial;
    background-color: rgba(156, 156, 206, 0.7);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2147483647;
  }

  .wrapper {
    max-width: 1024px;
    margin: 0 auto;
    position: relative;
  }

  .header {
    background-color: #cccccc;
    box-shadow: 0 0 1px #000, 1px 1px 2px #000;
    height: 17px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }

  button {
    display: block;
    height: 17px;
    font-family: "MonoLisa", "Courier", sans-serif;
    line-height: 17px;
    background-color: transparent;
    font-size: 12px;
    border: none;
    padding: 0;
    font-weight: bold;
    margin: 0 0 0 auto;
    cursor: pointer;
  }
</style>
