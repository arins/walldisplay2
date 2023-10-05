<script lang="ts">
	
	
    import { Page, App } from 'konsta/svelte';
    import Office from '../rooms/Office.svelte';
    
    import { GetItems } from '../shared/services/openhabClient';
    import LivingRoom from '../rooms/LivingRoom.svelte';
    import Hallway from '../rooms/Hallway.svelte';
    import Huberts from '../rooms/Huberts.svelte';
    import Kitchen from '../rooms/Kitchen.svelte';
    import Bedroom from '../rooms/Bedroom.svelte';
    import Brunos from '../rooms/Brunos.svelte';
    import Shower from '../rooms/Shower.svelte';
    import Terrace from '../rooms/Terrace.svelte';
    import Bathroom from '../rooms/Bathroom.svelte';
    
    
    var items = GetItems()
    .then((result) => {
        return result;
    });
</script>

<svelte:head>
	<title>ddd</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>


<Page colors={{"bgIos": ""}}  >
    {#await items}
        <div>load</div>
    {:then allItems}
	  
      <LivingRoom allItems={allItems}></LivingRoom> 
      <Hallway allItems={allItems}></Hallway> 
      <Huberts allItems={allItems}></Huberts> 
      <Kitchen allItems={allItems}></Kitchen> 
      <Bedroom allItems={allItems}></Bedroom> 
      <Brunos allItems={allItems}></Brunos> 
      <Office allItems={allItems}></Office> 
      <Shower allItems={allItems}></Shower> 
      <Bathroom allItems={allItems}></Bathroom> 
      <Terrace allItems={allItems}></Terrace>
    {:catch error}
        <div>error</div>
    {/await}
</Page>
