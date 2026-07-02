import * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

type CharacterModelMaterial = THREE.Material & {
  color?: THREE.Color;
  emissive?: THREE.Color;
  emissiveIntensity?: number;
  envMapIntensity?: number;
  map?: THREE.Texture | null;
  metalness?: number;
  roughness?: number;
  vertexColors?: boolean;
};

const skinMeshes = new Set(["Ear001", "Hand", "Neck", "Plane007"]);
const clothingMeshes = new Set(["BODYSHIRT", "Pant", "Shoe", "Sole"]);
const deskMeshes = new Set(["Cube002", "Plane", "Plane002", "Plane003"]);
const monitorMeshes = new Set(["Plane017"]);
const darkMeshes = new Set(["hair", "Eyebrow", "Plane017_1"]);

function styleMaterialForMesh(objectName: string, material: CharacterModelMaterial) {
  if (objectName !== "EYEs001") {
    material.map = null;
  }
  material.vertexColors = false;
  material.envMapIntensity = objectName === "EYEs001" ? 0.08 : 0.18;
  material.emissive?.set("#000000");
  material.emissiveIntensity = 0;
  material.metalness = Math.min(material.metalness ?? 0, 0.08);
  material.roughness = Math.max(material.roughness ?? 0.5, 0.56);

  if (skinMeshes.has(objectName)) {
    material.color?.set("#f1d2c3");
    return;
  }

  if (clothingMeshes.has(objectName)) {
    material.color?.set("#dce8e3");
    return;
  }

  if (deskMeshes.has(objectName)) {
    material.color?.set("#d6e3de");
    return;
  }

  if (monitorMeshes.has(objectName)) {
    material.color?.set("#d7e4df");
    material.metalness = 0.08;
    material.roughness = 0.6;
    return;
  }

  if (darkMeshes.has(objectName)) {
    material.color?.set(objectName === "hair" ? "#050505" : "#080808");
    material.roughness = 0.44;
    return;
  }

  if (objectName === "Keyboard") {
    material.color?.set("#d0ddd8");
    material.metalness = 0.08;
    material.roughness = 0.58;
    return;
  }

  if (objectName.startsWith("KEYS")) {
    material.color?.set("#eef3f0");
    material.metalness = 0;
    material.roughness = 0.58;
    return;
  }

  if (objectName === "EYEs001") {
    material.color?.set("#ffffff");
    material.metalness = 0;
    material.roughness = 0.42;
    return;
  }

  if (objectName === "screenlight") {
    material.color?.set("#ffffff");
    material.emissive?.set("#5dd3b6");
    material.emissiveIntensity = 1;
    return;
  }

  material.color?.set("#d9e5e0");
}

function applyCharacterPalette(character: THREE.Object3D) {
  character.traverse((child) => {
    if (!("isMesh" in child) || !child.isMesh) return;

    const mesh = child as THREE.Mesh;
    const cloneMaterial = (material: THREE.Material) => {
      const cloned = material.clone() as CharacterModelMaterial;
      styleMaterialForMesh(mesh.name, cloned);
      cloned.needsUpdate = true;
      return cloned;
    };

    mesh.material = Array.isArray(mesh.material)
      ? mesh.material.map(cloneMaterial)
      : cloneMaterial(mesh.material);
  });
}

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      let blobUrl: string | null = null;

      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc",
          "Character3D#@"
        );
        blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        loader.load(
          blobUrl,
          async (gltf) => {
            const character = gltf.scene;
            applyCharacterPalette(character);
            await renderer.compileAsync(character, camera, scene);
            character.traverse((child: THREE.Object3D) => {
              if ("isMesh" in child && child.isMesh) {
                const mesh = child as THREE.Mesh;
                mesh.castShadow = false;
                mesh.receiveShadow = false;
                mesh.frustumCulled = true;
                if (mesh.material && !Array.isArray(mesh.material)) {
                  mesh.material.precision = "mediump";
                }
              }
            });

            setCharTimeline(character, camera);
            setAllTimeline();

            const footR = character.getObjectByName("footR");
            const footL = character.getObjectByName("footL");
            if (footR) footR.position.y = 3.36;
            if (footL) footL.position.y = 3.36;

            dracoLoader.dispose();
            if (blobUrl) URL.revokeObjectURL(blobUrl);
            resolve(gltf);
          },
          undefined,
          (error) => {
            if (blobUrl) URL.revokeObjectURL(blobUrl);
            dracoLoader.dispose();
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        if (blobUrl) URL.revokeObjectURL(blobUrl);
        dracoLoader.dispose();
        console.error(err);
        reject(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;