"use client";

import { useEffect, useRef, useState } from "react";

export function useScrollSpy<T extends HTMLElement>(count: number) {
  const elements = useRef<(T | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let frame = 0;

    const compute = () => {
      frame = 0;
      const middle = window.innerHeight / 2;
      let active = 0;
      elements.current.forEach((element, index) => {
        if (element && element.getBoundingClientRect().top <= middle) {
          active = index;
        }
      });
      setActiveIndex(active);
    };

    const onScrollOrResize = () => {
      if (!frame) frame = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [count]);

  const setRef = (index: number) => (element: T | null) => {
    elements.current[index] = element;
  };

  return { setRef, activeIndex };
}
