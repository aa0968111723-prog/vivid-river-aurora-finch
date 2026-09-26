import { useGLTF, useAnimations } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, type RefObject } from "react";
import { LoopOnce, LoopRepeat, type Group, type Object3D } from "three";
import { applyBlinkScale, applyBreathScale, applyHeadRotation, applyLimbRotation, type TurtlePhase, type TurtlePose } from "@/lib/turtle/state-machine";
import type { TurtlePresentation } from "@/lib/turtle/presentation";

type Look = { x: number; y: number };
type Bind = { x: number; y: number; z: number; sx: number; sy: number; sz: number };

function bindOf(object: Object3D, store: Map<string, Bind>) {
  const cached = store.get(object.name);
  if (cached) return cached;
  const next = { x: object.rotation.x, y: object.rotation.y, z: object.rotation.z, sx: object.scale.x, sy: object.scale.y, sz: object.scale.z };
  store.set(object.name, next);
  return next;
}

function TurtleMesh({
  phase,
  presentation,
  look,
  poseRef,
  particles,
  onInteract,
}: {
  phase: TurtlePhase;
  presentation: TurtlePresentation;
  look: Look;
  poseRef: RefObject<TurtlePose>;
  particles: number;
  onInteract: () => void;
}) {
  const url = presentation === "simple" ? "/models/turtle-lite.glb" : "/models/turtle.glb";
  const group = useRef<Group>(null);
  const gltf = useGLTF(url);
  const scene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);
  const { actions } = useAnimations(gltf.animations, group);
  const binds = useRef(new Map<string, Bind>());
  const leafCount = presentation === "simple" ? 0 : Math.round(Math.min(1, particles) * 10);

  useEffect(() => {
    const current = actions[phase];
    if (!current) return;
    const loop = phase === "idle" || phase === "meditate" || phase === "talk" ? LoopRepeat : LoopOnce;
    current.reset();
    current.clampWhenFinished = loop === LoopOnce;
    current.setLoop(loop, loop === LoopOnce ? 1 : Infinity);
    current.fadeIn(0.35).play();
    return () => {
      current.fadeOut(0.35);
    };
  }, [actions, phase]);

  useFrame(() => {
    const pose = poseRef.current;
    if (!pose) return;
    const head = scene.getObjectByName("Head");
    if (head) {
      const rest = bindOf(head, binds.current);
      const next = applyHeadRotation(rest, pose, look);
      head.rotation.set(next.x, next.y, next.z);
    }
    for (const name of ["EyeL", "EyeR"]) {
      const eye = scene.getObjectByName(name);
      if (!eye) continue;
      const rest = bindOf(eye, binds.current);
      eye.scale.set(rest.sx, applyBlinkScale(rest.sy, pose), rest.sz);
    }
    const shell = scene.getObjectByName("Shell");
    if (shell) {
      const rest = bindOf(shell, binds.current);
      shell.scale.set(rest.sx, applyBreathScale(rest.sy, pose), rest.sz);
    }
    for (const [name, side] of [["LegFL", 1], ["LegFR", -1], ["LegBL", 1], ["LegBR", -1]] as const) {
      const leg = scene.getObjectByName(name);
      if (!leg) continue;
      const rest = bindOf(leg, binds.current);
      leg.rotation.set(rest.x, rest.y, applyLimbRotation(rest.z, pose, side));
    }
  });

  const leaves = useMemo(
    () =>
      Array.from({ length: 10 }, (_, index) => ({
        position: [(index - 5) * 0.18, 0.35 + (index % 3) * 0.12, -0.2 - (index % 4) * 0.08] as [number, number, number],
        scale: 0.035 + (index % 3) * 0.01,
      })),
    [],
  );

  return (
    <group
      ref={group}
      onClick={(event) => {
        event.stopPropagation();
        onInteract();
      }}
    >
      <primitive object={scene} />
      {leaves.slice(0, leafCount).map((leaf, index) => (
        <mesh key={index} position={leaf.position} rotation={[0.4, index, 0.2]}>
          <planeGeometry args={[leaf.scale, leaf.scale * 1.6]} />
          <meshStandardMaterial color={index % 2 ? "#d7a15a" : "#7f9a62"} roughness={0.9} metalness={0} transparent opacity={0.55} />
        </mesh>
      ))}
    </group>
  );
}

export function TurtleCanvas({
  phase,
  presentation,
  look,
  poseRef,
  particles,
  paused,
  onInteract,
  onUnavailable,
}: {
  phase: TurtlePhase;
  presentation: TurtlePresentation;
  look: Look;
  poseRef: RefObject<TurtlePose>;
  particles: number;
  paused: boolean;
  onInteract: () => void;
  onUnavailable: () => void;
}) {
  return (
    <Canvas
      className="h-full w-full"
      dpr={presentation === "simple" ? 1 : [1, 1.5]}
      frameloop={paused ? "never" : "always"}
      camera={{ position: [0, 0.35, 2.55], fov: 32 }}
      gl={{ antialias: presentation !== "simple", alpha: true, powerPreference: "low-power" }}
      onCreated={({ gl }) => {
        const context = gl.getContext();
        if (!context) onUnavailable();
      }}
    >
      <color attach="background" args={["#f6f1e6"]} />
      <hemisphereLight args={["#fff6ea", "#8aa07a", 0.85]} />
      <ambientLight intensity={0.28} color="#fff4e4" />
      <directionalLight position={[2.4, 3.6, 2]} intensity={1.15} color="#ffd7a8" />
      <Suspense fallback={null}>
        <TurtleMesh phase={phase} presentation={presentation} look={look} poseRef={poseRef} particles={particles} onInteract={onInteract} />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload("/models/turtle.glb");
useGLTF.preload("/models/turtle-lite.glb");
