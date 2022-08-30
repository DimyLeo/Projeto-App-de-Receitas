import { useEffect, useState } from 'react';
import { getFromLocalStorage, setToLocalStorage } from './getSetLocalStorage';

const usePersistedState = (key, initialState = false) => {
  const [state, setState] = useState(() => {
    const localStorageItem = getFromLocalStorage(key);
    return localStorageItem || initialState;
  });

  useEffect(() => {
    setToLocalStorage(key, state);
  }, [state, key]);

  return [state, setState];
};

export default usePersistedState;
