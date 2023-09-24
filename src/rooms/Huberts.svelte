<script lang="ts">
    import type OpenHabItem from "../shared/services/OpenHabItem";
    import Header from "./Header.svelte";
    import DimmerWrapper from "../devices/light/DimmerWrapper.svelte";
    import ToggleWrapper from "../devices/switch/toggleWrapper.svelte";
    export let allItems: OpenHabItem[] = [];
</script>

<div>
    <Header>Huberts rum</Header>
    <div class="flex flex-row flex-wrap">
        <DimmerWrapper
            label="Taklampa"
            {allItems}
            dimmerItemName="Hubertsceilinglamp_dimmer"
        />
        <ToggleWrapper
            label="Minikök"
            {allItems}
            switchItemName="HubertsKitchen2_Switch"
        />
        <DimmerWrapper
            label="Fönsterlampa"
            {allItems}
            dimmerItemName="Hubertswindowlamp_brightness"
            switchItemName="Hubertswindowlamp_Switch"
        />
    </div>
</div>
