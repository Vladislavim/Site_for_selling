import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'

const routePalettes = {
  default: { primary: '#88bfff', secondary: '#8cf2d3', accent: '#ff8e72', halo: '#f6f1e8', void: '#07111c' },
  services: { primary: '#8cf2d3', secondary: '#88bfff', accent: '#ddb57a', halo: '#f6f1e8', void: '#061015' },
  pricing: { primary: '#ddb57a', secondary: '#88bfff', accent: '#ff8e72', halo: '#f6f1e8', void: '#0a1019' },
  contact: { primary: '#ff8e72', secondary: '#8cf2d3', accent: '#88bfff', halo: '#f6f1e8', void: '#0b0f17' },
}

const defaultQuality = {
  antialias: true,
  detail: 0.82,
  dpr: [1, 1.35],
  enablePost: true,
  particleFactor: 0.72,
  pointerEnabled: true,
  reducedMotion: false,
  tier: 'medium',
}

const damp = THREE.MathUtils.damp
const TAU = Math.PI * 2

const getPalette = (routeKey) => {
  if (routeKey.startsWith('/services')) {
    return routePalettes.services
  }

  if (routeKey.startsWith('/pricing')) {
    return routePalettes.pricing
  }

  if (routeKey.startsWith('/contact')) {
    return routePalettes.contact
  }

  return routePalettes.default
}

const blendColor = (from, to, ratio) => new THREE.Color(from).lerp(new THREE.Color(to), ratio)

const pseudoRandom = (seed) => {
  const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453123

  return value - Math.floor(value)
}

const getSceneTuning = (quality) => ({
  commandDetail: quality.tier === 'high' ? 2 : 1,
  fragmentCount: Math.max(8, Math.round(14 * (0.7 + quality.particleFactor * 0.5))),
  knotSegments: quality.tier === 'high' ? 240 : quality.tier === 'medium' ? 180 : 120,
  knotSides: quality.tier === 'high' ? 30 : quality.tier === 'medium' ? 24 : 18,
  particleBack: Math.max(260, Math.round(720 * quality.particleFactor)),
  particleMid: Math.max(180, Math.round(520 * quality.particleFactor)),
  particleDeep: Math.max(120, Math.round(400 * quality.particleFactor)),
  ribbonSegments: quality.tier === 'high' ? 180 : quality.tier === 'medium' ? 140 : 100,
  shardCount: Math.max(12, Math.round(26 * (0.65 + quality.particleFactor * 0.4))),
  signalCount: Math.max(14, Math.round(22 * (0.65 + quality.particleFactor * 0.4))),
  sphereSegments: Math.max(26, Math.round(42 * quality.detail)),
})

const TransmissionPlanet = ({ position, palette, radius = 1.45, scrollRef, quality }) => {
  const groupRef = useRef(null)
  const ringRef = useRef(null)
  const moonRef = useRef(null)
  const sphereSegments = Math.max(28, Math.round(40 * quality.detail))

  useFrame((state, delta) => {
    const progress = scrollRef.current.progress
    const velocity = scrollRef.current.velocity
    const sectionProgress = scrollRef.current.section.progress

    if (!groupRef.current || !ringRef.current || !moonRef.current) {
      return
    }

    groupRef.current.position.y = damp(
      groupRef.current.position.y,
      position[1] + Math.sin(state.clock.elapsedTime * 0.32 + progress * 6) * 0.42 + sectionProgress * 0.08,
      2.4,
      delta,
    )
    groupRef.current.rotation.y += delta * 0.08
    groupRef.current.rotation.x = damp(groupRef.current.rotation.x, Math.sin(progress * TAU * 0.8) * 0.12, 2.2, delta)
    ringRef.current.rotation.z += delta * 0.06 + velocity * 0.00002
    moonRef.current.rotation.y += delta * 0.34
  })

  return (
    <group ref={groupRef} position={position}>
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[radius, sphereSegments, sphereSegments]} />
        <meshPhysicalMaterial
          attenuationColor={palette.secondary}
          attenuationDistance={1.8}
          clearcoat={1}
          clearcoatRoughness={0.05}
          color={palette.halo}
          emissive={palette.primary}
          emissiveIntensity={0.12}
          iridescence={0.28}
          iridescenceIOR={1.2}
          metalness={0.1}
          roughness={0.12}
          thickness={1.2}
          transmission={0.98}
        />
      </mesh>
      <mesh scale={1.18}>
        <sphereGeometry args={[radius, Math.max(22, Math.round(30 * quality.detail)), Math.max(22, Math.round(30 * quality.detail))]} />
        <meshBasicMaterial
          blending={THREE.AdditiveBlending}
          color={palette.secondary}
          depthWrite={false}
          opacity={0.08}
          side={THREE.BackSide}
          transparent
        />
      </mesh>
      <mesh ref={ringRef} rotation={[Math.PI / 2.6, 0, 0.35]}>
        <torusGeometry args={[radius + 0.76, 0.06, 24, 120]} />
        <meshBasicMaterial color={palette.accent} opacity={0.48} transparent />
      </mesh>
      <mesh rotation={[Math.PI / 2.6, 0, -0.22]}>
        <torusGeometry args={[radius + 1.08, 0.024, 20, 120]} />
        <meshBasicMaterial color={palette.halo} opacity={0.2} transparent />
      </mesh>
      <group ref={moonRef}>
        <mesh position={[radius + 0.82, 0.18, 0]}>
          <sphereGeometry args={[0.16, 18, 18]} />
          <meshStandardMaterial color={palette.halo} emissive={palette.accent} emissiveIntensity={0.26} metalness={0.35} roughness={0.24} />
        </mesh>
      </group>
    </group>
  )
}

