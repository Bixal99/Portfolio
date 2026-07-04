"use client";

import { useCallback, useEffect, useState } from "react";
import CharacterModel from "./Character";
import { PageLoader } from "./PageLoader";

export function PortfolioExperience() {
  const [modelReady, setModelReady] = useState(false);
  const [canUseModel, setCanUseModel] = useState<boolean | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1025px)");
    const updateModelAvailability = () => {
      setCanUseModel(mediaQuery.matches);
      if (!mediaQuery.matches) {
        setModelReady(true);
      }
    };

    updateModelAvailability();
    mediaQuery.addEventListener("change", updateModelAvailability);

    return () => mediaQuery.removeEventListener("change", updateModelAvailability);
  }, []);

  const handleModelSettled = useCallback(() => {
    setModelReady(true);
  }, []);

  const handleModelError = useCallback(() => {
    setModelReady(true);
    setCanUseModel(false);
  }, []);

  return (
    <>
      <PageLoader ready={canUseModel === false || modelReady} />
      {canUseModel ? <CharacterModel onReady={handleModelSettled} onError={handleModelError} /> : null}
    </>
  );
}