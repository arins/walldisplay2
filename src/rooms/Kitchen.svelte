<script lang="ts">
    import type OpenHabItem from "../shared/services/OpenHabItem";
    import Header from "./Header.svelte";
    import DimmerWrapper from "../devices/light/DimmerWrapper.svelte";
    import ToggleWrapper from "../devices/switch/toggleWrapper.svelte";
    export let allItems: OpenHabItem[] = [];
</script>

<div>
    <Header>Kök</Header>
    <div class="flex flex-row flex-wrap">
        <DimmerWrapper
            label="Bordslampa"
            {allItems}
            dimmerItemName="KitchenTableLamp_dimmer"
        />
        <DimmerWrapper
            label="Spottar"
            {allItems}
            dimmerItemName="Kitchenspotlights_dimmer"
        />
        <DimmerWrapper
            label="Diskbänk"
            {allItems}
            dimmerItemName="Kitchensinkspotlights_brightness"
            switchItemName="Kitchensinkspotlights_Switch"
        />
        <ToggleWrapper
            label="Fönsterlampa"
            {allItems}
            switchItemName="Kitchenwindowlamp_Strom"
        />
    </div>
</div>
