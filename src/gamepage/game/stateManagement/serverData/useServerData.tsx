import React from 'react';
import createPartialContextStore from '../createPartialContextStore';
import messageManager from '../../../messages/messageManager';


let  ServerDataProvider: typeof StoreProvider;
let  useServerData: typeof useStore;

type ServerData = {
  activePlayers: number,
  serverTime: string
}

const serverData: ServerData = {
  activePlayers: 0,
  serverTime: "00:00:00"
}
const { StoreProvider, useStore } = createPartialContextStore(serverData)

// this data should never be null if used correctly.
// The provider should be contitionally rendered after the messageManager has all initData messages received.
function initialize() {
  const serverData: ServerData = {
    activePlayers: messageManager.getInitData().initStatusMessage!.active_players,
    serverTime: messageManager.getInitData().initStatusMessage!.time
  }

  const { StoreProvider, useStore } = createPartialContextStore(serverData)

  ServerDataProvider = StoreProvider
  useServerData = useStore
}

export function ServerDataProviderStore({children}: {children: React.ReactNode}) {
  initialize()

  return (
    <ServerDataProvider>
      <ServerDataUpdater />
      {children}
    </ServerDataProvider>
  )
}


/**
 * 
 * TODO: add a way to update the ServerData, Websocket listener
 */
function ServerDataUpdater() {

  const [serverData, setServerData] = useServerData((data) => data)


  return <></>
}


// New hook that only returns the state
// Just to be save to only change the state here, eg. over websocket
export default function useServerDataState<SelectorOutput>(
  selector: (store: ServerData) => SelectorOutput
): SelectorOutput {
  const [state] = useServerData(selector);
  if (state === undefined) {
    console.log('WARNING accessing state!', selector.toString(), state)
  }
  return state;
}