const CommandCore = ({ position, palette, scrollRef, tuning }) => {
  const groupRef = useRef(null)
  const shellRef = useRef(null)
  const knotRef = useRef(null)
  const orbitRef = useRef(null)

  const orbitNodes = useMemo(
    () =>
      Array.from({ length: 5 }, (_, index) => {
        const angle = (index / 5) * TAU

        return {
          key: index,
          position: [Math.cos(angle) * 1.92, Math.sin(angle * 1.4) * 0.32, Math.sin(angle) * 1.46],
          scale: index === 0 ? 0.18 : 0.13 + (index % 3) * 0.03,
        }
      }),
    [],
  )

  useFrame((state, delta) => {
    const progress = scrollRef.current.progress
    const pointer = scrollRef.current.pointer
    const sectionProgress = scrollRef.current.section.progress

    if (!groupRef.current || !shellRef.current || !knotRef.current || !orbitRef.current) {
      return
    }

    groupRef.current.position.x = damp(groupRef.current.position.x, position[0] + pointer.x * 0.42, 2.2, delta)
    groupRef.current.position.y = damp(
      groupRef.current.position.y,
      position[1] + Math.sin(state.clock.elapsedTime * 0.45 + progress * 3.6) * 0.28 + pointer.y * 0.22,
      2.2,
      delta,
    )
    groupRef.current.rotation.y += delta * 0.11
    groupRef.current.rotation.x = damp(groupRef.current.rotation.x, Math.sin(progress * TAU * 0.6) * 0.08, 2, delta)
    shellRef.current.rotation.y -= delta * 0.06
    shellRef.current.rotation.z += delta * 0.04
    knotRef.current.rotation.x += delta * 0.18
    knotRef.current.rotation.y -= delta * 0.14
    orbitRef.current.rotation.z += delta * (0.1 + sectionProgress * 0.05)
    orbitRef.current.rotation.x = damp(orbitRef.current.rotation.x, sectionProgress * 0.35, 1.8, delta)
  })

  return (
    <group ref={groupRef} position={position}>
      <mesh ref={shellRef}>
        <icosahedronGeometry args={[1.42, tuning.commandDetail]} />
        <meshPhysicalMaterial
          attenuationColor={palette.secondary}
          attenuationDistance={1.4}
          clearcoat={1}
          clearcoatRoughness={0.02}
          color={palette.halo}
          emissive={palette.secondary}
          emissiveIntensity={0.1}
          iridescence={0.65}
          iridescenceIOR={1.24}
          metalness={0.04}
          roughness={0.05}
          thickness={1.4}
          transmission={0.98}
        />
      </mesh>
      <mesh scale={1.14}>
        <icosahedronGeometry args={[1.42, 0]} />
        <meshBasicMaterial
          blending={THREE.AdditiveBlending}
          color={palette.primary}
          depthWrite={false}
          opacity={0.1}
          side={THREE.BackSide}
          transparent
        />
      </mesh>
      <mesh ref={knotRef}>
        <torusKnotGeometry args={[0.68, 0.16, tuning.knotSegments, tuning.knotSides, 2, 3]} />
        <meshStandardMaterial color={palette.accent} emissive={palette.accent} emissiveIntensity={0.46} metalness={0.7} roughness={0.16} />
      </mesh>
      <group ref={orbitRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.9, 0.05, 18, 140]} />
          <meshBasicMaterial color={palette.secondary} opacity={0.34} transparent />
        </mesh>
        <mesh rotation={[0.42, 0.16, 0.48]}>
          <torusGeometry args={[2.18, 0.024, 18, 140]} />
          <meshBasicMaterial color={palette.halo} opacity={0.2} transparent />
        </mesh>
        {orbitNodes.map((node) => (
          <mesh key={node.key} position={node.position} scale={node.scale}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial color={palette.halo} emissive={palette.primary} emissiveIntensity={0.2} metalness={0.34} roughness={0.2} />
          </mesh>
        ))}
      </group>
      <pointLight color={palette.secondary} distance={10} intensity={14} />
      <pointLight color={palette.accent} distance={8} intensity={10} position={[0.6, -0.4, 1.8]} />
    </group>
  )
}

