import { useEffect, useState } from 'react';

/**
 * useDebounce
 * @param value - 디바운스 처리할 값
 * @param delay - 디바운스 시간(ms)
 * @returns 디바운스된 값
 */
const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler); // 이전 타이머 취소
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
