import { useEffect, useState } from "react";

export function useScrollSpy(sectionIds: string[], offset: number = 100) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: `-${offset}px 0px -${window.innerHeight - offset - 200}px 0px`,
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      let currentActive: string | null = null;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          currentActive = entry.target.id;
        }
      });

      if (currentActive) {
        setActiveSection(currentActive);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el) => el !== null) as Element[];

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      elements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, [sectionIds, offset]);

  return activeSection;
}