const PrismRelay = ({ position, palette, scrollRef, quality }) => {
  const groupRef = useRef(null)
  const relayGeometry = useMemo(() => {
    const points = [
      new THREE.Vector2(0.08, -1.45),
      new THREE.Vector2(0.24, -0.98),
      new THREE.Vector2(0.48, -0.22),
      new THREE.Vector2(0.28, 0.62),
      new THREE.Vector2(0.12, 1.22),
      new THREE.Vector2(0.04, 1.5),
    ]

    return new THREE.LatheGeometry(points, quality.tier === 'high' ? 36 : quality.tier === 'medium' ? 28 : 20)
  }, [quality.tier])

  useEffect(
    () => () => {
      relayGeometry.dispose()
    },
    [relayGeometry],
  )

  useFrame((state, delta) => {
    const progress = scrollRef.current.progress
    const sectionProgress = scrollRef.current.section.progress

    if (!groupRef.current) {
      return
    }

    groupRef.current.rotation.y += delta * 0.12
    groupRef.current.rotation.z = damp(groupRef.current.rotation.z, Math.sin(progress * TAU + position[2] * 0.06) * 0.18, 1.8, delta)
    groupRef.current.position.y = damp(
      groupRef.current.position.y,
      position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[2] * 0.08) * 0.2 + sectionProgress * 0.1,
      1.8,
      delta,
    )
  })

  return (
    <group ref={groupRef} position={position}>
      <mesh geometry={relayGeometry} rotation={[0, 0, 0.14]}>
        <meshPhysicalMaterial
          attenuationColor={palette.primary}
          attenuationDistance={1.2}
          clearcoat={1}
          clearcoatRoughness={0.04}
          color={palette.halo}
          emissive={palette.primary}
          emissiveIntensity={0.08}
          metalness={0.08}
          roughness={0.08}
          thickness={0.9}
          transmission={0.96}
        />
      </mesh>
      <mesh geometry={relayGeometry} position={[1.18, -0.18, -0.2]} rotation={[0.16, 0.34, -0.1]} scale={[0.52, 0.72, 0.52]}>
        <meshStandardMaterial color={palette.accent} emissive={palette.accent} emissiveIntensity={0.28} metalness={0.58} roughness={0.18} />
      </mesh>
      <mesh geometry={relayGeometry} position={[-1.08, 0.12, 0.32]} rotation={[-0.18, -0.42, 0.08]} scale={[0.42, 0.58, 0.42]}>
        <meshStandardMaterial color={palette.secondary} emissive={palette.secondary} emissiveIntensity={0.22} metalness={0.44} roughness={0.16} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0.12, 0.42]}>
        <torusGeometry args={[2.22, 0.03, 14, 120]} />
        <meshBasicMaterial color={palette.primary} opacity={0.22} transparent />
      </mesh>
    </group>
  )
}

const MonolithGate = ({ position, palette, scrollRef }) => {
  const groupRef = useRef(null)

  useFrame((state, delta) => {
    const progress = scrollRef.current.progress
    const sectionIndex = scrollRef.current.section.index

    if (!groupRef.current) {
      return
    }

    groupRef.current.rotation.y = damp(groupRef.current.rotation.y, -0.2 + progress * 0.5 + sectionIndex * 0.02, 2, delta)
    groupRef.current.position.y = damp(
      groupRef.current.position.y,
      position[1] + Math.sin(state.clock.elapsedTime * 0.38 + 1.4) * 0.2,
      1.8,
      delta,
    )
  })

  return (
    <group ref={groupRef} position={position}>
      {[-1.22, 0, 1.14].map((offset, index) => (
        <mesh key={offset} position={[offset, index === 1 ? 0.08 : -0.36, index === 1 ? 0.1 : -0.2]} rotation={[0, index * 0.18, index * 0.06]}>
          <boxGeometry args={[0.34, index === 1 ? 3.2 : 2.5, 0.32]} />
          <meshPhysicalMaterial
            clearcoat={1}
            clearcoatRoughness={0.08}
            color={palette.halo}
            emissive={palette.secondary}
            emissiveIntensity={0.08}
            metalness={0.84}
            roughness={0.18}
          />
        </mesh>
      ))}
      <mesh position={[0, 0.1, 0.28]}>
        <octahedronGeometry args={[0.42, 0]} />
        <meshStandardMaterial color={palette.accent} emissive={palette.accent} emissiveIntensity={0.64} metalness={0.4} roughness={0.14} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0.14, 0]} scale={[1.56, 1.56, 1]}>
        <ringGeometry args={[1.42, 1.5, 64]} />
        <meshBasicMaterial color={palette.secondary} opacity={0.18} side={THREE.DoubleSide} transparent />
      </mesh>
    </group>
  )
}

