/* eslint-disable react/no-unknown-property */
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useState } from "react";

function Model({
  modelUrl,
  clickedMesh,
  onClick,
  onPointerMissed,
  showHelper = true,
}) {
  const [hoveredMesh, setHoveredMesh] = useState();
  const model = useLoader(GLTFLoader, modelUrl);

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
            : materials[node.material?.name]
        }
        rotation={node.rotation}
        position={node?.position}
        scale={node.scale}
        name={node.name}
        onClick={onClick}
        onPointerMissed={onPointerMissed}
        onPointerEnter={handlePointerEnter}
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
        <div className="pointer-events-none absolute left-1 top-1 z-50 rounded-sm border px-2 py-1 text-sm leading-none">
          {hoveredMesh || "No selection"}
        </div>
      )}
      <Canvas className="h-full w-full border">
        <ambientLight intensity={1.2} />
        <directionalLight position={[1, 2, 3]} />
        <OrbitControls />
        <group scale={0.5} position={[0, -1, 0]} dispose={null}>
          {model.scene.children.map((node) =>
            renderNode(node, model.materials),
          )}
        </group>
      </Canvas>
    </div>
  );
}

export default Model;
