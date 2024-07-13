/* eslint-disable react/no-unknown-property */
import { CameraControls, OrbitControls, Resize } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useEffect, useRef, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { ArrowLeftRight, ArrowUpDown, Scale } from "lucide-react";
import { SizeIcon } from "@radix-ui/react-icons";

function Model({
  modelUrl,
  clickedMesh,
  onClick,
  onPointerMissed,
  showHelper = true,
  setMeshes,
}) {
  const [hoveredMesh, setHoveredMesh] = useState("Nothing hovered");
  const model = useLoader(GLTFLoader, modelUrl);

  useEffect(() => {
    if (setMeshes) setMeshes(model?.scene?.children);
  }, [model?.scene?.children, setMeshes]);

  function handlePointerEnter(e) {
    e.stopPropagation();
    setHoveredMesh(e.object.name);
  }

  function renderNode(node, materials) {
    return (
      <mesh
        key={node.name}
        matrix={node.matrix}
        geometry={node.geometry}
        material={
          node.name === clickedMesh?.name
            ? new THREE.MeshBasicMaterial({
                color: "#22c55e",
              })
            : materials[node.material?.name] || new THREE.MeshBasicMaterial()
        }
        rotation={node.rotation}
        position={node?.position}
        scale={node.scale}
        name={node.name}
        onClick={onClick}
        onPointerMissed={onPointerMissed}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={() => setHoveredMesh("Nothing hovered")}
      >
        {node.children.length > 0 && (
          <group>
            {node.children.map((child) => {
              return renderNode(child, materials);
            })}
          </group>
        )}
      </mesh>
    );
  }

  return (
    <div className="relative h-full w-full">
      {showHelper && (
        <div className="pointer-events-none absolute left-1 top-1 z-50 rounded-sm  px-2 py-1 text-sm text-foreground">
          {hoveredMesh}
        </div>
      )}
      <Canvas concurrent className="h-full w-full">
        <ambientLight intensity={1.2} />
        <directionalLight position={[1, 2, 3]} />
        <OrbitControls />
        <group scale={4} position={[0, 0, 0]}>
          <Resize>
            {model.scene.children.map((node) =>
              renderNode(node, model.materials),
            )}
          </Resize>
        </group>
      </Canvas>
    </div>
  );
}

export default Model;