const InstancedShardField = ({ position, palette, scrollRef, count = 24 }) => {
  const groupRef = useRef(null)
  const meshRef = useRef(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const layout = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => {
        const angle = (index / count) * TAU
        const distance = 1 + (index % 4) * 0.46 + Math.floor(index / 9) * 0.18

        return {
          position: [
            Math.cos(angle) * distance,
            ((index % 6) - 2.5) * 0.22,
            Math.sin(angle) * (distance + (index % 3) * 0.26),
          ],
          rotation: [index * 0.24, index * 0.18, index * 0.14],
          scale: 0.14 + (index % 5) * 0.045,
          tone: index % 3 === 0 ? palette.accent : index % 2 === 0 ? palette.primary : palette.secondary,
        }
      }),
    [count, palette.accent, palette.primary, palette.secondary],
  )

  useLayoutEffect(() => {
    if (!meshRef.current) {
      return
    }

    layout.forEach((shard, index) => {
      dummy.position.set(...shard.position)
      dummy.rotation.set(...shard.rotation)
      dummy.scale.setScalar(shard.scale)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(index, dummy.matrix)
      meshRef.current.setColorAt(index, new THREE.Color(shard.tone))
    })

    meshRef.current.instanceMatrix.needsUpdate = true

    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true
    }
  }, [dummy, layout])

  useFrame((state, delta) => {
    const progress = scrollRef.current.progress
    const sectionProgress = scrollRef.current.section.progress

    if (!groupRef.current) {
      return
    }

    groupRef.current.rotation.y += delta * 0.16
    groupRef.current.rotation.x = damp(groupRef.current.rotation.x, progress * 0.32 + sectionProgress * 0.18, 1.4, delta)
    groupRef.current.position.y = damp(
      groupRef.current.position.y,
      position[1] + Math.sin(state.clock.elapsedTime * 0.55 + progress * 4) * 0.28,
      2.1,
      delta,
    )
  })

  return (
    <group ref={groupRef} position={position}>
      <instancedMesh ref={meshRef} args={[null, null, count]} frustumCulled={false}>
        <tetrahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial clearcoat={1} clearcoatRoughness={0.08} metalness={0.46} roughness={0.16} vertexColors />
      </instancedMesh>
    </group>
  )
}

const InterfaceFragments = ({ position, palette, scrollRef, count = 12 }) => {
  const groupRef = useRef(null)
  const meshRef = useRef(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const layout = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => ({
        drift: 0.08 + pseudoRandom(index * 2.8 + count) * 0.18,
        phase: index * 0.54,
        position: [
          (pseudoRandom(index * 3.2 + 14) - 0.5) * 6.2,
          (pseudoRandom(index * 4.6 + 22) - 0.5) * 3.2,
          -index * 0.72 + (pseudoRandom(index * 5.7 + 8) - 0.5) * 1.2,
        ],
        rotation: [
          (pseudoRandom(index * 2.2 + 5) - 0.5) * 0.5,
          (pseudoRandom(index * 2.9 + 9) - 0.5) * 0.7,
          (pseudoRandom(index * 3.7 + 11) - 0.5) * 0.35,
        ],
        scale: [
          0.7 + pseudoRandom(index * 6.2 + 17) * 1.1,
          0.28 + pseudoRandom(index * 5.1 + 2) * 0.34,
          0.025 + pseudoRandom(index * 4.4 + 6) * 0.03,
        ],
        tone: index % 3 === 0 ? palette.secondary : index % 2 === 0 ? palette.primary : palette.halo,
      })),
    [count, palette.halo, palette.primary, palette.secondary],
  )

  useLayoutEffect(() => {
    if (!meshRef.current) {
      return
    }

    layout.forEach((fragment, index) => {
      dummy.position.set(...fragment.position)
      dummy.rotation.set(...fragment.rotation)
      dummy.scale.set(...fragment.scale)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(index, dummy.matrix)
      meshRef.current.setColorAt(index, new THREE.Color(fragment.tone))
    })

    meshRef.current.instanceMatrix.needsUpdate = true

    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true
    }
  }, [dummy, layout])

  useFrame((state) => {
    if (!meshRef.current || !groupRef.current) {
      return
    }

    const progress = scrollRef.current.progress
    const pointer = scrollRef.current.pointer
    const sectionProgress = scrollRef.current.section.progress

    layout.forEach((fragment, index) => {
      const pulse = Math.sin(state.clock.elapsedTime * (0.28 + fragment.drift) + fragment.phase + progress * TAU)

      dummy.position.set(
        fragment.position[0] + Math.sin(state.clock.elapsedTime * fragment.drift + index) * 0.22 + pointer.x * 0.18,
        fragment.position[1] + pulse * 0.14 + pointer.y * 0.12,
        fragment.position[2] + Math.cos(state.clock.elapsedTime * fragment.drift + index * 0.7) * 0.3 + sectionProgress * 0.4,
      )
      dummy.rotation.set(
        fragment.rotation[0] + pulse * 0.08,
        fragment.rotation[1] + sectionProgress * 0.18,
        fragment.rotation[2] + Math.sin(state.clock.elapsedTime * 0.3 + index) * 0.05,
      )
      dummy.scale.set(fragment.scale[0], fragment.scale[1] * (1 + sectionProgress * 0.06), fragment.scale[2])
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(index, dummy.matrix)
    })

    meshRef.current.instanceMatrix.needsUpdate = true
    groupRef.current.rotation.z = pointer.x * 0.08
    groupRef.current.rotation.x = -pointer.y * 0.08
  })

  return (
    <group ref={groupRef} position={position}>
      <instancedMesh ref={meshRef} args={[null, null, count]} frustumCulled={false}>
        <boxGeometry args={[1, 0.56, 0.04]} />
        <meshPhysicalMaterial
          clearcoat={1}
          clearcoatRoughness={0.04}
          metalness={0.12}
          opacity={0.88}
          roughness={0.06}
          thickness={0.5}
          transmission={0.9}
          transparent
          vertexColors
        />
      </instancedMesh>
    </group>
  )
}

