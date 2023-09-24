<script lang="ts">
    import type OpenHabItem from "../shared/services/OpenHabItem";
    import Header from "./Header.svelte";
    import DimmerWrapper from "../devices/light/DimmerWrapper.svelte";
    import ToggleWrapper from "../devices/switch/toggleWrapper.svelte";
    export let allItems: OpenHabItem[] = [];
</script>

<div>
    <Header>Badrum</Header>
    <div class="flex flex-row flex-wrap">
        <ToggleWrapper
            label="Spegelbelysning"
            {allItems}
            switchItemName="BathroomMirrorlight_Switch"
        />
        <DimmerWrapper
            label="Spottar"
            {allItems}
            dimmerItemName="Bathroomspotlights_dimmer"
        />
    </div>
</div>
