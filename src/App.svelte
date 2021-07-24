<script>
  import BackgroundMusic from "./BackgroundMusic.svelte";
  import Desktop from "./Desktop.svelte";
  import Terminal from "./Terminal.svelte";
  import Window from "./Window.svelte";
</script>

<Desktop>
  <Window name="Jungle Babes 1947 by Al Moore" left={565} top={235}>
    <img
      src="http://nouveller.com/static/img/404/jungle-babe.jpg"
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
    <Terminal />
  </Window>
</Desktop>

<BackgroundMusic />