const SignalLines = ({ position, palette, scrollRef, count = 18 }) => {
  const groupRef = useRef(null)
  const geometry = useMemo(() => {
    const points = []

    for (let index = 0; index < count; index += 1) {
      const radius = 0.8 + pseudoRandom(index * 4.1 + count) * 3.2
      const angle = pseudoRandom(index * 5.3 + 11) * TAU
      const height = (pseudoRandom(index * 7.1 + 5) - 0.5) * 3.6
      const endRadius = radius + 0.6 + pseudoRandom(index * 2.7 + 19) * 1.2
      const endAngle = angle + (pseudoRandom(index * 3.9 + 7) - 0.5) * 0.9

      points.push(new THREE.Vector3(Math.cos(angle) * radius, height, Math.sin(angle) * radius))
      points.push(new THREE.Vector3(Math.cos(endAngle) * endRadius, height + (pseudoRandom(index * 8.4 + 13) - 0.5) * 0.8, Math.sin(endAngle) * endRadius))
    }

    return new THREE.BufferGeometry().setFromPoints(points)
  }, [count])

  useEffect(
    () => () => {
      geometry.dispose()
    },
    [geometry],
  )

  useFrame((state, delta) => {
    const progress = scrollRef.current.progress
    const sectionIndex = scrollRef.current.section.index

    if (!groupRef.current) {
      return
    }

    groupRef.current.rotation.y += delta * 0.05
    groupRef.current.rotation.x = damp(groupRef.current.rotation.x, Math.sin(progress * TAU * 0.6) * 0.14 + sectionIndex * 0.015, 1.6, delta)
  })

  return (
    <group ref={groupRef} position={position}>
      <lineSegments geometry={geometry}>
        <lineBasicMaterial color={palette.secondary} opacity={0.18} transparent />
      </lineSegments>
    </group>
  )
}

const OrbitRibbon = ({ position, color, accent, scrollRef, scale = 1, speed = 0.14, thickness = 0.04, tubularSegments = 140 }) => {
  const groupRef = useRef(null)
  const { tubeGeometry, lineGeometry } = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(
      Array.from({ length: 8 }, (_, index) => {
        const angle = (index / 8) * TAU
        const radius = 1.55 + (index % 2 === 0 ? 0.32 : -0.18)

        return new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(angle * 1.5) * 0.54 + ((index % 3) - 1) * 0.14,
          Math.sin(angle) * radius * 0.8,
        )
      }),
      true,
      'centripetal',
      0.55,
    )

    return {
      lineGeometry: new THREE.BufferGeometry().setFromPoints(curve.getPoints(tubularSegments + 40)),
      tubeGeometry: new THREE.TubeGeometry(curve, tubularSegments, thickness, 12, true),
    }
  }, [thickness, tubularSegments])

  useEffect(
    () => () => {
      tubeGeometry.dispose()
      lineGeometry.dispose()
    },
    [lineGeometry, tubeGeometry],
  )

  useFrame((state, delta) => {
    const progress = scrollRef.current.progress
    const pointer = scrollRef.current.pointer

    if (!groupRef.current) {
      return
    }

    groupRef.current.rotation.z += delta * speed
    groupRef.current.rotation.x = damp(groupRef.current.rotation.x, Math.sin(progress * Math.PI * 1.6) * 0.28 - pointer.y * 0.1, 1.8, delta)
    groupRef.current.rotation.y = damp(groupRef.current.rotation.y, pointer.x * 0.16, 1.8, delta)
    groupRef.current.position.y = damp(
      groupRef.current.position.y,
      position[1] + Math.sin(state.clock.elapsedTime * 0.45 + position[2] * 0.06) * 0.18,
      2,
      delta,
    )
  })

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh geometry={tubeGeometry}>
        <meshBasicMaterial
          blending={THREE.AdditiveBlending}
          color={color}
          depthWrite={false}
          opacity={0.18}
          transparent
        />
      </mesh>
      <line geometry={lineGeometry}>
        <lineBasicMaterial color={accent} opacity={0.34} transparent />
      </line>
    </group>
  )
}

