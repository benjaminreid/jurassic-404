<script>
  import { afterUpdate, createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  const BACKSPACE = 8;
  const RETURN = 13;
  const MAX_ATTEMPTS = 3;
  const parkStatus = {
    phones: false,
    fences: false,
    security: false,
  };

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
      const [command, arg1, arg2] = input.split(" ");

      switch (command) {
        case "help":
          addLine({
            value: "commands: help, status, reboot, moff, trex",
            type: "notice",
          });
          break;
        case "status":
          printSystemStatus();
          break;
        case "reboot":
          if (Object.keys(parkStatus).includes(arg1)) {
            parkStatus[arg1] = true;
            printSystemStatus();

            if (Object.values(parkStatus).every((val) => val === true)) {
              rebootPark();
            }
          } else if (typeof arg1 === "undefined") {
            addLine({
              value: "missing parameter, try reboot <system> or status",
            });
          } else {
            handleFailedCommand();
          }
          break;
        case "sudo":
          if (arg1 === "reboot" && arg2 === "all") {
            parkStatus.fences = true;
            parkStatus.phones = true;
            parkStatus.security = true;
            printSystemStatus();
            rebootPark();
          }
          break;
        case "moff":
          window.open("https://www.youtube.com/watch?v=P8EBKPuKdR4", "_blank");
          break;
        case "trex":
          window.open("https://www.youtube.com/watch?v=--40RLF5UGo", "_blank");
          break;
        default:
          handleFailedCommand();
          break;
      }
    }

    input = "";
  }

  function rebootPark() {
    addLine({
      value: "Jurassic Park is back online!",
      type: "success",
    });

    dispatch("command", {
      type: "park-rebooted",
    });
  }

  function printSystemStatus() {
    addLine({
      value: "phones: offline",
      type: parkStatus.phones ? "success" : "error",
    });
    addLine({
      value: "fences: electricity de-activated",
      type: parkStatus.fences ? "success" : "error",
    });
    addLine({
      value: "security: systems malfunction",
      type: parkStatus.security ? "success" : "error",
    });
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
      dispatch("command", {
        type: "fail",
      });
    }, 1000);

    setTimeout(() => {
      for (let i = 0; i < 30; i++) {
        setTimeout(() => {
          addLine({ value: "YOU DIDN'T SAY THE MAGIC WORD!" });

          if (i === 29) {
            addLine({ value: `<a href="">Reboot and try again</a>` });
          }
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
        <span class="input">{@html line.value}</span>
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

  :global(.line a) {
    color: white;
    text-decoration: underline;
  }

  .line-error {
    color: #ff7272;
  }

  .line-notice {
    color: #ccca23;
  }

  .line-success {
    color: #4dd84d;
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
