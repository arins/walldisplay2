import type OpenHabItem from "./OpenHabItem";

export async function GetItems(): Promise<OpenHabItem[]> {
  
  const response = await fetch(`/rest/items`, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "same-origin", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer",
  });
  
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(await response.text());
  }
}

export async function GetItem(itemName: string): Promise<OpenHabItem> {
  const response = await fetch(`/rest/items/${itemName}`, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "same-origin", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer",
  });
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(await response.text());
  }
}

export async function SendCommandToItem(itemName: string, commandOrValue: any) {
  const response = await fetch(`/rest/items/${itemName}`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "text/plain",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer",
    body: commandOrValue,
  });
  return await response.text();
}
