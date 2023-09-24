<script lang="ts">
	
	
    import { Page, App } from 'konsta/svelte';
    import Office from '../rooms/Office.svelte';
    
    import { GetItems } from '../shared/services/openhabClient';
    import LivingRoom from '../rooms/LivingRoom.svelte';
    
    
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
	  <Office allItems={allItems}></Office> 
      <LivingRoom allItems={allItems}></LivingRoom> 
    {:catch error}
        <div>error</div>
    {/await}
</Page>
