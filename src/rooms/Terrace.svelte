<script lang="ts">
    import type OpenHabItem from "../shared/services/OpenHabItem";
    import Header from "./Header.svelte";
    import ToggleWrapper from "../devices/switch/toggleWrapper.svelte";
    export let allItems: OpenHabItem[] = [];
</script>

<div>
    <Header>Terass</Header>
    <div class="flex flex-row flex-wrap">
        <ToggleWrapper
            label="Slinga"
            {allItems}
            switchItemName="TerraceNetLight_Switch"
        />
        <ToggleWrapper
            label="Fönsterlampa"
            {allItems}
            switchItemName="Terracewalllight_Switch"
        />
    </div>
</div>
