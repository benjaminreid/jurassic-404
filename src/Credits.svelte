<script>
  import Window from "./Window.svelte";
</script>

<div class="credits">
  <Window name="Credits" position="relative" width={270} height={75}>
    <div class="background">
      <p>
        Brought to you by
        <a
          href="https://twitter.com/benjaminreid"
          target="_blank"
          rel="noopener"
        >
          @benjaminreid
        </a>
        and
        <a href="https://twitter.com/iamkeir" target="_blank" rel="noopener">
          @iamkeir
        </a>
      </p>
    </div>
  </Window>
</div>

<style>
  .credits {
    position: fixed;
    bottom: 32px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    z-index: 1000;
  }

  .background {
    background-color: #fff;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
  }

  p {
    margin: 0;
    text-align: center;
  }

  a {
    color: #1da1f2;
    font-weight: 500;
  }
</style>
