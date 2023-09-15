<script script lang="ts">
    import { Card, Sheet } from "konsta/svelte";
    
    import LightBulbStandAlone from "./LightBulbStandAlone.svelte";

    import LightInformation from "./LightInformation.svelte";

    

	export let switchState: boolean;
    export let switchStateChanged: (state: boolean) => void;
    export let label: string | undefined;
    export let open: boolean;
    export let openChange: (open: boolean) => void | undefined;

    const close = ()=>{
        open = false;
        openChange(false);
    };
    


</script>


<Sheet
      class="p-0 mt-8 w-full flex m-0 flex-col bg-transparent h-full"
      opened={open}

      onBackdropClick={() => {
        open = false;
        openChange(false);
      }}
    >
      <Card
        contentWrap={false}
        raisedIos={true}
        contentWrapPadding="p-0"
        margin="m-0"
        class="bg-white h-full flex flex-col"
        colors={{ bgIos: "" }}
      >
        <div class="flex flex-row items-center p-4">
          <LightBulbStandAlone
            switchChangeDisabled={true}
            switchState={switchState}
            switchChange={switchStateChanged}
          ></LightBulbStandAlone>
          <LightInformation switchState={switchState} label={label}></LightInformation>
          <div class="text-black flex grow flex-row justify-end items-stretch relative">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div class="-top-2 relative text-black w-8 h-8 rounded-full bg-gray-100 p-2 cursor-pointer" on:click={(e)=>close()}>
              <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" fill="#000000">
                <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"/>
              </svg>
            </div>
          </div>
        </div>
        <div class="md:grow flex flex-col justify-center">
          <div class="flex flex-col items-center content-center">            
              <slot/>
          </div>
        </div>
      </Card>
    </Sheet>
