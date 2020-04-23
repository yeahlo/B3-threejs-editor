import React, {useContext, useEffect, useRef} from 'react';
import {
    BoxGeometry,
    Color,
    HemisphereLight,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    Scene,
    WebGLRenderer
} from "three";
import {Store} from "../store";

const Renderer = props => {

    const {dispatch, state} = useContext(Store)

    const renderer = useRef(null)
    const scene = useRef(null)
    const camera = useRef(null)
    const cube = useRef(null)
    const container = useRef(null)

    useEffect(() => {
        if(cube.current) {
            cube.current.material.color = new Color().setHex(state.color)
        }

    }, [state.color])

    useEffect(() => {
        if (state.gadget && cube.current) {

        }
    }, [state.gadget])

    useEffect(() => {
        console.log('renderer', renderer)

        const update = () => {
            requestAnimationFrame(update)
            cube.current.rotation.x += 0.01
            cube.current.rotation.z += 0.01
            renderer.current.render(scene.current, camera.current)
        }

        if (!renderer.current) {
            renderer.current = new WebGLRenderer()
            scene.current = new Scene()
            camera.current = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
            renderer.current.setSize(500, 500)
            camera.current.position.z = 3
            container.current.appendChild(renderer.current.domElement)
            scene.current.background = new Color().setHSL(0.6, 0,1)

            const hemiLight = new HemisphereLight(0xffffff, 0xffffff, 0.8)
            hemiLight.color.setHSL(0.6, 1, 0.6)
            hemiLight.groundColor.setHSL(0.095, 1, 0.75)
            hemiLight.position.set(0, 50, 0)
            scene.current.add(hemiLight)

            const geometries = new BoxGeometry()
            const material = new MeshBasicMaterial({color: 0x00ff00})
            cube.current = new Mesh(geometries, material)
            scene.current.add(cube.current)
            update()
        }

    }, [renderer])

    return (
        <div className="Renderer" ref={container}>

        </div>
    );
}

export default Renderer;
