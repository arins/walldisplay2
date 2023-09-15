<script script lang="ts">
    


    export let switchState: boolean;
    export let label: string;


</script>


<div class="flex flex-col w-20">
  <div class="truncate select-none text-black">{label}</div>
  <div class="text-gray-200 select-none">
    {switchState ? "PÅ" : "AV"}
  </div>
</div>
