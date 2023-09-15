"use client";
import { Card } from "konsta/react";
import { Fragment, useEffect, useState } from "react";

import { LightBulb } from "./lightBulb";
import { LightCardInformation } from "./lightInformation";
import { SheetControl } from "./SheetControl";
import {
  OpenHabItem,
  SendCommandToItem,
} from "@/services/openhabClient";

import useItemChange from "@/services/websocketClient";
import HomeKitDimmer from "../homeKitDimmer/homeKitDimmer";
import HomeKitToggle from "../homeKitToggle/homeKitToggle";
import { getSwitchStateFromOh } from "../shared/openhabConverters";



export default function ToggleCard({ switchItem, label }: { switchItem: OpenHabItem, label?: string }) {
  const switchValue = getSwitchStateFromOh(switchItem?.state);
  const [internalSwitchState, setInternalSwitchState] = useState<boolean>(switchValue);
  const [moreControlsOpen, setMoreControlsOpen] = useState(false);  
  const lastSwitchItemState = useItemChange(switchItem?.name);

  useEffect(() => {
    if (lastSwitchItemState && lastSwitchItemState.value) {
      setInternalSwitchState(getSwitchStateFromOh(lastSwitchItemState.value));
    }
  }, [lastSwitchItemState, lastSwitchItemState?.value]);

  const showSheetControls = () => {
    setMoreControlsOpen(true);
  };
  const switchStateChanged = async (switchState: boolean) => {
    setInternalSwitchState(switchState);
    await SendCommandToItem(switchItem.name, switchState ? 'ON' : 'OFF');
  };

  return (
    <Fragment>
      <Card
        contentWrapPadding="p-0"
        colors={{ bgIos: "" }}
        className={
          "group select-none " +
          (internalSwitchState ? "bg-white " : "bg-gray-400 ") + 
          (internalSwitchState ? "opacity-80 " : "opacity-70 ")
        }
        contentWrap={false}
        raisedIos={true}
        onClick={() => showSheetControls()}
      >
        <div className="flex flex-row items-center p-4 text-xs md:text-base">
          <LightBulb
            switchState={internalSwitchState}
            switchChange={(switchState) => switchStateChanged(switchState)}
          ></LightBulb>
         <LightCardInformation
            switchState={internalSwitchState}
            label={label ? label : switchItem.label}
          ></LightCardInformation>
        </div>
      </Card>
      <SheetControl
        switchState={internalSwitchState}
        setSwitchState={(switchState) => switchStateChanged(switchState)}
        label={label ? label : switchItem.label}
        open={moreControlsOpen}
        openChange={setMoreControlsOpen}>
        <HomeKitToggle switchState={internalSwitchState} switchStateChange={(state)=>switchStateChanged(state)}></HomeKitToggle>
      </SheetControl>
    </Fragment>
  );
}
