<script lang="ts">
    import type OpenHabItem from "../shared/services/OpenHabItem";
    import Header from "./Header.svelte";
    import DimmerWrapper from "../devices/light/DimmerWrapper.svelte";
    import ToggleWrapper from "../devices/switch/toggleWrapper.svelte";
    export let allItems: OpenHabItem[] = [];
</script>

<div>
    <Header>Brunos</Header>
    <div class="flex flex-row flex-wrap">
        <DimmerWrapper
            label="Taklampa"
            {allItems}
            dimmerItemName="BrunosroomLamp_dimmer"
        />
        <DimmerWrapper
            label="Golvlampa"
            {allItems}
            dimmerItemName="Brunoslampstand_brightness"
            switchItemName="Brunoslampstand_Switch"
        />
        <DimmerWrapper
            label="Golvlampa"
            {allItems}
            dimmerItemName="BrunosWindowLight_brightness"
            switchItemName="BrunosWindowLight_Switch"
        />
    </div>
</div>
