"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";

type SceneProps = {
  onReady?: () => void;
  onError?: () => void;
};

const Scene = ({ onReady, onError }: SceneProps) => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());

  useEffect(() => {
    const containerElement = canvasDiv.current;
    if (!containerElement) return;

    let mounted = true;
    let resizeHandler: (() => void) | null = null;
    let frameId = 0;
    let mixer: THREE.AnimationMixer | null = null;
    let character: THREE.Object3D | null = null;
    let headBone: THREE.Object3D | null = null;
    let screenLight: THREE.Object3D | null = null;
    let hoverCleanup: (() => void) | undefined;
    let mouse = { x: 0, y: 0 };
    let interpolation = { x: 0.1, y: 0.2 };

    const rect = containerElement.getBoundingClientRect();
    const container = {
      width: Math.max(rect.width, 1),
      height: Math.max(rect.height, 1),
    };
    const aspect = container.width / container.height;
    const scene = sceneRef.current;
    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: window.devicePixelRatio < 2,
        powerPreference: "high-performance",
      });
    } catch (error) {
      console.error("WebGL renderer failed to initialize", error);
      onError?.();
      return;
    }

    renderer.setSize(container.width, container.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    containerElement.appendChild(renderer.domElement);

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      console.error("WebGL context lost while rendering character");
      if (mounted) onError?.();
    };
    renderer.domElement.addEventListener("webglcontextlost", handleContextLost);

    const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
    camera.position.set(0, 13.1, 24.7);
    camera.zoom = 1.1;
    camera.updateProjectionMatrix();

    const timer = new THREE.Timer();
    timer.connect(document);
    const light = setLighting(scene);
    const { loadCharacter } = setCharacter(renderer, scene, camera);

    const onMouseMove = (event: MouseEvent) => {
      handleMouseMove(event, (x, y) => {
        mouse = { x, y };
      });
    };

    const onTouchMove = (event: TouchEvent) => {
      handleTouchMove(event, (x, y) => {
        mouse = { x, y };
      });
    };

    const onTouchEnd = () => {
      containerElement.removeEventListener("touchmove", onTouchMove);
      handleTouchEnd((x, y, interpolationX, interpolationY) => {
        mouse = { x, y };
        interpolation = { x: interpolationX, y: interpolationY };
      });
    };

    const onTouchStart = () => {
      containerElement.addEventListener("touchmove", onTouchMove, {
        passive: true,
      });
    };

    document.addEventListener("mousemove", onMouseMove);
    containerElement.addEventListener("touchstart", onTouchStart, {
      passive: true,
    });
    containerElement.addEventListener("touchend", onTouchEnd);

    loadCharacter()
      .then((gltf) => {
        if (!mounted || !gltf) return;

        const animations = setAnimations(gltf);
        hoverCleanup = hoverDivRef.current
          ? animations.hover(gltf, hoverDivRef.current)
          : undefined;
        mixer = animations.mixer;
        character = gltf.scene;
        scene.add(character);
        headBone = character.getObjectByName("spine006") || null;
        screenLight = character.getObjectByName("screenlight") || null;

        resizeHandler = () => {
          if (character) handleResize(renderer, camera, canvasDiv, character);
        };
        window.addEventListener("resize", resizeHandler);

        window.setTimeout(() => {
          if (!mounted) return;
          light.turnOnLights();
          animations.startIntro();
          onReady?.();
        }, 900);
      })
      .catch((error) => {
        console.error("Character failed to load", error);
        if (mounted) onError?.();
      });

    const animate = (timestamp?: number) => {
      frameId = requestAnimationFrame(animate);
      if (headBone) {
        handleHeadRotation(
          headBone,
          mouse.x,
          mouse.y,
          interpolation.x,
          interpolation.y,
          THREE.MathUtils.lerp,
        );
        light.setPointLight(screenLight);
      }
      timer.update(timestamp);
      const delta = timer.getDelta();
      mixer?.update(delta);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      mounted = false;
      cancelAnimationFrame(frameId);
      hoverCleanup?.();
      document.removeEventListener("mousemove", onMouseMove);
      containerElement.removeEventListener("touchstart", onTouchStart);
      containerElement.removeEventListener("touchmove", onTouchMove);
      containerElement.removeEventListener("touchend", onTouchEnd);
      if (resizeHandler) window.removeEventListener("resize", resizeHandler);
      renderer.domElement.removeEventListener("webglcontextlost", handleContextLost);
      light.dispose();
      scene.clear();
      timer.dispose();
      renderer.forceContextLoss();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [onReady, onError]);

  return (
    <div className="character-container" aria-hidden="true">
      <div className="character-model" ref={canvasDiv}>
        <div className="character-rim" />
        <div className="character-hover" ref={hoverDivRef} />
      </div>
    </div>
  );
};

export default Scene;