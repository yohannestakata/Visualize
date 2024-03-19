import { Outlet } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { useRef, useState } from "react";
import { Vector3 } from "three";

function Cube({ position, scale }) {
  const fbx = useLoader(FBXLoader, "../../../../3d_models/RubikCube.fbx");
  const [cameraDelta, setCameraDelta] = useState(0);

  const meshRef = useRef();

  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta / 8;
    meshRef.current.rotation.x += delta / 8;
    state.camera.position.x = Math.sin(cameraDelta / 5) * 10;
    state.camera.position.z = Math.cos(cameraDelta / 5) * 10;

    setCameraDelta((prev) => prev + delta);
  });

  return (
    <mesh ref={meshRef} position={position}>
      <primitive object={fbx} scale={scale} />
    </mesh>
  );
}

function CubeScene() {
  function randomPosition() {
    return [
      Math.random() * 50 - 25,
      Math.random() * 50 - 25,
      Math.random() * 50 - 25,
    ];
  }

  const [cubes, setCubes] = useState(
    [...Array(50)].map(() => ({
      position: new Vector3(...randomPosition()),
      scale: Math.random() / 6,
    }))
  );
  return (
    <>
      <OrbitControls />
      <ambientLight intensity={15} />
      <pointLight position={[2, 1, 1]} color={"#22c55e"} intensity={5} />
      {cubes.map((cube, index) => (
        <mesh key={index} {...cube}>
          <pointsMaterial color="#15803d" size={0.015} sizeAttenuation />
          <sphereGeometry args={[1, 48, 48]} />
        </mesh>
      ))}
      {/* {cubes.map((cube, index) => (
        <Cube key={index} scale={20} />
        ))} */}
      <Cube scale={50} />
    </>
  );
}

function AuthLayout() {
  return (
    <div className="flex items-center p-6 gap-20 h-screen justify-center w-full overflow-hidden ">
      <div className="absolute top-0 right-0 m-3">
        <ModeToggle />
      </div>
      <div className="flex-1 relative flex justify-center items-center h-full w-full ">
        <div className="flex flex-col h-full w-full">
          <div className="flex-1">
            <Canvas camera={{ position: [0, 0, 5] }}>
              <CubeScene />
            </Canvas>
          </div>
          <div className="backdrop-blur-2xl rounded-md absolute bottom-0 w-full">
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
      <div className="flex-1 flex justify-center">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
