import { Outlet } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { useRef } from "react";

function Cubes() {
  const fbx = useLoader(FBXLoader, "../../../../3d_models/RubikCube.fbx");

  const meshRef = useRef();

  useFrame((state) => {
    meshRef.current.rotation.y += 0.004;
  });

  return (
    <>
      <ambientLight intensity={15} />
      <pointLight position={[2, 1, 1]} color={"#22c55e"} intensity={5} />

      <mesh ref={meshRef}>
        <primitive object={fbx} scale={30} />
      </mesh>

      <OrbitControls />
    </>
  );
}

function AuthLayout() {
  return (
    <div className="flex items-center h-screen justify-center w-full overflow-hidden ">
      <div className="absolute top-0 right-0 m-3">
        <ModeToggle />
      </div>
      <div className="flex-1 relative flex justify-center items-center h-full w-full ">
        <Canvas camera={{ position: [4.5, 2, 0] }}>
          <Cubes />
        </Canvas>
        <div className="absolute  m-3 bottom-0 p-6 left-0 backdrop-blur-2xl rounded-md">
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
      <div className="flex-1 flex justify-center">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
