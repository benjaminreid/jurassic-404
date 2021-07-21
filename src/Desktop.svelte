<div class="desktop">
  <div class="wrapper">
    <slot />
  </div>
</div>

<style>
  .desktop {
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
</style>
