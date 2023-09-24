<script lang="ts">
    import type OpenHabItem from "../shared/services/OpenHabItem";
    import Header from "./Header.svelte";
    import DimmerWrapper from "../devices/light/DimmerWrapper.svelte";
    import ToggleWrapper from "../devices/switch/toggleWrapper.svelte";
    export let allItems: OpenHabItem[] = [];
</script>

<div>
    <Header>Sovrum</Header>
    <div class="flex flex-row flex-wrap">
        <DimmerWrapper
            label="Taklampa"
            {allItems}
            dimmerItemName="BedroomLamp_dimmer"
        />
        <DimmerWrapper
            label="Byrålampa"
            {allItems}
            dimmerItemName="bedroomdrawerlight_brightness"
            switchItemName="bedroomdrawerlight_Switch"
        />
        <DimmerWrapper
            label="Höger sänglampa"
            {allItems}
            dimmerItemName="Bedromrightbedlamp_brightness"
            switchItemName="Bedromrightbedlamp_Switch"
        />
        <DimmerWrapper
            label="Vänster sänglampa"
            {allItems}
            dimmerItemName="Bedromleftbedlamp_brightness"
            switchItemName="Bedromleftbedlamp_Switch"
        />
    </div>
</div>
