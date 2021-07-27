<script>
  import Window from "./Window.svelte";
</script>

<Window name="Magic_word.app" width={299} height={224} top={360} left={340}>
  <img
    width="299"
    height="224"
    src="https://jurassic-404.s3.eu-west-2.amazonaws.com/ah-ah-ah.gif"
    alt="Ah Ah Ah!"
  />
</Window>

<audio autoplay>
  <source
    src="https://jurassic-404.s3.eu-west-2.amazonaws.com/ah-ah-ah.mp3"
    type="audio/mp3"
  />
  <track kind="captions" />
</audio>
