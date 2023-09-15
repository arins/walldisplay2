<script lang="ts">
    import type OpenHabItem from "../shared/services/OpenHabItem";
    import Header from './Header.svelte';
    import DimmerWrapper from "../devices/light/DimmerWrapper.svelte";
    export let allItems: OpenHabItem[] = [];

</script>




<div>
    <Header>
        Kontor
    </Header>
    <div class="flex flex-row flex-wrap">
        
        <DimmerWrapper label="Skrivbordslampa" allItems={allItems} dimmerItemName="Officedesklamp_brightness" switchItemName="Officedesklamp_Switch"></DimmerWrapper>
        
        
    </div>
</div>