const ParticleField = ({ position, palette, scrollRef, count = 900, spread = 18, depth = 32, size = 0.08, speed = 0.08 }) => {
  const groupRef = useRef(null)
  const geometry = useMemo(() => {
    const data = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const primary = new THREE.Color(palette.primary)
    const secondary = new THREE.Color(palette.secondary)
    const accent = new THREE.Color(palette.accent)

    for (let index = 0; index < count; index += 1) {
      const cursor = index * 3
      const angleNoise = pseudoRandom(index * 3.17 + count * 0.13)
      const radiusNoise = pseudoRandom(index * 6.11 + spread * 0.07)
      const yNoise = pseudoRandom(index * 9.23 + depth * 0.19)
      const zNoise = pseudoRandom(index * 11.41 + size * 10)
      const accentNoise = pseudoRandom(index * 5.71 + count * 0.03)
      const angle = angleNoise * TAU
      const radius = 3 + radiusNoise * spread
      const y = (yNoise - 0.5) * spread * 1.2
      const z = (zNoise - 0.5) * depth
      const tone = primary.clone().lerp(secondary, pseudoRandom(index * 2.83 + 14)).lerp(accent, accentNoise * 0.24)

      positions[cursor] = Math.cos(angle) * radius + (pseudoRandom(index * 4.37 + 33) - 0.5) * 1.6
      positions[cursor + 1] = y
      positions[cursor + 2] = z
      colors[cursor] = tone.r
      colors[cursor + 1] = tone.g
      colors[cursor + 2] = tone.b
    }

    data.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    data.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    data.computeBoundingSphere()

    return data
  }, [count, depth, palette.accent, palette.primary, palette.secondary, size, spread])

  useEffect(
    () => () => {
      geometry.dispose()
    },
    [geometry],
  )

  useFrame((state, delta) => {
    const progress = scrollRef.current.progress
    const velocity = scrollRef.current.velocity
    const pointer = scrollRef.current.pointer

    if (!groupRef.current) {
      return
    }

    groupRef.current.rotation.z += delta * speed
    groupRef.current.rotation.x = damp(groupRef.current.rotation.x, -0.12 + progress * 0.2 - pointer.y * 0.08, 1.6, delta)
    groupRef.current.position.x = damp(
      groupRef.current.position.x,
      position[0] + Math.sin(state.clock.elapsedTime * 0.18 + position[2] * 0.05) * 0.3 + velocity * 0.00004 + pointer.x * 0.24,
      1.6,
      delta,
    )
  })

  return (
    <group ref={groupRef} position={position}>
      <points frustumCulled={false} geometry={geometry}>
        <pointsMaterial
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          opacity={0.72}
          size={size}
          sizeAttenuation
          transparent
          vertexColors
        />
      </points>
    </group>
  )
}

const Satellite = ({ position, palette, scrollRef }) => {
  const groupRef = useRef(null)

  useFrame((state, delta) => {
    const progress = scrollRef.current.progress
    const velocity = scrollRef.current.velocity
    const pointer = scrollRef.current.pointer

    if (!groupRef.current) {
      return
    }

    groupRef.current.rotation.y += delta * 0.22
    groupRef.current.rotation.z = damp(groupRef.current.rotation.z, Math.sin(progress * TAU * 1.5) * 0.42 + pointer.x * 0.14, 2.5, delta)
    groupRef.current.position.x = damp(
      groupRef.current.position.x,
      position[0] + Math.sin(state.clock.elapsedTime * 0.42) * 0.24 + velocity * 0.00008,
      2,
      delta,
    )
  })

  return (
    <group ref={groupRef} position={position}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.08, 0.12, 18, 80]} />
        <meshStandardMaterial color={palette.halo} metalness={0.9} roughness={0.18} />
      </mesh>
      <mesh>
        <boxGeometry args={[1.9, 0.16, 0.16]} />
        <meshStandardMaterial color={palette.accent} emissive={palette.accent} emissiveIntensity={0.42} metalness={0.6} roughness={0.2} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[1.9, 0.16, 0.16]} />
        <meshStandardMaterial color={palette.primary} emissive={palette.secondary} emissiveIntensity={0.16} metalness={0.55} roughness={0.26} />
      </mesh>
      <mesh position={[0, 0, -0.42]}>
        <boxGeometry args={[0.36, 0.36, 0.8]} />
        <meshPhysicalMaterial clearcoat={1} clearcoatRoughness={0.06} color={palette.halo} metalness={0.24} roughness={0.1} transmission={0.68} transparent />
      </mesh>
    </group>
  )
}

const SceneAtmosphere = ({ palette, quality, scrollRef }) => {
  const { scene } = useThree()
  const fogColor = useMemo(() => blendColor(palette.void, palette.primary, 0.08), [palette.primary, palette.void])
  const sceneRef = useRef(scene)
  const fogRef = useRef(null)

  useEffect(() => {
    sceneRef.current = scene
  }, [scene])

  useEffect(() => {
    const fog = new THREE.FogExp2(fogColor, quality.tier === 'low' ? 0.028 : 0.032)
    sceneRef.current.fog = fog
    fogRef.current = fog

    return () => {
      sceneRef.current.fog = null
      fogRef.current = null
    }
  }, [fogColor, quality.tier])

  useFrame((_, delta) => {
    if (!fogRef.current) {
      return
    }

    fogRef.current.density = damp(
      fogRef.current.density,
      (quality.tier === 'low' ? 0.028 : 0.032) + scrollRef.current.progress * 0.014 + scrollRef.current.section.progress * 0.01,
      1.8,
      delta,
    )
  })

  return null
}

