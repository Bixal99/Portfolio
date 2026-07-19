/* eslint-disable react/no-unknown-property */
"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  type RapierRigidBody,
  type RigidBodyProps,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";
import "./Lanyard.css";

// Upstream noise we can't fix without forking deps:
// - @react-three/fiber v9 still constructs THREE.Clock (deprecated in three r183+).
// - @dimforge/rapier3d-compat init() still passes a WASM byte array into wasm-bindgen's
//   new object-only init API ("pass a single object instead").
if (typeof window !== "undefined") {
  const flag = "__suppressLanyardUpstreamWarn" as const;
  const g = window as Window & { [flag]?: boolean };
  if (!g[flag]) {
    g[flag] = true;
    const warn = console.warn.bind(console);
    console.warn = (...args: unknown[]) => {
      const first = args[0];
      if (typeof first === "string") {
        if (
          first.includes("THREE.Clock") &&
          first.includes("deprecated")
        ) {
          return;
        }
        if (
          first.includes(
            "using deprecated parameters for the initialization function",
          )
        ) {
          return;
        }
      }
      warn(...args);
    };
  }
}

// meshline isn't typed for R3F's extend registry
extend({ MeshLineGeometry, MeshLineMaterial } as never);

const CARD_GLB = "/lanyard/card.glb";
const LANYARD_PNG = "/lanyard/lanyard.png";

const BLANK_PIXEL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

const FRONT_UV_RECT = { x: 0, y: 0, w: 0.5, h: 0.755 };
const BACK_UV_RECT = { x: 0.5, y: 0, w: 0.5, h: 0.757 };

type ImageFit = "cover" | "contain";

export type LanyardProps = {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  frontImage?: string | null;
  backImage?: string | null;
  imageFit?: ImageFit;
  lanyardImage?: string | null;
  lanyardWidth?: number;
  /** Visual scale of the ID card mesh. Default 2.25 (React Bits). */
  cardScale?: number;
  /** World Y of the lanyard anchor. Higher = card hangs higher in frame. Default 4. */
  hangY?: number;
};

type BandProps = {
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
  frontImage?: string | null;
  backImage?: string | null;
  imageFit?: ImageFit;
  lanyardImage?: string | null;
  lanyardWidth?: number;
  cardScale?: number;
  hangY?: number;
};

type DragOffset = THREE.Vector3 | false;

type LerpBody = RapierRigidBody & { lerped?: THREE.Vector3 };

type CardGltf = {
  nodes: {
    card: THREE.Mesh;
    clip: THREE.Mesh;
    clamp: THREE.Mesh;
  };
  materials: {
    base: THREE.MeshStandardMaterial & { map: THREE.Texture };
    metal: THREE.Material;
  };
};

