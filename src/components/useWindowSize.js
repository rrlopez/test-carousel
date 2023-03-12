import _ from "lodash";
import { useCallback, useEffect, useState } from "react";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  const throttle = useCallback(
    _.throttle((state) => {
      setWindowSize(state);
    }, 750),
    []
  );

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      throttle({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

export default useWindowSize;
