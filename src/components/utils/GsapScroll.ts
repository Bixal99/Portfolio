import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type CharacterMaterial = THREE.Material & {
  color?: THREE.Color;
  emissive?: THREE.Color;
  emissiveIntensity?: number;
  opacity: number;
  transparent: boolean;
};

function getSingleMaterial(object: THREE.Object3D): CharacterMaterial | null {
  if (!("material" in object)) return null;

  const material = (object as THREE.Mesh).material;
  if (!material || Array.isArray(material)) return null;

  return material as CharacterMaterial;
}

function killCharacterTriggers() {
  ScrollTrigger.getAll().forEach((trigger) => {
    if (trigger.vars.id?.toString().startsWith("character-")) {
      trigger.kill();
    }
  });
}

function prepareCodingProps(character: THREE.Object3D) {
  let monitorMaterial: CharacterMaterial | null = null;
  let screenLightMaterial: CharacterMaterial | null = null;

  character.traverse((object) => {
    if (object.name === "Plane004") {
      object.children.forEach((child) => {
        const material = getSingleMaterial(child);
        if (!material) return;

        material.transparent = true;
        material.opacity = 0;
        if (material.name === "Material.027") {
          monitorMaterial = material;
          material.color?.set("#ffffff");
        }
      });
    }

    if (object.name === "screenlight") {
      const material = getSingleMaterial(object);
      if (!material) return;

      material.transparent = true;
      material.opacity = 0;
      material.emissive?.set("#c8bfff");
      screenLightMaterial = material;
      gsap.timeline({ repeat: -1, repeatRefresh: true }).to(material, {
        emissiveIntensity: () => Math.random() * 8,
        duration: () => Math.random() * 0.6,
        delay: () => Math.random() * 0.1,
      });
    }
  });

  return { monitorMaterial, screenLightMaterial };
}

export function setCharTimeline(
  character: THREE.Object3D<THREE.Object3DEventMap> | null,
  camera: THREE.PerspectiveCamera
) {
  killCharacterTriggers();

  if (!character) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isDesktop = window.innerWidth > 1024;
  const { monitorMaterial, screenLightMaterial } = prepareCodingProps(character);
  const neckBone = character.getObjectByName("spine005");

  gsap.set(".character-model", {
    autoAlpha: isDesktop ? 1 : 0,
    x: "0%",
    y: "0%",
    scale: 1,
  });
  gsap.set(character.rotation, { x: 0, y: 0, z: 0 });
  gsap.set(camera.position, { x: 0, y: 13.1, z: 24.7 });
  camera.zoom = 1.1;
  camera.updateProjectionMatrix();

  if (!isDesktop || prefersReducedMotion) return;

  gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      id: "character-home",
      trigger: "#home",
      start: "top top",
      end: "bottom top",
      scrub: 0.8,
      invalidateOnRefresh: true,
    },
  })
    .to(character.rotation, { y: 0.38 }, 0)
    .to(camera.position, { z: 22 }, 0)
    .to(".character-model", { x: "22%" }, 0)
    .to("[data-hero-copy]", { autoAlpha: 0.4, y: -42 }, 0.05);

  gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      id: "character-about",
      trigger: "#about",
      start: "top bottom",
      end: "center center",
      scrub: 0.9,
      invalidateOnRefresh: true,
    },
  })
    .to(".character-model", { x: "27%", y: "0%", scale: 1 }, 0)
    .to(character.rotation, { x: 0.02, y: -0.32 }, 0)
    .to(camera.position, { y: 13.1, z: 24.7 }, 0)
    .fromTo("[data-about-panel]", { autoAlpha: 0, y: 90 }, { autoAlpha: 1, y: 0 }, 0.1);

  const codingTimeline = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      id: "character-coding",
      trigger: "#coding",
      start: "top bottom",
      end: "center center",
      scrub: 0.9,
      invalidateOnRefresh: true,
    },
  })
    .to(".character-model", { x: "-24%", y: "2%", scale: 0.86 }, 0)
    .to(camera.position, { y: 8.4, z: 74 }, 0)
    .to(character.rotation, { x: 0.12, y: 0.92 }, 0)
    .fromTo("[data-coding-panel]", { autoAlpha: 0, y: 90 }, { autoAlpha: 1, y: 0 }, 0.1)
    .fromTo(".character-rim", { opacity: 1, scaleX: 1.4 }, { opacity: 0.28, scale: 1.1, y: "10%" }, 0);

  if (neckBone) {
    codingTimeline.to(neckBone.rotation, { x: 0.58 }, 0);
  }

  if (monitorMaterial) {
    codingTimeline.to(monitorMaterial, { opacity: 1 }, 0.28);
  }

  if (screenLightMaterial) {
    codingTimeline.to(screenLightMaterial, { opacity: 1 }, 0.42);
  }

  gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      id: "character-journey-exit",
      trigger: "#journey",
      start: "top bottom",
      end: "top center",
      scrub: 0.8,
      invalidateOnRefresh: true,
    },
  }).to(".character-model", { y: "-115%", autoAlpha: 0 }, 0);
}

export function setAllTimeline() {
  ScrollTrigger.refresh();
}