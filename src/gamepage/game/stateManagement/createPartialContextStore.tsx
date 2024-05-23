import React, { createContext, useCallback, useContext, useRef, useSyncExternalStore } from "react";

export default function createPartialContextStore<T>(initialData: T){

  /**
   * Merges two objects into one.
   * It only replaces the objects of the target that are specified in the source.
   * 
   * For use in a hook, it only notifies objects that are changed. 
   * Non source objects are not notified as the target is kept immutable.
   * Only the source objects of taget are mutated.
   * 
   * @param target object to manipulate
   * @param source Partial objects of target to merge into target
   * @returns the same target with updated source objects
   */
  function mergeDeep<T>(target: T, source: DeepPartial<T>): T {
    // Make sure it is a record object with a key: value.
    // Have to execlude arrays as they are objects and
    // and we cannot otherwise observe the changes to the array itself, eg. adding or removing items.
    // just reasign the array as a new array/ or spread, like normaly to get a state update!
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
   * Recursive Partial Type. Makes all properties P of T optional(P?).
   * And T[P] also optional if it is an object, else it keeps it type.
   * Patial<T> = { [P in keyof T]?: T[P] | undefined } as defined by TypeScript.
  */
  type DeepPartial<T> = {
    [P in keyof T]?: 
    T[P] extends object
      ? DeepPartial<T[P]> 
      : T[P];
  };

  type DeepPartialUpdater = (data: T) => DeepPartial<T>

  function useStoreData() :{
    get: () => T,
    set: (updater: DeepPartialUpdater) => void,
    subscribe: (callback: () => void) => () => void
  } {

    const store = useRef(initialData);
  
    const get = useCallback(() => store.current,[])
  
    
  /**
   * Updates the store with the provided updater function and notifies all subscribers.
   * 
   * The updater function can return a partial nested update.
   * Only the objects specified in the update will be updated and subscribers will be notified if they have selected the same object.
   * objects not specifed by the updater are not mutated and subscribers are not notified!
   * 
   * @param updater - A function that takes the current store state and returns a partial update.
   * @return 
   */
    const set = (updater: DeepPartialUpdater) => {
      // i dont know: mergeDeep({...store.current} ,updater(store.current))
      // might not be nessary to copy the store.current object. mergeDeep copies all the objects.
      store.current = mergeDeep(store.current ,updater(store.current))
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
  ): [SelectorOutput, (updater: DeepPartialUpdater) => void]   {
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