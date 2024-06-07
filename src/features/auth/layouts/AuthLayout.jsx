import { Outlet } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, useHelper } from "@react-three/drei";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { useEffect, useRef, useState } from "react";
import { PointLightHelper, TextureLoader, Vector3 } from "three";

function Cube({ position, scale }) {
  const fbx = useLoader(FBXLoader, "../../../../3d_models/RubikCube.fbx");

  const meshRef = useRef();

  const cameraDeltaRef = useRef(0);

  useEffect(() => {
    if (meshRef.current) meshRef.current.rotation.y = Math.PI;
  });

  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta / 25;
    meshRef.current.rotation.x += delta / 25;
    cameraDeltaRef.current += delta;
  });

  const fbxClone = fbx.clone();

  return (
    <mesh ref={meshRef} position={position} rotateZ={Math.PI / 3}>
      <primitive object={fbxClone} scale={scale} />
      <meshBasicMaterial />
    </mesh>
  );
}

function CubeScene() {
  const icoRef = useRef();
  const coneRef = useRef();

  const pointLightRef = useRef();

  // useHelper(pointLightRef, PointLightHelper, 1, "red");

  return (
    <>
      <OrbitControls />
      <ambientLight intensity={13} />
      <pointLight
        position={[-3, 0, 2]}
        ref={pointLightRef}
        color={"#22c55e"}
        intensity={20}
      />

      <Cube scale={28} position={[0, 0, 0]} />
    </>
  );
}

function StarsScene() {
  function randomPosition() {
    return [
      (Math.random() - 0.5) * 80,
      (Math.random() - 0.5) * 80,
      (Math.random() - 0.5) * 80,
    ];
  }

  const [cubes, setCubes] = useState(
    [...Array(25)].map(() => ({
      position: new Vector3(...randomPosition()),
      scale: Math.random() / 4,
    })),
  );

  const [cameraDelta, setCameraDelta] = useState(0);

  useFrame((state, delta) => {
    state.camera.position.x = Math.sin(cameraDelta / 10) * 25;
    state.camera.position.z = Math.cos(cameraDelta / 10) * 25;
    state.camera.lookAt(0, 0, 0);

    setCameraDelta((prev) => prev + delta);
  });

  return (
    <>
      {cubes.map((cube, index) => (
        <mesh key={index} {...cube}>
          <pointsMaterial color="#16a34a" size={0.015} sizeAttenuation />
          <sphereGeometry args={[1, 48, 48]} />
        </mesh>
      ))}
    </>
  );
}

function AuthLayout() {
  return (
    <div className="flex h-screen w-full items-center justify-center gap-20 overflow-hidden p-6 ">
      <div className="absolute right-0 top-0 z-10 m-3">
        <ModeToggle />
      </div>
      <div className="relative z-10 flex h-full w-full flex-1 items-center justify-center ">
        <div className="flex h-full w-full flex-col">
          <div className="flex-1 ">
            <Canvas camera={{ position: [0, 0, 5] }}>
              <CubeScene />
            </Canvas>
          </div>
          {/* <div className="backdrop-blur-sm rounded-md absolute bottom-0 ">
            <h2 className="text-3xl text-primary font-semibold">
              Learn, Play, Excel.
            </h2>
            <p className="mt-2 text">
              Immerse yourself in interactive quizzes, unlock exciting rewards,
              and rise to the top of the leaderboard for an unparalleled
              educational adventure.
            </p>
          </div> */}
        </div>
      </div>
      <div className="z-10 flex flex-1 justify-center">
        <Outlet />
      </div>
      <div className="absolute left-0 top-0 h-screen w-screen">
        <Canvas>
          <StarsScene />
        </Canvas>
      </div>
    </div>
  );
}

export default AuthLayout;
