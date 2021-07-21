<script>
  import Desktop from "./Desktop.svelte";
  import Terminal from "./Terminal.svelte";
  import Window from "./Window.svelte";
</script>

<Desktop>
  <Window name="Central Park Control Console" width={620} height={440}>
    <Terminal />
  </Window>
</Desktop>
