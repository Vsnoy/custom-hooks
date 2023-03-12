/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useCallback, useRef } from "react";

type DebounceRef = {
  fn: Function;
  timer: ReturnType<typeof setTimeout> | null;
};

/**
 * @author Trauma
 * @description 防抖
 * @param fn 回调函数
 * @param wait 延时时间。默认延时300ms。
 * @param dep 其他依赖项
 */
const useDebounce = (
  fn: Function,
  wait: number = 300,
  dep: Array<any> = []
): Function => {
  const { current } = useRef<DebounceRef>({ fn, timer: null });

  useEffect(() => {
    current.fn = fn;
  }, [fn]);

  return useCallback((...args: any[]): void => {
    current.timer && clearTimeout(current.timer);
    current.timer = setTimeout(() => current.fn.apply(null, args), wait);
  }, dep);
};

export default useDebounce;
