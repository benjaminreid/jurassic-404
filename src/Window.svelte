<script>
  export let name;
  export let width = "auto";
  export let height = "auto";
  export let left = 0;
  export let top = 0;
  export let position = "absolute";

  const HEADER_HEIGHT = 27;
  let moving = false;
  let zIndex = 1;

  function onMouseDown() {
    moving = true;
    zIndex += 3;
  }

  function onMouseMove(e) {
    if (moving) {
      left += e.movementX;
      top += e.movementY;
    }
  }

  function onMouseUp() {
    moving = false;
  }
</script>

<div
  class="container"
  style="width: {width}px; height: {height +
    HEADER_HEIGHT}px; left: {left}px; top: {top}px; position: {position}; z-index: {zIndex};"
>
  <header on:mousedown={onMouseDown}>
    {name}
  </header>
  <slot />
</div>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />

<style>
  .container {
    --grey: #cccccc;
    background-color: var(--grey);
    border: solid 5px var(--grey);
    box-shadow: 0 0 1px #000, 1px 1px 2px #000;
    display: flex;
    flex-direction: column;
  }

  .container::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: solid 1px rgba(0, 0, 0, 0.8);
    pointer-events: none;
  }

  .container::after {
    content: "";
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    border: solid 1px rgba(255, 255, 255, 0.8);
    pointer-events: none;
  }

  header {
    height: 27px;
    line-height: 27px;
    background-color: var(--grey);
    cursor: move;
    user-select: none;
    padding: 0 8px;
    font-family: "MonoLisa", "Courier", sans-serif;
    font-size: 13px;
    font-weight: bold;
    box-shadow: inset 0 2px 1px rgba(255, 255, 255, 0.8);
    border-bottom: solid 1px black;
  }
</style>