const PostProcessing = ({ quality, routeKey, scrollRef }) => {
  const { camera, gl, scene, size } = useThree()
  const composerRef = useRef(null)
  const bloomRef = useRef(null)
  const glRef = useRef(gl)

  useEffect(() => {
    glRef.current = gl
  }, [gl])

  useEffect(() => {
    if (!quality.enablePost) {
      return undefined
    }

    const renderer = glRef.current
    const composer = new EffectComposer(renderer)
    const renderPass = new RenderPass(scene, camera)
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.82, 0.76, 0.16)

    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.02

    composer.addPass(renderPass)
    composer.addPass(bloomPass)

    composerRef.current = composer
    bloomRef.current = bloomPass

    return () => {
      composer.dispose()
      bloomPass.dispose()
      composerRef.current = null
      bloomRef.current = null
    }
  }, [camera, gl, quality.enablePost, scene])

  useEffect(() => {
    if (!quality.enablePost) {
      return
    }

    const composer = composerRef.current
    const bloomPass = bloomRef.current

    if (!composer || !bloomPass) {
      return
    }

    composer.setPixelRatio(Math.min(window.devicePixelRatio || 1, quality.tier === 'high' ? 1.5 : 1.2))
    composer.setSize(size.width, size.height)
    bloomPass.setSize(size.width, size.height)
  }, [quality.enablePost, quality.tier, size.height, size.width])

  useFrame((state, delta) => {
    const renderer = glRef.current

    if (!renderer) {
      return
    }

    if (!quality.enablePost) {
      renderer.render(scene, camera)
      return
    }

    const composer = composerRef.current
    const bloomPass = bloomRef.current

    if (!composer || !bloomPass) {
      return
    }

    const progress = scrollRef.current.progress
    const sectionProgress = scrollRef.current.section.progress
    const routeBoost = routeKey.startsWith('/contact') ? 0.14 : routeKey.startsWith('/pricing') ? 0.08 : 0

    bloomPass.strength = damp(bloomPass.strength, 0.82 + progress * 0.3 + sectionProgress * 0.16 + routeBoost, 2.2, delta)
    bloomPass.radius = damp(bloomPass.radius, 0.72 + Math.sin(state.clock.elapsedTime * 0.16) * 0.06, 2, delta)
    bloomPass.threshold = damp(bloomPass.threshold, 0.16 + routeBoost * 0.1, 2.2, delta)
    renderer.toneMappingExposure = damp(renderer.toneMappingExposure, 1.02 + progress * 0.1 + routeBoost * 0.08, 2.2, delta)
    composer.render(delta)
  }, 1)

  return null
}

