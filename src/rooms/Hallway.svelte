<script lang="ts">
    import type OpenHabItem from "../shared/services/OpenHabItem";
    import Header from "./Header.svelte";
    import DimmerWrapper from "../devices/light/DimmerWrapper.svelte";
    import ToggleWrapper from "../devices/switch/toggleWrapper.svelte";
    export let allItems: OpenHabItem[] = [];
</script>

<div>
    <Header>Hall</Header>
    <div class="flex flex-row flex-wrap">
        <DimmerWrapper
            label="Spottar"
            {allItems}
            dimmerItemName="Hallwayspotlights_Dimmer"
        />
        <ToggleWrapper
            label="Lampfot"
            {allItems}
            switchItemName="Hallwaylampstand_Strom"
        />
    </div>
</div>
