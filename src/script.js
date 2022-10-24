import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {func} from "three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements";
import * as lil from 'lil-gui' ;
import {createObjects} from './objects.js'
import {resizeWindow} from './utils.js'

const imageSource = '/door.jpg'
console.log(imageSource)

const gui = new lil.GUI()
console.log(gui)
const canvas = document.querySelector('canvas.webgl')
main()


function main() {
    let objects = createObjects()
    let mesh = objects.mesh
    let mesh2 = objects.mesh2

    const scene = new THREE.Scene()

    // group
    const group = new THREE.Group()
    group.add(mesh, mesh2)

    // gui controls
    gui.add(group.position, 'x', -3, 3, 0.01).name('group x')
    gui.add(group.position, 'y', -3, 3, 0.01).name('group y')
    gui.add(group.position, 'z', -3, 3, 0.01).name('group z')
    gui.add(objects.material2, 'wireframe')


    scene.add(group)

    // Axis
    const axesHelper = new THREE.AxesHelper(2)
    scene.add(axesHelper)

    // Sizes
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    // Camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 100)
    camera.position.set(3, 1, 6)
    camera.lookAt(0, 0.5, 0)


    // Controls
    const controls = new OrbitControls(camera, canvas)
    controls.enableDamping = true


    scene.add(camera)

    const speedParams = {
        speed: 1,
        speedInc: 0.001
    }
    const params = {
        color: 0xff0000

    }

    gui.add(speedParams, 'speed', 0, 20, 0.1)

    gui
        .addColor(params, 'color')
        .onChange(() => {
            objects.material1.color.set(params.color)
        })


    // animation
    const clock = new THREE.Clock()
    const animation = () => {
        const deltaTime = clock.getDelta()


        // speedParams.speed += speedParams.speedInc
        group.rotation.y += speedParams.speed * 2 * Math.PI * deltaTime
        group.rotation.z += speedParams.speed / 2 * Math.PI * deltaTime
        group.rotation.x += speedParams.speed * deltaTime

        controls.update()

        renderer.render(scene, camera)
        window.requestAnimationFrame(animation) // makes the animation fire indefinitely
    }


// Renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('canvas.webgl')
    })
    resizeWindow(camera, sizes, renderer)
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // catering to higher pixel screens. capped at 2.
    animation()

}