<script>
  export let name;
</script>

<div class="container">
  <header>
    {name}
  </header>
  <slot />
</div>

<style>
  .container {
    --grey: #cccccc;
    border: solid 3px var(--grey);
  }

  header {
    background-color: var(--grey);
  }
</style>
