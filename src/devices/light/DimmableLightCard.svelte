<script script lang="ts">
    import { Card } from "konsta/svelte";
    import type OpenHabItem from "../../shared/services/OpenHabItem";
    import {
        getLevelFromState,
        getSwitchStateFromOh,
    } from "../../shared/openhabConverters";
    import LightBulb from "./LightBulb.svelte";
    import LightCardInformation from "./LightCardInformation.svelte";
    import { SendCommandToItem } from "../../shared/services/openhabClient";
    import SheetControl from "./SheetControl.svelte";
    import HomeKitDimmer from "./HomeKitDimmer.svelte";
    import GetItemEvents from "../../shared/services/websocketClient";

    export let switchItem: OpenHabItem | undefined = undefined;
    export let dimmerItem: OpenHabItem;
    export let label: string;

    let switchValue: boolean = false;
    $: switchValue = getSwitchStateFromOh(
        switchItem?.state ?? dimmerItem.state
    );

    let level = getLevelFromState(dimmerItem.state);
    let sheetOpen = false;

    const setSheetOpenState = (open: boolean) => {
        sheetOpen = open;
    };

    const switchStateChanged = async (switchState: boolean) => {
        switchValue = switchState;
        if (switchItem) {
            await SendCommandToItem(
                switchItem.name,
                switchState ? "ON" : "OFF"
            );
        } else {
            await SendCommandToItem(
                dimmerItem.name,
                switchState ? "ON" : "OFF"
            );
        }
    };
    const dimmerValueChanged = async (dimmerValue: number) => {
        await SendCommandToItem(dimmerItem.name, dimmerValue);
    };

    const eventsForDimmer = GetItemEvents(dimmerItem.name);
    eventsForDimmer.busEvents.subscribe((e) => {
        if (!e) {
            return;
        }
        level = getLevelFromState(e.value);
    });
    if (switchItem) {
        const eventsForSwitch = GetItemEvents(switchItem.name);
        eventsForSwitch.busEvents.subscribe((e) => {
            if (!e) {
                return;
            }
            switchValue = getSwitchStateFromOh(e.value);
        });
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click={() => setSheetOpenState(true)}>
    <Card
        contentWrapPadding="p-0"
        colors={{ bgIos: "" }}
        class={"group select-none " +
            (switchValue ? "bg-white " : "bg-gray-400 ") +
            (switchValue ? "opacity-80 " : "opacity-70 ")}
        contentWrap={false}
        raisedIos={true}
    >
        <div class="flex flex-row items-center p-4 text-xs md:text-base">
            <LightBulb
                switchState={switchValue}
                switchChange={(switchState) => switchStateChanged(switchState)}
                switchChangeDisabled={false}
            />
            <LightCardInformation
                dimmerValue={level}
                switchState={switchValue}
                label={label ? label : dimmerItem.label}
            />
        </div>
    </Card>
</div>

<SheetControl
    switchState={switchValue}
    switchStateChanged={(switchState) => switchStateChanged(switchState)}
    label={label ? label : dimmerItem.label}
    open={sheetOpen}
    openChange={(open) => setSheetOpenState(open)}
>
    <HomeKitDimmer
        dimmerValue={level}
        dimmerValueChange={(dimmerValue) => dimmerValueChanged(dimmerValue)}
    />
</SheetControl>
