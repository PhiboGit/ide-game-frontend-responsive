import React, { createContext, useCallback, useContext, useRef, useSyncExternalStore } from "react";

export default function createPartialContextStore<T>(initialData: T){

  function useStoreData() :{
    get: () => T,
    set: (updater: (data: T) => Partial<T>) => void,
    subscribe: (callback: () => void) => () => void
  } {

    const store = useRef(initialData);
  
    const get = useCallback(() => store.current,[])
  
    const set = (updater: (data: T) => Partial<T>) => {
      store.current = {...store.current, ...updater(store.current)}
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

  
  function useStore<SelectorOutput>(
    selector: (store: T) => SelectorOutput
  ): [SelectorOutput, (updater: (data: T) => Partial<T>) => void]   {
    const context = useContext(Context)
    if (!context) {
      throw new Error('context not found! Must be within a provider.')
    }
    
    // trigger a re-render when the state changes
    const state = useSyncExternalStore(
      context.subscribe,
      () => selector(context.get()) // this allows to only sub to a part of the store
    )

    return [state, context.set]
  }

  return {
    StoreProvider,
    useStore
  }
}