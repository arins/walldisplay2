<script script lang="ts">
  export let switchState: boolean | undefined;
  export let label: string;
  export let dimmerValue: number | undefined = undefined;
</script>

<div class="flex flex-col w-18">
  <div
    class={"truncate select-none font-bold " +
      (switchState ? "text-black" : "text-white")}
  >
    {label}
  </div>
  <div class={"text-gray-500 font-bold select-none"}>
    {switchState
      ? typeof dimmerValue === "number"
        ? dimmerValue + "%"
        : "På"
      : "Av"}
  </div>
</div>