export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  frontImage = null,
  backImage = null,
  imageFit = "cover",
  lanyardImage = null,
  lanyardWidth = 1,
  cardScale = 2.25,
  hangY = 4,
}: LanyardProps) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768,
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="lanyard-wrapper">
      <Canvas
        camera={{ position, fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) =>
          gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)
        }
      >
        <Suspense fallback={null}>
          <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
            <Band
              isMobile={isMobile}
              frontImage={frontImage}
              backImage={backImage}
              imageFit={imageFit}
              lanyardImage={lanyardImage}
              lanyardWidth={lanyardWidth}
              cardScale={cardScale}
              hangY={hangY}
            />
          </Physics>
          {/* Same Lightformer setup as React Bits — makes black metal hook readable */}
          <Environment blur={0.75}>
            <Lightformer
              intensity={2}
              color="white"
              position={[0, -1, 5]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[-1, -1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[1, 1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={10}
              color="white"
              position={[-10, 0, 14]}
              rotation={[0, Math.PI / 2, Math.PI / 3]}
              scale={[100, 10, 1]}
            />
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  );
}

function Band({
  maxSpeed = 50,
  minSpeed = 0,
  isMobile = false,
  frontImage = null,
  backImage = null,
  imageFit = "cover",
  lanyardImage = null,
  lanyardWidth = 1,
  cardScale = 2.25,
  hangY = 4,
}: BandProps) {
  const band = useRef<THREE.Mesh>(null);
  const fixed = useRef<RapierRigidBody>(null!);
  const j1 = useRef<RapierRigidBody>(null!);
  const j2 = useRef<RapierRigidBody>(null!);
  const j3 = useRef<RapierRigidBody>(null!);
  const card = useRef<RapierRigidBody>(null!);

  const vec = useMemo(() => new THREE.Vector3(), []);
  const ang = useMemo(() => new THREE.Vector3(), []);
  const rot = useMemo(() => new THREE.Vector3(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);

  const segmentProps: RigidBodyProps = {
    type: "dynamic",
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4,
  };

  const { nodes, materials } = useGLTF(CARD_GLB) as unknown as CardGltf;

  // React Bits calibrates joints for scale 2.25 — keep hook/strap locked when scaling up
  const BASE_CARD_SCALE = 2.25;
  const scaleRatio = cardScale / BASE_CARD_SCALE;

  // Always map the strap texture (black band + logos) — matches React Bits
  const texture = useTexture(lanyardImage || LANYARD_PNG);
  const frontTex = useTexture(frontImage || BLANK_PIXEL);
  const backTex = useTexture(backImage || BLANK_PIXEL);

  const cardMap = useMemo(() => {
    const baseMap = materials.base.map;
    if (!frontImage && !backImage) return baseMap;

    const baseImg = baseMap.image as CanvasImageSource & {
      width: number;
      height: number;
    };
    const W = baseImg.width;
    const H = baseImg.height;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return baseMap;
    ctx.drawImage(baseImg, 0, 0, W, H);

    const drawFitted = (
      img: CanvasImageSource & { width: number; height: number },
      rect: { x: number; y: number; w: number; h: number },
    ) => {
      const rx = rect.x * W;
      const ry = rect.y * H;
      const rw = rect.w * W;
      const rh = rect.h * H;

      const pick = imageFit === "contain" ? Math.min : Math.max;
      const scale = pick(rw / img.width, rh / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      const dx = rx + (rw - dw) / 2;
      const dy = ry + (rh - dh) / 2;
      ctx.save();
      ctx.beginPath();
      ctx.rect(rx, ry, rw, rh);
      ctx.clip();
      ctx.drawImage(img, dx, dy, dw, dh);
      ctx.restore();
    };

    const asSized = (image: unknown) =>
      image as CanvasImageSource & { width: number; height: number };

    if (frontImage && frontTex.image) drawFitted(asSized(frontTex.image), FRONT_UV_RECT);
    if (backImage && backTex.image) drawFitted(asSized(backTex.image), BACK_UV_RECT);

    const composite = new THREE.CanvasTexture(canvas);
    composite.colorSpace = baseMap.colorSpace ?? THREE.SRGBColorSpace;
    composite.flipY = baseMap.flipY;
    composite.anisotropy = 16;
    composite.needsUpdate = true;
    return composite;
  }, [frontImage, backImage, imageFit, frontTex, backTex, materials.base.map]);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]),
  );
  const [dragged, drag] = useState<DragOffset>(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.45 * scaleRatio, 0],
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => {
        document.body.style.cursor = "auto";
      };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    const isFiniteVec3 = (v: { x: number; y: number; z: number } | undefined) =>
      !!v &&
      Number.isFinite(v.x) &&
      Number.isFinite(v.y) &&
      Number.isFinite(v.z);

    // Tab switches / hitch frames can yield huge or non-finite deltas;
    // uncapped lerp alpha turns rope sample points into NaNs for MeshLine.
    const frameDelta = Number.isFinite(delta) ? Math.min(delta, 1 / 30) : 1 / 60;

    if (dragged && card.current) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    if (fixed.current) {
      ([j1, j2] as const).forEach((ref) => {
        const body = ref.current as LerpBody | null;
        if (!body) return;
        const translation = body.translation();
        if (!isFiniteVec3(translation)) return;
        if (!body.lerped) {
          body.lerped = new THREE.Vector3(translation.x, translation.y, translation.z);
        }
        const current = new THREE.Vector3(translation.x, translation.y, translation.z);
        const clampedDistance = Math.max(
          0.1,
          Math.min(1, body.lerped.distanceTo(current)),
        );
        const alpha = Math.min(
          1,
          frameDelta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)),
        );
        body.lerped.lerp(current, alpha);
      });

      if (
        !j3.current ||
        !j2.current ||
        !j1.current ||
        !fixed.current ||
        !card.current ||
        !band.current
      ) {
        return;
      }

      const j3t = j3.current.translation();
      const j2Body = j2.current as LerpBody;
      const j1Body = j1.current as LerpBody;
      const fixedT = fixed.current.translation();

      if (
        !isFiniteVec3(j3t) ||
        !isFiniteVec3(fixedT) ||
        !isFiniteVec3(j2Body.lerped) ||
        !isFiniteVec3(j1Body.lerped)
      ) {
        return;
      }

      curve.points[0].set(j3t.x, j3t.y, j3t.z);
      curve.points[1].copy(j2Body.lerped!);
      curve.points[2].copy(j1Body.lerped!);
      curve.points[3].set(fixedT.x, fixedT.y, fixedT.z);

      // Chordal CatmullRom + zero-length rope (physics not settled) yields NaNs
      // inside MeshLineGeometry.setPoints → computeBoundingSphere warnings.
      let curveLength = 0;
      for (let i = 0; i < 3; i++) {
        curveLength += curve.points[i].distanceTo(curve.points[i + 1]);
      }
      if (curveLength < 1e-4) return;

      const points = curve.getPoints(isMobile ? 16 : 32);
      if (
        points.length < 2 ||
        points.some((point) => !isFiniteVec3(point))
      ) {
        return;
      }

      const geometry = band.current.geometry as THREE.BufferGeometry & {
        setPoints?: (pts: THREE.Vector3[]) => void;
      };
      if (typeof geometry.setPoints !== "function") return;
      geometry.setPoints(points);

      const angVel = card.current.angvel();
      const rotation = card.current.rotation();
      if (!isFiniteVec3(angVel) || !isFiniteVec3(rotation)) return;
      ang.set(angVel.x, angVel.y, angVel.z);
      rot.set(rotation.x, rotation.y, rotation.z);
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z }, true);
    }
  });

  curve.curveType = "chordal";
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, hangY, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider
            args={[0.8 * scaleRatio, 1.125 * scaleRatio, 0.01]}
          />
          <group
            scale={cardScale}
            position={[0, -1.2 * scaleRatio, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => {
              (e.target as Element).releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e) => {
              (e.target as Element).setPointerCapture(e.pointerId);
              if (!card.current) return;
              const translation = card.current.translation();
              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(vec.set(translation.x, translation.y, translation.z)),
              );
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={cardMap}
                map-anisotropy={16}
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>
            <mesh
              geometry={nodes.clip.geometry}
              material={materials.metal}
              material-roughness={0.3}
            />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={lanyardWidth}
        />
      </mesh>
    </>
  );
}

useGLTF.preload(CARD_GLB);
