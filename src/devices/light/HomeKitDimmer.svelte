<script script lang="ts">
  
  export let dimmerValue: number;
  export let dimmerValueChange: (state: number) => void;
  let parentDiv: HTMLDivElement | undefined;

  const setDimmer = (e: MouseEvent) => {
    if (!parentDiv) {
      return;
    }

    const div = parentDiv as HTMLDivElement;
    let bounds = div.getBoundingClientRect();

    let y = Math.floor(e.clientY - bounds.top);
    const diff = bounds.bottom - bounds.top;

    dimmerValue = Math.floor(((diff - y) / diff) * 100);

    dimmerValueChange(dimmerValue);
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="flex flex-col content-center items-center h-120">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    bind:this={parentDiv}
    class="w-44 h-120 flex flex-col bg-gray-100 rounded-3xl transition-all duration-100 relative overflow-hidden cursor-pointer"
    on:click={(e) => setDimmer(e)}
  >
    <div
      class="bottom-0 absolute w-44 transition-all duration-150 bg-yellow-400"
      style={`top: ${100 - dimmerValue}%`}
    />
  </div>
</div>
