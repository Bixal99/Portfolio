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
const clothingMeshes = new Set(["BODYSHIRT", "Pant"]);
const chairMeshes = new Set(["Plane"]);
const tableMeshes = new Set(["Cube002", "Plane002", "Plane003"]);
const monitorMeshes = new Set(["Plane004", "Plane017"]);
const darkMeshes = new Set(["hair", "Eyebrow", "Plane017_1"]);
const SKIN_COLOR = new THREE.Color("#f1d2c3");
const DARK_BROWN_SHOE = "#3a2417";

function isDisposableTexture(value: unknown): value is THREE.Texture {
  return value instanceof THREE.Texture;
}

function normalizeTextureForWebGL(material: CharacterModelMaterial) {
  const map = material.map;
  if (!map || map.colorSpace !== THREE.SRGBColorSpace) return;

  map.format = THREE.RGBAFormat;
  map.type = THREE.UnsignedByteType;
  map.needsUpdate = true;
}

function styleMaterialForMesh(
  objectName: string,
  material: CharacterModelMaterial,
) {
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
    material.color?.copy(SKIN_COLOR);
    return;
  }

  if (objectName === "BODYSHIRT") {
    material.color?.set("#3407e7");
    return;
  }

  if (objectName === "Pant") {
    material.color?.set("#000000");
    return;
  }

  if (objectName === "Shoe" || objectName === "Sole") {
    material.color?.set(DARK_BROWN_SHOE);
    material.metalness = 0;
    material.roughness = 0.74;
    return;
  }

  if (clothingMeshes.has(objectName)) {
    material.color?.set("#dce8e3");
    return;
  }

  if (chairMeshes.has(objectName)) {
    material.color?.set("#b98f6a");
    material.metalness = 0;
    material.roughness = 0.68;
    return;
  }

  if (tableMeshes.has(objectName)) {
    material.color?.set("#a87b55");
    material.metalness = 0.04;
    material.roughness = 0.62;
    return;
  }

  if (monitorMeshes.has(objectName)) {
    material.color?.set("#26292c");
    material.metalness = 0.06;
    material.roughness = 0.64;
    return;
  }

  if (darkMeshes.has(objectName)) {
    material.color?.set(objectName === "hair" ? "#050505" : "#080808");
    material.roughness = 0.44;
    return;
  }

  if (objectName === "Keyboard") {
    material.color?.set("#8f9492");
    material.metalness = 0.02;
    material.roughness = 0.7;
    return;
  }

  if (objectName.startsWith("KEYS")) {
    material.color?.set("#b4b8b6");
    material.metalness = 0;
    material.roughness = 0.68;
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
      normalizeTextureForWebGL(cloned);
      cloned.needsUpdate = true;
      return cloned;
    };

    mesh.material = Array.isArray(mesh.material)
      ? mesh.material.map(cloneMaterial)
      : cloneMaterial(mesh.material);
  });
}

function disposeMaterial(material: THREE.Material) {
  Object.values(material as unknown as Record<string, unknown>).forEach((value) => {
    if (isDisposableTexture(value)) {
      value.dispose();
    }
  });

  material.dispose();
}

function disposeCharacter(character: THREE.Object3D) {
  character.traverse((child) => {
    if (!("isMesh" in child) || !child.isMesh) return;

    const mesh = child as THREE.Mesh;
    mesh.geometry?.dispose();

    if (Array.isArray(mesh.material)) {
      mesh.material.forEach(disposeMaterial);
    } else {
      disposeMaterial(mesh.material);
    }
  });
}

function prepareCharacterForRender(
  character: THREE.Object3D,
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera,
  scene: THREE.Scene,
) {
  applyCharacterPalette(character);
  hideFloorPlate(character);

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

  renderer.compile(character, camera, scene);
}

function hideFloorPlate(character: THREE.Object3D) {
  const ground = character.getObjectByName("ground");
  if (ground) {
    ground.visible = false;
  }
}

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  shouldContinue: () => boolean = () => true,
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
          "Character3D#@",
        );
        blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        loader.load(
          blobUrl,
          (gltf) => {
            const character = gltf.scene;

            if (!shouldContinue()) {
              disposeCharacter(character);
              dracoLoader.dispose();
              if (blobUrl) URL.revokeObjectURL(blobUrl);
              resolve(null);
              return;
            }

            try {
              prepareCharacterForRender(character, renderer, camera, scene);
            } catch (error) {
              disposeCharacter(character);
              dracoLoader.dispose();
              if (blobUrl) URL.revokeObjectURL(blobUrl);
              reject(error);
              return;
            }

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
          },
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