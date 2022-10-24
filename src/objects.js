import * as THREE from "three";

export function createObjects() {

    const textureLoader = new THREE.TextureLoader()


    const loadingManager = new THREE.LoadingManager()
    loadingManager.onStart = () => {
        console.log('loading started')
    }
    loadingManager.onLoad = () => {
        console.log('loading finished')
    }
    loadingManager.onProgress = () => {
        console.log('loading progressing')
    }
    loadingManager.onError = () => {
        console.log('loading error')
    }

    const colorTexture = textureLoader.load('/door/color.jpg')
    const alphaTexture = textureLoader.load('/door/alpha.jpg')
    // const heightTexture = textureLoader.load('/door/height.jpg')
    // const normalTexture = textureLoader.load('/door/normal.jpg')
    // const ambientOcclusionTexture = textureLoader.load('/door/ambientOcclusion.jpg')
    // const metallicTexture = textureLoader.load('/door/metallic.jpg')
    // const roughnessTexture = textureLoader.load('/door/roughness.jpg')

    const material = new THREE.MeshBasicMaterial({map: colorTexture})


    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material2 = new THREE.MeshBasicMaterial({color: 0xff00ff, wireframe: true})
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(0, 0.4, 0)

//mesh.rotation.reorder('YXZ') //reorder first
//     mesh.rotation.x = Math.PI * 0.25 // pi is half rotation, mult to get fractions
//     mesh.rotation.y = Math.PI * 0.25

    const mesh2 = new THREE.Mesh(geometry, material2)
    mesh2.position.set(0, 2, 0)
    return {
        geometry: geometry,
        material1: material,
        material2: material2,
        mesh: mesh,
        mesh2: mesh2
    }
}
