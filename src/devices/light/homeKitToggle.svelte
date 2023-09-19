<script script lang="ts">
  export let switchState: boolean;
  export let switchStateChange: (state: boolean) => void;

  const toggle = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    switchState = !switchState;
    switchStateChange(switchState);
  };
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="flex flex-col content-center items-center h-120">
  <div
    class={"w-44 h-120 flex flex-col bg-gray-100 rounded-3xl transition-all duration-100 relative "}
    on:click={(e) => toggle(e)}
  >
    <div
      class={" absolute rounded-3xl ml-2 mr-2 w-40 h-60 transition-all duration-150 " +
        (switchState ? "bg-yellow-400 top-0 mt-2" : "bg-gray-500 top-60 -mt-2")}
    />
  </div>
</div>
