"use client";

import Scene from "./Scene";

export type CharacterModelProps = {
  onReady?: () => void;
  onError?: () => void;
};

const CharacterModel = ({ onReady, onError }: CharacterModelProps) => {
  return <Scene onReady={onReady} onError={onError} />;
};

export default CharacterModel;