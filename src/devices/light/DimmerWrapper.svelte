<script script lang="ts">
    import type OpenHabItem from "../../shared/services/OpenHabItem";
    import DimmableLightCard from "./DimmableLightCard.svelte";

	export let allItems: OpenHabItem[] = [];
    export let label: string;
    export let dimmerItemName: string;
    export let switchItemName: String | undefined;

    let switchItem: OpenHabItem | undefined = undefined;
    let dimmerItem: OpenHabItem | undefined = undefined;

    $: if(switchItemName)
    {
        const foundItem = allItems.find((x) => x.name === switchItemName);
        if (foundItem) {
            console.log(switchItem)
            switchItem = foundItem;
        }
    }
    const foundDimmerItem = allItems.find((x) => x.name === dimmerItemName);
    $: if (foundDimmerItem) {
        console.log(foundDimmerItem)
        dimmerItem = foundDimmerItem;
    }

</script>


{#if dimmerItem}

    <DimmableLightCard label={label} switchItem={switchItem} dimmerItem={dimmerItem}></DimmableLightCard>
{/if}
