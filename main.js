import * as THREE from './node_modules/three'
import { gsap } from "gsap";
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader'


//Loader
const preloader = document.querySelector(".preloader")
      window.addEventListener("load", ()=>{
        setTimeout(()=>{
          preloader.classList.add("load")
        },1000)

    })
   
 
const canvas = document.querySelector('canvas')
const scene = new THREE.Scene()
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('./node_modules/three/examples/js/libs/draco/')
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)



//Model
let model
gltfLoader.load(
  './scenes/scene-nogr-full.glb',
  (gltf) =>{
    console.log(gltf)
        model = gltf.scene.children[0]
        model.position.set(1.3, 0, 0)
        model.rotation.y = Math.PI * 1.65
        model = gltf.scene.children[0]
        model.getObjectByName('Cube009').material.color.set(0x020202)
        scene.add(gltf.scene)

        window.addEventListener("load", ()=>{
          preloader.style.display = "none"
        })

        chancePosition()
        chanceColor()
  }
)


//Luzes
const directionalLight = new THREE.DirectionalLight('ffffff', 3)
directionalLight.position.set(0.25, 3, 2.25)
scene.add(directionalLight)

//Tamanho da Tela
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () =>
{
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})



//Camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
scene.add(camera)


//Render
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha:true,
  shadowMap: true,
  antialias:true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputEncoding = THREE.LinearEncoding
const environment = new RoomEnvironment();
const pmremGenerator = new THREE.PMREMGenerator(renderer);
scene.environment = pmremGenerator.fromScene(environment).texture;
environment.dispose();


//Funções
const animate = () =>{
  renderer.render(scene, camera)
  window.requestAnimationFrame(animate)
}

animate()

function chanceColor(){
  const btnRed = document.querySelector(".js-red")
  const btnBlue = document.querySelector(".js-blue")
  const btnBlack = document.querySelector(".js-black")
  const btnGreen = document.querySelector(".js-green")
  const btnPink = document.querySelector(".js-pink")
  const btnYellow= document.querySelector(".js-yellow")
  

  btnRed.addEventListener('click', () =>{
    model.getObjectByName('Cube009').material.color.set(0x250000)
  })

  btnBlue.addEventListener('click', () =>{
    model.getObjectByName('Cube009').material.color.set(0x2532AA)
  })

  btnBlack.addEventListener('click', () =>{
    model.getObjectByName('Cube009').material.color.set(0x020202)
  }) 

  btnGreen.addEventListener('click', () =>{
    model.getObjectByName('Cube009').material.color.set(0x0f5803)
  }) 

  btnPink.addEventListener('click', () =>{
    model.getObjectByName('Cube009').material.color.set(0x6a0670)
  }) 

  btnYellow.addEventListener('click', () =>{
    model.getObjectByName('Cube009').material.color.set(0x756808)
  }) 
}

function chancePosition(){
  const btn1 = document.querySelector(".btn-info1")
  const btn2 = document.querySelector(".btn-info2")
  const btn3 = document.querySelector(".btn-info3")

  btn1.addEventListener('click', ()=>{

    btn1.parentElement.classList.add("active")
    btn2.parentElement.classList.remove("active")
    btn3.parentElement.classList.remove("active")
    
    gsap.to(model.rotation,{
      duration:1,
      ease: 'power2.inOut',
      y:Math.PI * 1.65,
      x:0,
      z:0
    })

    gsap.to(model.position,{
      duration:1,
      ease: 'power2.inOut',
      x:1.3,
      y:0,
      z:0
    })
  })

  btn2.addEventListener("click", ()=>{

    btn2.parentElement.classList.add("active")
    btn1.parentElement.classList.remove("active")
    btn3.parentElement.classList.remove("active")

    gsap.to(model.rotation,{
      duration:1,
      ease: 'power2.inOut',
      y:Math.PI * 0.74,
      x:-0.4,
      z: 0.11
    })

    gsap.to(model.position,{
      duration:1,
      ease: 'power2.inOut',
      x:-0.001,
      y:-1,
      z:2.5
    })

  })

  btn3.addEventListener("click", ()=>{

    btn3.parentElement.classList.add("active")
    btn1.parentElement.classList.remove("active")
    btn2.parentElement.classList.remove("active")

    gsap.to(model.rotation,{
      duration:1,
      ease: 'power2.inOut',
      y:-0.7,
      x:0.4,
      z: 0.05
    })

    gsap.to(model.position,{
      duration:1,
      ease: 'power2.inOut',
      x:1,
      y:-1,
      z:2.5
    })

  })
}


//Responsivo do Canvas. Ele se adapta pro tamanho original do aparelho
function screenSize(){
  
  if(window.innerWidth< 800){
    camera.position.x = 0.8
  }

}

screenSize()