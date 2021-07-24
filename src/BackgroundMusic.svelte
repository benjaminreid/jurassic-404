<script>
  let sound;

  function play() {
    sound?.play();
  }
</script>

<svelte:window on:click={play} on:keydown={play} />

<audio bind:this={sound}>
  <source
    src="https://jurassic-404.s3.eu-west-2.amazonaws.com/dennis-steals-the-embryos.mp3"
    type="audio/mp3"
  />
  <track kind="captions" />
</audio>
