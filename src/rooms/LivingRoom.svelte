<script lang="ts">
    import type OpenHabItem from "../shared/services/OpenHabItem";
    import Header from "./Header.svelte";
    import DimmerWrapper from "../devices/light/DimmerWrapper.svelte";
    import ToggleWrapper from "../devices/switch/toggleWrapper.svelte";
    export let allItems: OpenHabItem[] = [];
</script>

<div>
<Header>
            Vardagsrum
        </Header>
    <div class="flex flex-row flex-wrap">
        <DimmerWrapper label="Taklampa" allItems={allItems} dimmerItemName="Livingroomceilinglamp_dimmer"></DimmerWrapper>
        <DimmerWrapper label="Fönsterlampa" allItems={allItems} dimmerItemName="Livingroomwindowlamp_dimmer"></DimmerWrapper>
        <DimmerWrapper label="TV-Bänk" allItems={allItems} switchItemName="Livingroomlightstrip_state" dimmerItemName="Livingroomlightstrip_brightness"></DimmerWrapper>
        <DimmerWrapper label="Trä golvlampa höger" allItems={allItems} switchItemName="Livingroomoldlamp1_state" dimmerItemName="Livingroomoldlamp1_brightness"></DimmerWrapper>
        <DimmerWrapper label="Trä golvlampa vänster" allItems={allItems} switchItemName="Livingroomoldlamp2_state" dimmerItemName="Livingroomoldlamp2_brightness"></DimmerWrapper>
        <DimmerWrapper label="Golvlampa" allItems={allItems} switchItemName="Livingroomlampstand_state" dimmerItemName="Livingroomlampstand_brightness"></DimmerWrapper>
        <ToggleWrapper label="Vitrinskåp" allItems={allItems} switchItemName="Livingroomglascabinet_Switch"></ToggleWrapper>
    </div>
</div>
