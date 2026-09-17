import { useEffect, useState } from "react";

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window === "undefined" ? false : window.matchMedia(query).matches,
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
}

export function useReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

export function useTheme() {
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme || "dark",
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#0B0B0C" : "#FBFBFA");

    try {
      localStorage.setItem("pb-theme", theme);
    } catch {
      // The theme still works when persistent storage is unavailable.
    }
  }, [theme]);

  return [theme, () => setTheme((value) => (value === "dark" ? "light" : "dark"))];
}

export function useVisibility(ref) {
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(
    () => document.visibilityState !== "hidden",
  );

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      setNear(true);
      setVisible(true);
      return;
    }

    const preloadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          preloadObserver.disconnect();
        }
      },
      { rootMargin: "300px" },
    );

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 },
    );

    preloadObserver.observe(node);
    visibilityObserver.observe(node);

    return () => {
      preloadObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, [ref]);

  useEffect(() => {
    const update = () =>
      setPageVisible(document.visibilityState !== "hidden");

    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  return { near, active: visible && pageVisible };
}

export { useCountUp } from "./hooks/useCountUp";
export { useMagnetic } from "./hooks/useMagnetic";