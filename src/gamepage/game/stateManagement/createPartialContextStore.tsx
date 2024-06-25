import React, { createContext, useCallback, useContext, useRef, useSyncExternalStore } from "react";

export default function createPartialContextStore<T>(initialData: T){

  type PartialUpdater = (data: T) => Partial<T>

  function useStoreData() :{
    get: () => T,
    set: (updater: PartialUpdater) => void,
    subscribe: (callback: () => void) => () => void
  } {

    const store = useRef(initialData);
  
    const get = useCallback(() => store.current,[])
  
    const set = (updater: PartialUpdater) => {
      store.current = {...store.current , ...updater(store.current)}
      subscribers.current.forEach((callback) => callback());
    }

    const subscribers = useRef(new Set<() => void>())

    const subscribe = useCallback((callback: () => void) => {
      subscribers.current.add(callback)
      return () => subscribers.current.delete(callback)
    }, [])

  return {get, set, subscribe}
  }

  const Context = createContext< ReturnType<typeof useStoreData> | null>(null)

  function StoreProvider({children}: {children: React.ReactNode}) {
    return <Context.Provider value={useStoreData()}>{children}</Context.Provider>
  }

  /**
   * If you select the root, you are not notifed of any nested changes within the store, only if you replace the root object!
   * To notify all subscribers with nested selectors you need to do a deep copy of the root object and pass it to the selector.
   * 
   * 
   * @param selector a function that returns a (nested) state
   * @returns Returns the selected state (nested) and a function to update the state root object
   */
  function useStore<SelectorOutput>(
    selector: (store: T) => SelectorOutput
  ): [SelectorOutput, (updater: PartialUpdater) => void]   {
    const context = useContext(Context)
    if (!context) {
      throw new Error('context not found! Must be within a provider.')
    }
    
    // trigger a re-render when the state changes
    const state = useSyncExternalStore(
      context.subscribe,
      () => selector(context.get()), // this allows to only sub to a part of the store
      () => selector(context.get())
    )

    return [state, context.set]
  }

  return {
    StoreProvider,
    useStore
  }
}