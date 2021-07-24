<script>
  import { afterUpdate } from "svelte";

  const BACKSPACE = 8;
  const RETURN = 13;
  const MAX_ATTEMPTS = 3;

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
      type: "error",
    },
    {
      value: "Session restored - type help for command list",
      type: "notice",
    },
  ];

  let container;
  let input = "";
  let attempts = 0;
  $: failed = attempts >= MAX_ATTEMPTS;

  afterUpdate(() => {
    container.scrollTop = container.scrollHeight;
  });

  function processInput() {
    addLine({ value: input, type: "prompt" });

    if (input.length === 0) {
      addLine({ value: "command not found. type help for command list" });
    } else {
      const [command] = input.split(" ");

      switch (command) {
        case "help":
          addLine({
            value: "commands: help, status, reboot, moff, trex",
            type: "notice",
          });
          break;
        case "status":
          addLine({ value: "phones offline" });
          addLine({ value: "perimeter fences down" });
          addLine({ value: "security systems de-activated" });
          break;
        default:
          handleFailedCommand();
          break;
      }
    }

    input = "";
  }

  function handleFailedCommand() {
    attempts += 1;

    if (attempts >= MAX_ATTEMPTS) {
      showFailure();
    } else {
      addLine({ value: "access: PERMISSION DENIED." });
    }
  }

  function showFailure() {
    addLine({ value: "access: PERMISSION DENIED...and......" });

    setTimeout(() => {
      for (let i = 0; i < 30; i++) {
        setTimeout(() => {
          addLine({ value: "YOU DIDN'T SAY THE MAGIC WORD!" });
        }, 25 * i);
      }
    }, 1000);
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
    if (attempts >= MAX_ATTEMPTS) {
      return;
    }

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

<div class="container" bind:this={container}>
  <ol class="lines">
    {#each lines as line}
      <li class="line line-{line.type ?? 'default'}">
        {#if line.type === "prompt"}
          <span class="prompt">&gt;</span>
        {/if}
        <span class="input">{line.value}</span>
      </li>
    {/each}

    {#if !failed}
      <li class="line">
        <span class="prompt">&gt;</span>
        <span class="input">
          {input}
        </span>
        <span class="blinker" />
      </li>
    {/if}
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
    padding: 16px;
    color: #ffffff;
    font-family: "MonoLisa", "Courier", sans-serif;
    font-size: 18px;
    line-height: var(--lineHeight);
    flex-grow: 1;
    display: flex;
    flex-direction: column-reverse;
    overflow: scroll;
  }

  .lines {
    list-style: none;
    margin: 0;
    padding-left: 0;
  }

  .line {
    display: flex;
  }

  .line-error {
    color: #ff7272;
  }

  .line-notice {
    color: #ccca23;
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
