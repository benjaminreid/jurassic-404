<script>
  export let name;
  export let width;
  export let height;
  export let left = 0;
  export let top = 0;

  let moving = false;

  function onMouseDown() {
    moving = true;
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
  style="width: {width}px; height: {height}px; left: {left}px; top: {top}px;"
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
    border: solid 3px var(--grey);
    display: flex;
    flex-direction: column;
    position: absolute;
  }

  header {
    background-color: var(--grey);
    cursor: move;
    user-select: none;
  }
</style>
