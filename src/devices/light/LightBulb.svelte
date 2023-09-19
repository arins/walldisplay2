<script script lang="ts">
  import Icon from "svelte-icons-pack/Icon.svelte";
  import lightbulb from "svelte-icons-pack/fa/FaSolidLightbulb";

  export let switchState: boolean;
  export let switchChange: (level: boolean) => void;
  export let switchChangeDisabled: boolean | undefined = false;
  const toggle = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (switchChangeDisabled) {
      return;
    }
    switchState = !switchState;
    switchChange(switchState);
  };
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class={"p-2 rounded-3xl mr-3 cursor-pointer " +
    (switchState ? "text-black bg-yellow-400" : "text-white bg-gray-700")}
  on:click={(e) => toggle(e)}
>
  <Icon
    src={lightbulb}
    className={"h-4 w-4 md:h-8 md:w-8 transition-colors " +
      (switchState ? "text-white" : "text-yellow-600")}
  />
</div>
