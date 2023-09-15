<script lang="ts">
	
	
    import { Page } from 'konsta/svelte';
    import Office from '../rooms/Office.svelte';
    
    import { GetItems } from '../shared/services/openhabClient';
    
    
    var items = GetItems()
    .then((result) => {
        return result;
    });
</script>

<svelte:head>
	<title>ddd</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>


<Page colors={{"bgIos": "bg-transparent"}}>
    {#await items}
        <div>load</div>
    {:then allItems}
	  <Office allItems={allItems}></Office> 
    {:catch error}
        <div>error</div>
    {/await}
</Page>
