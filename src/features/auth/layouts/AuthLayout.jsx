import { Outlet } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { useRef, useState } from "react";
import { Vector3 } from "three";

function Cube({ position, scale }) {
  const fbx = useLoader(FBXLoader, "../../../../3d_models/RubikCube.fbx");
  const meshRef = useRef();
  const cameraDeltaRef = useRef(0);

  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta / 25;
    meshRef.current.rotation.x += delta / 25;
    cameraDeltaRef.current += delta;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <primitive object={fbx} scale={scale} />
    </mesh>
  );
}

function CubeScene() {
  return (
    <>
      <OrbitControls />
      <ambientLight intensity={15} />
      <pointLight position={[2, 1, 1]} color={"#22c55e"} intensity={5} />

      <Cube scale={35} />
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
          <div className="backdrop-blur-sm rounded-md absolute bottom-0 ">
            <h2 className="text-3xl text-primary font-semibold">
              Learn, Play, Excel.
            </h2>
            <p className="mt-2 text">
              Immerse yourself in interactive quizzes, unlock exciting rewards,
              and rise to the top of the leaderboard for an unparalleled
              educational adventure.
            </p>
          </div>
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
