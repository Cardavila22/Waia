import { useEffect, useState } from "react";

/**
 * Hook personalizado para sincronizar un estado
 * de React con localStorage.
 *
 * @param {string} key
 * @param {*} initialValue
 * @returns {[any, Function]}
 */

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);

      return item
        ? JSON.parse(item)
        : initialValue;
    } catch (error) {
      console.error(
        `Error leyendo localStorage (${key})`,
        error
      );

      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(
        key,
        JSON.stringify(storedValue)
      );
    } catch (error) {
      console.error(
        `Error guardando localStorage (${key})`,
        error
      );
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;