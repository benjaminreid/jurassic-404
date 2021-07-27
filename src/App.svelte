<script>
  import BackgroundMusic from "./BackgroundMusic.svelte";
  import Credits from "./Credits.svelte";
  import Dennis from "./Dennis.svelte";
  import Desktop from "./Desktop.svelte";
  import Terminal from "./Terminal.svelte";
  import Window from "./Window.svelte";

  let parkOnline = false;
  let show = true;
  let failed = false;

  function handleCommand(event) {
    switch (event.detail.type) {
      case "park-rebooted":
        parkOnline = true;
        break;
      case "fail":
        failed = true;
        break;
    }
  }

  function shutdown() {
    show = false;
  }
</script>

{#if show}
  <Desktop on:close={shutdown}>
    <Window name="Jungle Babes 1947 by Al Moore" left={565} top={235}>
      <img
        src="https://jurassic-404.s3.eu-west-2.amazonaws.com/jungle-babe.jpg"
        alt="Jungle Babes by Al Moore"
        width="350"
        height="400"
      />
    </Window>

    <Window
      name="Central Park Control Console"
      width={620}
      height={440}
      left={-20}
      top={135}
    >
      <Terminal on:command={handleCommand} />
    </Window>

    {#if failed}
      <Dennis />
    {/if}

    <Credits />

    {#if parkOnline}
      <Window
        name="Jurassic Park CCTV"
        width={640}
        height={360}
        top={90}
        left={200}
      >
        <video
          autoplay
          width="640"
          height="360"
          poster="https://jurassic-404.s3.eu-west-2.amazonaws.com/jp-back-in-business.jpg"
        >
          <source
            src="https://jurassic-404.s3.eu-west-2.amazonaws.com/jp-back-in-business.webm"
            type="video/webm"
          />
          <track kind="captions" />
        </video>
      </Window>
    {:else}
      <BackgroundMusic />
    {/if}
  </Desktop>
{/if}
