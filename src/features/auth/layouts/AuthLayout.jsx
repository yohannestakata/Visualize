import { Outlet } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, useHelper } from "@react-three/drei";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { useRef, useState } from "react";
import { PointLightHelper, Vector3 } from "three";

function Cube({ position, scale }) {
  const fbx = useLoader(FBXLoader, "../../../../3d_models/Earth.fbx");
  const meshRef = useRef();

  const cameraDeltaRef = useRef(0);

  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta / 25;
    meshRef.current.rotation.x += delta / 25;
    cameraDeltaRef.current += delta;
  });

  const fbxClone = fbx.clone();

  return (
    <mesh ref={meshRef} position={position}>
      <primitive object={fbxClone} scale={scale} />
    </mesh>
  );
}

function CubeScene() {
  const icoRef = useRef();
  const coneRef = useRef();

  useFrame((state, delta) => {
    icoRef.current.rotation.y += delta / 5;
    coneRef.current.rotation.y += delta / 5;
  });

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

      <mesh position={[3.25, 1.8, 0]} scale={0.54} ref={icoRef}>
        <meshBasicMaterial color={"#22c55e"} wireframe />
        <icosahedronGeometry args={[1, 0]} />
      </mesh>
      <Cube scale={28} position={[0, 0, 0]} />
      <mesh position={[-3.25, -1.8, 0]} scale={0.06} ref={coneRef}>
        <meshBasicMaterial color={"#22c55e"} wireframe />
        <coneGeometry args={[5, 10, 6]} />
      </mesh>
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
    [...Array(50)].map(() => ({
      position: new Vector3(...randomPosition()),
      scale: Math.random() / 4,
    }))
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
    <div className="flex items-center p-6 gap-20 h-screen justify-center w-full overflow-hidden ">
      <div className="absolute top-0 right-0 m-3 z-10">
        <ModeToggle />
      </div>
      <div className="flex-1 z-10 relative flex justify-center items-center h-full w-full ">
        <div className="flex flex-col h-full w-full">
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
      <div className="flex-1 flex justify-center z-10">
        <Outlet />
      </div>
      <div className="absolute top-0 left-0 w-screen h-screen">
        <Canvas>
          <StarsScene />
        </Canvas>
      </div>
    </div>
  );
}

export default AuthLayout;
