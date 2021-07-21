<script>
  const BACKSPACE = 8;
  const RETURN = 13;

  let lines = [
    {
      value: "Jurassic Park, System Security Interface",
    },
    {
      value: "Version 4.0.5, Alpha E",
    },
    {
      value: "Ready...",
    },
    {
      value: "Park offline, reboot required",
    },
    {
      value: "Session restored - type help for command list",
    },
  ];

  let input = "";

  function processInput() {
    if (input.length === 0) {
      addLine({ value: "command not found. type help for command list" });
    } else {
      const [command] = input.split(" ");

      switch (command) {
        case "help":
          addLine({ value: "commands: help, status, reboot, moff, trex" });
          break;
        default:
          addLine({ value: "access: PERMISSION DENIED." });
          break;
      }
    }

    input = "";
  }

  function addLine(line) {
    lines = [...lines, line];
  }

  function addToInput(key) {
    if (/^[a-z0-9\s]$/i.test(key)) {
      input += key;
    }
  }

  function removeCharacterFromInput() {
    input = input.slice(0, -1);
  }

  function handleKeydown(event) {
    const code = event.which;

    switch (code) {
      case BACKSPACE:
        removeCharacterFromInput();
        break;

      case RETURN:
        processInput();
        break;

      default:
        addToInput(event.key);
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="container">
  <ol class="lines">
    {#each lines as line}
      <li class="line">
        {line.value}
      </li>
    {/each}

    <li class="line">
      <span class="prompt">&gt;</span>
      <span class="input">
        {input}
      </span>
      <span class="blinker" />
    </li>
  </ol>
</div>

<style>
  @keyframes blink {
    50% {
      opacity: 0;
    }
  }

  .container {
    --lineHeight: 26px;
    background-color: #0a2d7f;
    padding: 8px;
    color: #ffffff;
    font-family: "MonoLisa", "Courier", sans-serif;
    font-size: 18px;
    line-height: var(--lineHeight);
  }

  .lines {
    list-style: none;
    margin: 0;
    padding-left: 0;
  }

  .line {
    display: flex;
    height: var(--lineHeight);
  }

  .prompt {
    display: block;
    margin-right: 4px;
  }

  .input {
    white-space: pre;
  }

  .blinker {
    display: block;
    width: 12px;
    height: var(--lineHeight);
    background-color: #1ba793;
    animation: blink 1s step-start 0s infinite;
  }
</style>
