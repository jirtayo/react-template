// import { useEventListener, useUnmount } from 'ahooks';
import { useEffect, useRef } from "react";
import bridge from "../utils/bridge";

interface Params {
  onTimeOut?: () => void;
  timeOut?: number;
  query?: Record<string, string>;
}

export function useOpenApp() {
  const timer = useRef<number | null>(null);

  const clearTimer = () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
  };

  // useEventListener
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      clearTimer();
    }
  });

  //useUnmount
  useEffect(() => {
    return clearTimer;
  });

  return {
    openApp(params?: Params) {
      const { onTimeOut, timeOut = 5 * 1000, query } = params || {};
      bridge.openApp(query);
      // 5s 内没有打开 app，弹出提示
      clearTimer();
      if (onTimeOut) {
        timer.current = setTimeout(() => {
          console.log(`[useOpenApp]: 打开app超时 timeOut = ${timeOut}`);
          onTimeOut?.();
        }, timeOut) as never;
      }
    },
  };
}

/**
 * import {useOpenApp} from 'useOpenApp'
 *
 * useOpenApp({
 *  onTimeout() {
 *    bridge.downloadApp()
 *  }
 * })
 *
 */
