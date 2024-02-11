import { useEffect, useState } from "react";

export function useWindowSize(breakpoint = 640) {
  const [windowSize, setWindowSize] = useState<{
    width: number | undefined;
    height: number | undefined;
  }>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
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

  return {
    windowSize,
    loading: windowSize.width === undefined,
    isMobile:
      typeof windowSize?.width === "number" && windowSize?.width < breakpoint,
    isDesktop:
      typeof windowSize?.width === "number" && windowSize?.width >= breakpoint,
  };
}
