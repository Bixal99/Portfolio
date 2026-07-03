import * as THREE from "three";
import { gsap } from "gsap";

const PORTFOLIO_GREEN = "#5dd3b6";
const ENV_WIDTH = 32;
const ENV_HEIGHT = 16;

function createThemeEnvironmentTexture() {
  const texture = new THREE.DataTexture(
    new Uint8Array(ENV_WIDTH * ENV_HEIGHT * 3),
    ENV_WIDTH,
    ENV_HEIGHT,
    THREE.RGBFormat,
  );
  texture.mapping = THREE.EquirectangularReflectionMapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function updateThemeEnvironmentTexture(texture: THREE.DataTexture, accent: THREE.Color) {
  const data = texture.image.data as Uint8Array;
  const accentR = accent.r * 255;
  const accentG = accent.g * 255;
  const accentB = accent.b * 255;

  for (let y = 0; y < ENV_HEIGHT; y += 1) {
    const v = y / (ENV_HEIGHT - 1);
    const horizon = Math.exp(-Math.pow((v - 0.46) / 0.2, 2));
    const overhead = Math.exp(-Math.pow((v - 0.16) / 0.16, 2));

    for (let x = 0; x < ENV_WIDTH; x += 1) {
      const u = x / (ENV_WIDTH - 1);
      const frontHighlight = Math.exp(-Math.pow((u - 0.56) / 0.16, 2)) * overhead;
      const index = (y * ENV_WIDTH + x) * 3;
      const neutral = 18 + frontHighlight * 112;
      const accentStrength = 0.18 + horizon * 0.72;

      data[index] = Math.min(255, neutral + accentR * accentStrength);
      data[index + 1] = Math.min(255, neutral + accentG * accentStrength);
      data[index + 2] = Math.min(255, neutral + accentB * accentStrength);
    }
  }

  texture.needsUpdate = true;
}

const setLighting = (scene: THREE.Scene) => {
  const greenAccent = new THREE.Color(PORTFOLIO_GREEN);
  const themeEnvironment = createThemeEnvironmentTexture();
  scene.environment = themeEnvironment;
  scene.environmentIntensity = 0;

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.34);
  scene.add(ambientLight);

  const fillLight = new THREE.HemisphereLight(0xffffff, 0x1a302b, 0.7);
  scene.add(fillLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 0);
  keyLight.position.set(3.2, 7.2, 9.5);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.width = 1024;
  keyLight.shadow.mapSize.height = 1024;
  keyLight.shadow.camera.near = 0.5;
  keyLight.shadow.camera.far = 50;
  scene.add(keyLight);

  const accentLight = new THREE.DirectionalLight(greenAccent, 0);
  accentLight.position.set(-4.5, 4.2, 2.2);
  scene.add(accentLight);

  const pointLight = new THREE.PointLight(greenAccent, 0, 100, 3);
  pointLight.position.set(3, 12, 4);
  pointLight.castShadow = true;
  scene.add(pointLight);

  function syncPortfolioGreenLights() {
    accentLight.color.copy(greenAccent);
    pointLight.color.copy(greenAccent);
    updateThemeEnvironmentTexture(themeEnvironment, greenAccent);
  }

  syncPortfolioGreenLights();

  function setPointLight(screenLight: THREE.Object3D | null) {
    const material = screenLight && "material" in screenLight ? (screenLight as THREE.Mesh).material : null;
    if (material && !Array.isArray(material)) {
      const screenMaterial = material as THREE.Material & { emissiveIntensity?: number; opacity: number };
      pointLight.intensity = screenMaterial.opacity > 0.9 ? (screenMaterial.emissiveIntensity ?? 0) * 20 : 0;
    } else {
      pointLight.intensity = 0;
    }
  }

  function turnOnLights() {
    syncPortfolioGreenLights();
    gsap.to(scene, {
      environmentIntensity: 0.46,
      duration: 1.8,
      ease: "power2.inOut",
    });
    gsap.to(keyLight, {
      intensity: 1.06,
      duration: 1.8,
      ease: "power2.inOut",
    });
    gsap.to(accentLight, {
      intensity: 0.28,
      duration: 1.8,
      ease: "power2.inOut",
    });
    gsap.to(".character-rim", {
      y: "55%",
      opacity: 0.62,
      delay: 0.2,
      duration: 2,
    });
  }

  function dispose() {
    themeEnvironment.dispose();
  }

  return { setPointLight, turnOnLights, dispose };
};

export default setLighting;