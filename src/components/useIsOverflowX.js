import { useLayoutEffect, useRef, useState } from "react";
import useWindowSize from "./useWindowSize";

const useIsOverflowX = () => {
  const [isOverflow, setIsOverflow] = useState(false);
  const windowSize = useWindowSize();
  const ref = useRef();

  useLayoutEffect(() => {
    if (ref.current)
      setIsOverflow(ref.current.scrollWidth > ref.current.clientWidth);
  }, [windowSize.width]);

  return { ref, isOverflow };
};

export default useIsOverflowX;