const SceneRig = ({ quality, routeKey, scrollRef }) => {
  const groupRef = useRef(null)
  const keyLightRef = useRef(null)
  const rimLightRef = useRef(null)
  const accentLightRef = useRef(null)
  const palette = getPalette(routeKey)
  const tuning = useMemo(() => getSceneTuning(quality), [quality])
  const lookTarget = useMemo(() => new THREE.Vector3(), [])

  useFrame((state, delta) => {
    const progress = scrollRef.current.progress
    const velocity = scrollRef.current.velocity
    const pointer = scrollRef.current.pointer
    const section = scrollRef.current.section
    const normalizedSection = section.count > 1 ? (section.index + section.progress) / section.count : progress
    const routeBias = routeKey.startsWith('/services') ? 0.45 : routeKey.startsWith('/pricing') ? -0.32 : routeKey.startsWith('/contact') ? 0.18 : 0

    state.camera.position.x = damp(
      state.camera.position.x,
      Math.sin(progress * TAU * 0.92) * 1.5 + routeBias + pointer.x * 0.52,
      2.2,
      delta,
    )
    state.camera.position.y = damp(
      state.camera.position.y,
      0.4 - progress * 1.55 + Math.cos(normalizedSection * TAU * 0.9) * 0.28 - pointer.y * 0.28,
      2.1,
      delta,
    )
    state.camera.position.z = damp(state.camera.position.z, 12.2 - progress * 49 - normalizedSection * 4.2, 2.6, delta)

    lookTarget.set(
      Math.sin(normalizedSection * TAU * 1.18) * 1 + routeBias * 0.5 + pointer.x * 0.92,
      -0.08 + Math.cos(normalizedSection * TAU * 1.04) * 0.32 + pointer.y * 0.45,
      -10 - progress * 34 - normalizedSection * 12,
    )
    state.camera.lookAt(lookTarget)
    state.camera.rotation.z = damp(state.camera.rotation.z, velocity * 0.000014 + pointer.x * 0.014, 3, delta)

    if (groupRef.current) {
      groupRef.current.rotation.z = damp(groupRef.current.rotation.z, Math.sin(normalizedSection * TAU) * 0.08 + pointer.x * 0.04, 2.1, delta)
      groupRef.current.position.x = damp(groupRef.current.position.x, velocity * 0.00008 + pointer.x * 0.18, 1.4, delta)
      groupRef.current.position.y = damp(groupRef.current.position.y, pointer.y * 0.12, 1.4, delta)
    }

    if (keyLightRef.current) {
      keyLightRef.current.position.x = damp(keyLightRef.current.position.x, 7.6 + Math.sin(normalizedSection * TAU) * 2.2 + pointer.x, 2.2, delta)
      keyLightRef.current.position.y = damp(keyLightRef.current.position.y, 5.8 + Math.cos(progress * TAU) * 1.2, 2.2, delta)
    }

    if (rimLightRef.current) {
      rimLightRef.current.position.x = damp(rimLightRef.current.position.x, -5.4 + Math.cos(normalizedSection * TAU) * 1.6 - pointer.x * 0.8, 2, delta)
      rimLightRef.current.position.z = damp(rimLightRef.current.position.z, 6 + Math.sin(progress * TAU * 1.1) * 2.6, 2, delta)
    }

    if (accentLightRef.current) {
      accentLightRef.current.position.y = damp(accentLightRef.current.position.y, -2.4 + Math.sin(normalizedSection * TAU * 1.2) * 1.4 + pointer.y * 0.7, 2, delta)
      accentLightRef.current.position.z = damp(accentLightRef.current.position.z, -5 + Math.cos(progress * TAU * 0.7) * 3.2, 2, delta)
    }
  })

  return (
    <>
      <SceneAtmosphere palette={palette} quality={quality} scrollRef={scrollRef} />
      <group ref={groupRef}>
        <ambientLight intensity={0.34} />
        <hemisphereLight color={palette.secondary} groundColor={palette.void} intensity={0.72} />
        <directionalLight ref={keyLightRef} color={palette.primary} intensity={3.1} position={[8, 6, 10]} />
        <pointLight ref={rimLightRef} color={palette.secondary} distance={28} intensity={12} position={[-6, 2, 4]} />
        <pointLight ref={accentLightRef} color={palette.accent} distance={24} intensity={11} position={[5, -3, -6]} />

        <mesh position={[0, 0, -20]}>
          <sphereGeometry args={[30, tuning.sphereSegments, tuning.sphereSegments]} />
          <meshBasicMaterial color={palette.void} side={THREE.BackSide} />
        </mesh>

        <ParticleField count={tuning.particleBack} depth={46} palette={palette} position={[0, 0.4, -8]} scrollRef={scrollRef} size={0.07} speed={0.05} spread={18} />
        <ParticleField count={tuning.particleMid} depth={30} palette={palette} position={[1.4, -0.8, -24]} scrollRef={scrollRef} size={0.09} speed={0.08} spread={12} />
        <ParticleField count={tuning.particleDeep} depth={26} palette={palette} position={[-1.6, 1.2, -44]} scrollRef={scrollRef} size={0.11} speed={0.11} spread={10} />

        <SignalLines count={tuning.signalCount} palette={palette} position={[0.2, 0.4, -2]} scrollRef={scrollRef} />
        <CommandCore palette={palette} position={[0.45, 0.54, 2.2]} scrollRef={scrollRef} tuning={tuning} />
        <OrbitRibbon accent={palette.secondary} color={palette.primary} position={[1.8, 1.25, -4.8]} scale={1.22} scrollRef={scrollRef} speed={0.09} thickness={0.045} tubularSegments={tuning.ribbonSegments} />
        <TransmissionPlanet palette={palette} position={[3.1, 1.56, -8.2]} quality={quality} radius={1.36} scrollRef={scrollRef} />

        <PrismRelay palette={palette} position={[-3.4, -0.2, -13]} quality={quality} scrollRef={scrollRef} />
        <OrbitRibbon accent={palette.accent} color={palette.secondary} position={[-2.5, -0.7, -16.5]} scale={1.04} scrollRef={scrollRef} speed={-0.12} thickness={0.036} tubularSegments={Math.max(100, tuning.ribbonSegments - 20)} />
        <MonolithGate palette={palette} position={[3.6, -1.45, -19]} scrollRef={scrollRef} />

        <InterfaceFragments count={tuning.fragmentCount} palette={palette} position={[0.2, 0.4, -25]} scrollRef={scrollRef} />
        <InstancedShardField count={tuning.shardCount} palette={palette} position={[-3.1, 1.1, -29]} scrollRef={scrollRef} />
        <SignalLines count={Math.max(12, tuning.signalCount - 4)} palette={palette} position={[0.2, -0.2, -32]} scrollRef={scrollRef} />

        <Satellite palette={palette} position={[2.4, 0.3, -36]} scrollRef={scrollRef} />
        <OrbitRibbon accent={palette.halo} color={palette.accent} position={[2.2, -1.18, -39]} scale={0.92} scrollRef={scrollRef} speed={0.14} thickness={0.03} tubularSegments={Math.max(100, tuning.ribbonSegments - 28)} />
        <TransmissionPlanet palette={palette} position={[-2.8, -1.24, -44]} quality={quality} radius={1.08} scrollRef={scrollRef} />
        <PrismRelay palette={palette} position={[3.6, 1.2, -51]} quality={quality} scrollRef={scrollRef} />
        <InterfaceFragments count={Math.max(8, tuning.fragmentCount - 4)} palette={palette} position={[-1.2, -0.2, -55]} scrollRef={scrollRef} />
      </group>
      <PostProcessing quality={quality} routeKey={routeKey} scrollRef={scrollRef} />
    </>
  )
}

export const UniverseScene = ({ quality = defaultQuality, routeKey, scrollRef }) => (
  <div className="pointer-events-none absolute inset-0">
    <Canvas
      camera={{ fov: 34, position: [0, 0.4, 12.2] }}
      dpr={quality.dpr}
      frameloop="always"
      gl={{ alpha: true, antialias: quality.antialias, powerPreference: 'high-performance' }}
      performance={{ min: quality.tier === 'low' ? 0.55 : 0.72 }}
    >
      <SceneRig quality={quality} routeKey={routeKey} scrollRef={scrollRef} />
    </Canvas>
  </div>
)
