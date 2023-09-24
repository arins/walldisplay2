<script script lang="ts">
    import type OpenHabItem from "../../shared/services/OpenHabItem";
    import ToggleCard from "../light/ToggleCard.svelte";

    export let allItems: OpenHabItem[] = [];
    export let label: string;

    export let switchItemName: String;

    let switchItem: OpenHabItem | undefined = undefined;

    const foundItem = allItems.find((x) => x.name === switchItemName);
    $: if (foundItem) {
        switchItem = foundItem;
    }
</script>

{#if switchItem}
    <ToggleCard {label} {switchItem} />
{/if}
