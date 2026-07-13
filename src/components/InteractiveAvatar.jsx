import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const InteractiveAvatar = () => {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    // ── SCENE SETUP ──
    const width = container.clientWidth || 200
    const height = container.clientHeight || 200

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    const scene = new THREE.Scene()

    // 45 degrees field of view, matching the viewport scale
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.set(0, 0, 4.6)
    scene.add(camera)

    // ── LIGHTING ──
    // Ambient fill
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    // Key Light - warm sunlight from top-left front
    const keyLight = new THREE.DirectionalLight(0xfffaed, 1.6)
    keyLight.position.set(3, 4, 4)
    keyLight.castShadow = true
    keyLight.shadow.mapSize.width = 1024
    keyLight.shadow.mapSize.height = 1024
    keyLight.shadow.bias = -0.001
    scene.add(keyLight)

    // Fill Light - cool ambient blue bounce from bottom-right
    const fillLight = new THREE.DirectionalLight(0xd9e8ff, 0.8)
    fillLight.position.set(-3, -2, 2)
    scene.add(fillLight)

    // Rim Light - bright white highlight from behind head
    const rimLight = new THREE.DirectionalLight(0xffffff, 1.5)
    rimLight.position.set(-2, 3, -4)
    scene.add(rimLight)

    // ── MODEL LOADING ──
    let loadedModel = null
    const loader = new GLTFLoader()

    loader.load(
      '/Model/male head 3d model.glb',
      (gltf) => {
        const model = gltf.scene

        // ── Auto-center and Scale the Model ──
        const box = new THREE.Box3().setFromObject(model)
        const size = box.getSize(new THREE.Vector3())
        const center = box.getCenter(new THREE.Vector3())

        // Offset the model's children to center them relative to the model group pivot
        model.position.x += (model.position.x - center.x)
        model.position.y += (model.position.y - center.y)
        model.position.z += (model.position.z - center.z)

        // Scale the model so its height is 2.1 units in our scene
        const maxDim = Math.max(size.x, size.y, size.z)
        const scale = 2.1 / maxDim
        model.scale.set(scale, scale, scale)

        // ── Configure Materials & Shadows ──
        model.traverse((node) => {
          if (node.isMesh) {
            node.castShadow = true
            node.receiveShadow = true
            
            if (node.material) {
              node.material.roughness = 0.58
              node.material.metalness = 0.1
              node.material.side = THREE.DoubleSide
              // If texture is present, ensure it loads correctly
              if (node.material.map) {
                node.material.map.anisotropy = 16
              }
            }
          }
        })

        scene.add(model)
        loadedModel = model
        setIsLoading(false)
      },
      (xhr) => {
        if (xhr.total > 0) {
          const percent = (xhr.loaded / xhr.total) * 100
          setLoadingProgress(Math.round(percent))
        }
      },
      (error) => {
        console.error('Error loading GLB model:', error)
        setIsLoading(false)
      }
    )

    // ── MOUSE INTERACTION STATE ──
    const targetMouse = { x: 0, y: 0 }
    const currentMouse = { x: 0, y: 0 }
    const targetHeadRot = { x: 0, y: 0 }
    const currentHeadRot = { x: 0, y: 0 }

    const handleMouseMove = (e) => {
      // Find relative position of mouse inside window compared to avatar canvas
      const rect = canvas.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const dx = e.clientX - centerX
      const dy = e.clientY - centerY
      
      // Cap normalizations to screen size to prevent excessive rotations
      targetMouse.x = THREE.MathUtils.clamp(dx / (window.innerWidth * 0.4), -1, 1)
      targetMouse.y = THREE.MathUtils.clamp(dy / (window.innerHeight * 0.4), -1, 1)
    }

    window.addEventListener('mousemove', handleMouseMove)

    // ── ANIMATION LOOP ──
    let animationFrameId
    const clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      // Idle breathing offset
      const elapsedTime = clock.getElapsedTime()
      const idleY = Math.sin(elapsedTime * 1.5) * 0.02
      const idleRotX = Math.sin(elapsedTime * 0.8) * 0.015

      // Smooth mouse tracking interpolation (increased tracking speed)
      currentMouse.x += (targetMouse.x - currentMouse.x) * 0.18
      currentMouse.y += (targetMouse.y - currentMouse.y) * 0.18

      // Map mouse tracking to head rotation (clamped angles)
      // Max head turning: ~20 degrees left/right, ~12 degrees up/down
      targetHeadRot.y = currentMouse.x * 0.38
      targetHeadRot.x = currentMouse.y * 0.22 + idleRotX

      currentHeadRot.x += (targetHeadRot.x - currentHeadRot.x) * 0.22
      currentHeadRot.y += (targetHeadRot.y - currentHeadRot.y) * 0.22

      if (loadedModel) {
        // Rotate the entire head model group to face forward (270 degrees offset on Y)
        // and track the cursor position smoothly
        loadedModel.rotation.y = Math.PI * 1.5 + currentHeadRot.y
        loadedModel.rotation.x = currentHeadRot.x
        
        // Apply breathing motion
        loadedModel.position.y = idleY
      }

      renderer.render(scene, camera)
    }

    // Initialize animation loop
    animate()

    // ── RESIZE HANDLER ──
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return
      const entry = entries[0]
      const w = entry.contentRect.width || width
      const h = entry.contentRect.height || height
      
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    })
    resizeObserver.observe(container)

    // ── CLEANUP (CRITICAL FOR PERFORMANCE AND PREVENTING LEAKS) ──
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
      resizeObserver.disconnect()

      // Dispose loaded model geometries & materials
      if (loadedModel) {
        scene.remove(loadedModel)
        loadedModel.traverse((node) => {
          if (node.isMesh) {
            node.geometry.dispose()
            if (node.material) {
              if (Array.isArray(node.material)) {
                node.material.forEach((m) => m.dispose())
              } else {
                node.material.dispose()
              }
            }
          }
        })
      }

      // Dispose renderer
      renderer.dispose()
    }
  }, [])

  return (
    <div ref={containerRef} className="toolkit-hub-avatar-container">
      {isLoading && (
        <div className="toolkit-avatar-loader">
          <div className="toolkit-avatar-spinner" />
          <div className="toolkit-avatar-progress">{loadingProgress}%</div>
        </div>
      )}
      <canvas ref={canvasRef} className="toolkit-hub-avatar-canvas" />
    </div>
  )
}

export default InteractiveAvatar
