// import { useEffect, useState } from "react";
import { writable, type Writable } from 'svelte/store';


type Callback = (message: any) => void;
interface OpenHabEvent {
  type: string;
  topic: string;
  payload: string;
}

interface OpenhabEventPayload {
  value: string | number;
}

// declare var document: any;

const eventName = "openhabEvent";

class OpenHabWebsocketHandler {
  private webSocket?: WebSocket;
  private pingInterval?: any;
  retryOpenInterval: any;
  closeCallback?: () => void;

  private itemsSubscribed: Set<string> = new Set<string>();

  /**
   *
   */
  constructor(private url?: string) {
    if (typeof document !== "undefined") {
      let websocketProtocol =
        document?.location?.protocol === "https:" ? "wss:" : "ws:";
      this.url = `${websocketProtocol}//${document.location.host}/ws`;
    } else {
      this.url = "";
    }
  }

  subscribeTo(itemName: string, callback: Callback): void {
    this.itemsSubscribed.add(itemName);
    document.addEventListener(`${eventName}_${itemName}`, callback);
  }

  subscribeToReconnect(callback: Callback): void {
    document.addEventListener("reconnect_oh_websocket", callback);
  }

  unsubscribe(itemName: string, callback: Callback): void {
    this.itemsSubscribed.delete(itemName);
    document.removeEventListener(`${eventName}_${itemName}`, callback);
  }

  unSubscribeToReconnect(callback: Callback): void {
    document.removeEventListener("reconnect_oh_websocket", callback);
  }

  open() {
    if (this.isConnectingOrConnected() || typeof document === "undefined") {
      return;
    }
    try {
      this.webSocket = new WebSocket(this.url ?? "");
    } catch (e) {
      return;
    }

    this.startHeartbeat();
    this.setupRetry();
    this.setupMessageHandler();
  }

  isConnectingOrConnected(): boolean {
    return (
      typeof this.webSocket !== "undefined" &&
      (this.isOpen() || this.webSocket.CONNECTING === this.webSocket.readyState)
    );
  }
  setupMessageHandler() {
    const messageHandler = (message: MessageEvent) => {
      try {
        const deserializedData = JSON.parse(message.data) as OpenHabEvent;

        if (deserializedData.type !== "ItemStateEvent" && 
        deserializedData.type !== "ItemStateChangedEvent" && 
        deserializedData.type !== "ItemCommandEvent" && 
        deserializedData.type !== "ItemStatePredictedEvent") {
          return;
        }
        const itemName = deserializedData.topic
          .replace("openhab/items/", "")
          .replace("/statechanged", "")
          .replace("/command", "")
          .replace("/statepredicted", "")
          .replace("/state", "")
          ;
        if (!itemName) {
          return;
        }
        if(this.itemsSubscribed.has(itemName)){
          const event2 = new CustomEvent(`${eventName}_${itemName}`, {
            bubbles: false,
            detail: deserializedData,
          });
          document.dispatchEvent(event2);
        }
      } catch (e) {
        console.error(e);
      }
    };
    this.webSocket?.addEventListener("message", messageHandler);
    const setFilter = ()=>{
      this.webSocket?.send(JSON.stringify({
        "type": "WebSocketEvent",
        "topic": "openhab/websocket/filter/type",
        "payload": "[\"ItemStateEvent\"]",
        "source": "WebSocketTestInstance",
        "eventId": "5"
      }));
      this.webSocket?.removeEventListener("open", setFilter);
    };
    this.webSocket?.addEventListener("open", setFilter);

    this.webSocket?.addEventListener("close", (e) => {
      (e.target as WebSocket).removeEventListener("message", messageHandler);
    });
    
   
  }
  setupRetry() {
    const retyOpenHandler = () => {
      this.closeCallback = () => {
        this.retryOpen();
      };
      this.webSocket?.addEventListener("close", this.closeCallback);
    };
    this.webSocket?.addEventListener("open", retyOpenHandler);

    this.webSocket?.addEventListener("close", (e) => {
      (e.target as WebSocket).removeEventListener("open", retyOpenHandler);
    });
  }
  retryOpen() {
    if (this.closeCallback) {
      this.webSocket?.removeEventListener("close", this.closeCallback);
    }
    this.retryOpenInterval = setInterval(() => {
      if (this.isOpen()) {
        clearInterval(this.retryOpenInterval);
        const reconnectEvent = new CustomEvent("reconnect_oh_websocket", {
          bubbles: false,
          detail: this.webSocket,
        });
        document.dispatchEvent(reconnectEvent);
        return;
      }
      this.open();
    }, 2000);
  }
  isOpen(): boolean {
    return (
      typeof this.webSocket !== "undefined" &&
      this.webSocket.OPEN === this.webSocket.readyState
    );
  }
  isClosed(): boolean {
    return (
      typeof this.webSocket !== "undefined" &&
      this.webSocket.CLOSED === this.webSocket.readyState
    );
  }

  isClosedOrClosig(): boolean {
    return (
      (typeof this.webSocket !== "undefined" &&
        this.webSocket.CLOSING === this.webSocket.readyState) ||
      this.isClosed()
    );
  }

  startHeartbeat() {
    this.webSocket?.addEventListener("open", () => {
      if (this.pingInterval) {
        clearInterval(this.pingInterval);
      }
      this.pingInterval = setInterval(() => {
        if (this.isClosed()) {
          clearInterval(this.pingInterval);
          return;
        }
        try {
          this.webSocket?.send(
            JSON.stringify({
              type: "WebSocketEvent",
              topic: "openhab/websocket/heartbeat",
              payload: "PING",
              source: "WebSocketTestInstance",
            }),
          );
        } catch (e) {
          console.error(e);
        }
      }, 5000);
    });
  }
}

const openhabWsClient = new OpenHabWebsocketHandler();




export default function useItemChange(
  itemName: string | undefined,
): {unsubscribe: ()=>void, busEvents: Writable<OpenhabEventPayload>} {
  
  openhabWsClient.open();
  const busEvents = writable<OpenhabEventPayload>(undefined);

  const callback = (message)=>{
    const detail = message?.detail as OpenHabEvent;
    if (detail) {
        const payload = JSON.parse(detail.payload) as OpenhabEventPayload;
        busEvents.set(payload);
      }

  };
  openhabWsClient.subscribeTo(itemName, callback);

  

  
  
  const unsb = ()=>{
    openhabWsClient.unsubscribe(itemName, callback);
  };
  return {
    unsubscribe: unsb,
    busEvents: busEvents
  };
}

// export function useOnReconnectCount(): number {
//   const [reconnectedCount, setReconnectCount] = useState<number>(0);
//   openhabWsClient.open();

//   useEffect(() => {
//     function Callback() {
//       setReconnectCount(reconnectedCount + 1);
//     }
//     openhabWsClient.subscribeToReconnect(Callback);

//     return () => {
//       openhabWsClient.unSubscribeToReconnect(Callback);
//     };
//   });

//   return reconnectedCount;
// }
