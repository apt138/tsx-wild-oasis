import { useEffect, useRef } from "react";

export default function useDetectOutsideClick<T extends HTMLElement>(
  handler: () => void,
  listenCapturePhase: boolean = true
) {
  const ref = useRef<T>(null);
  useEffect(
    function () {
      function handleClick(e: MouseEvent) {
        if (!ref.current) return;
        if (e.target instanceof Node && !ref.current.contains(e.target)) {
          handler();
        }
      }
      document.addEventListener("click", handleClick, listenCapturePhase);
      return () =>
        document.removeEventListener("click", handleClick, listenCapturePhase);
    },
    [handler, listenCapturePhase]
  );
  return ref;
}
