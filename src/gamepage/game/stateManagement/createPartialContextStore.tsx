import React, { createContext, useCallback, useContext, useRef, useSyncExternalStore } from "react";

export default function createPartialContextStore<T>(initialData: T){

  //utility function to merge partital objects deeply
  function mergeDeep<T>(target: T, source: DeepPartial<T>): T {
    // Make sure it is a record object with a key: value.
    // Have to execlude arrays as they are objects and
    // and we cannot otherwise observe the changes to the array itself, eg. adding or removing items.
    // just reasign the array as a new array/ or spread, like normaly to get a state update
    function isObject(obj: any): obj is Record<string, any>{
      return obj && typeof obj === 'object' && !Array.isArray(obj);
    } 

    for (const key in source){
      if (isObject(source[key]) && isObject(target[key])){
        target[key] = mergeDeep(target[key], source[key]!)
      } else {
        target[key] = source[key] as T[Extract<keyof T, string>]
      }
    }

    return target
  }

  /**  
   * Recursive Partial Type
   * Patial<T> = { [P in keyof T]?: T[P] | undefined } as defined by TypeScript.
   * A definition for array might be: 
   * type DeepPartial<T> = { [P in keyof T]?: T[P] extends (infer U)[] extends object ? DeepPartial<U>[]  ? DeepPartial<T[P]> : T[P] };
  */
  type DeepPartial<T> = {
    [P in keyof T]?: 
    T[P] extends object
      ? DeepPartial<T[P]> 
      : T[P];
  };

  function useStoreData() :{
    get: () => T,
    set: (updater: (data: T) => DeepPartial<T>) => void,
    subscribe: (callback: () => void) => () => void
  } {

    const store = useRef(initialData);
  
    const get = useCallback(() => store.current,[])
  
    const set = (updater: (data: T) => DeepPartial<T>) => {
      // TODO: nested objects
      store.current = mergeDeep({...store.current},updater(store.current))
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

  
  function useStore<SelectorOutput>(
    selector: (store: T) => SelectorOutput
  ): [SelectorOutput, (updater: (data: T) => DeepPartial<T>) => void]   {
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