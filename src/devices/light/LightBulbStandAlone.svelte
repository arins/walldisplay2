<script script lang="ts">
    import Icon from 'svelte-icons-pack/Icon.svelte';
    import lightbulb from 'svelte-icons-pack/fa/FaSolidLightbulb';


    export let switchState: boolean;
    export let switchChange: (level: boolean) => void;
    export let switchChangeDisabled: boolean |undefined = false;
    const toggle = (e:any)=>{
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
<div class="p-2 rounded-3xl mr-3" on:click={(e) => toggle(e)}>
  <Icon src={lightbulb}
    className={
      "h-8 w-8 transition-colors " +
      (switchState ? "text-yellow-400" : "text-gray-700")
    }
  />
</div>
