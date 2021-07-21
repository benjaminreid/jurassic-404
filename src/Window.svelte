<script>
  export let name;
  export let width;
  export let height;
</script>

<div class="container" style="width: {width}px; height: {height}px;">
  <header>
    {name}
  </header>
  <slot />
</div>

<style>
  .container {
    --grey: #cccccc;
    border: solid 3px var(--grey);
    display: flex;
    flex-direction: column;
  }

  header {
    background-color: var(--grey);
  }
</style>
