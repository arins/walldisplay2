<script lang="ts">
    import type OpenHabItem from "../shared/services/OpenHabItem";
    import Header from "./Header.svelte";
    import DimmerWrapper from "../devices/light/DimmerWrapper.svelte";
    export let allItems: OpenHabItem[] = [];
</script>

<div>
    <Header>Kontor</Header>
    <div class="flex flex-row flex-wrap">
        <DimmerWrapper
            label="Skrivbordslampa"
            {allItems}
            dimmerItemName="Officedesklamp_brightness"
            switchItemName="Officedesklamp_Switch"
        />
       
        <DimmerWrapper
            label="Fönsterlampa"
            {allItems}
            dimmerItemName="Officewindowlamp_brightness"
            switchItemName="Officewindowlamp_Switch"
        />
        <DimmerWrapper
            label="Sänglampa"
            {allItems}
            dimmerItemName="Officebedlamp_brightness"
            switchItemName="Officebedlamp_Switch"
        />
        <DimmerWrapper
            label="Hyllampa"
            {allItems}
            dimmerItemName="Office_Shelf_light_brightness"
            switchItemName="Office_Shelf_light_Switch"
        />
    </div>
</div>
