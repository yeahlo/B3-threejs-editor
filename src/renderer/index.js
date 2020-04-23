import React, { useRef, useEffect, useContext } from 'react';
import { Store } from '../store';
import {WebGLRenderer, Scene, PerspectiveCamera, BoxGeometry, Mesh, MeshLambertMaterial, HemisphereLight, StaticReadUsage, Color, TextureLoader} from 'three';

const Renderer = props => {
    const {dispatch, state} = useContext(Store)

    const renderer = useRef(new WebGLRenderer());
    const scene = useRef(new Scene());
    const camera = useRef(new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000))
    const cube = useRef(null);


    const container = useRef(null);

    useEffect(() => {
        if(state.color){
            cube.current.material.color = new Color().setHex(state.color)
        }
    })

    useEffect(() => {
        console.log('renderer', renderer)

        const update = () => {
            requestAnimationFrame(update)

            cube.current.rotation.x += 0.01;
            cube.current.rotation.y += 0.01;

            const txture = loader.load('/img/' + state.texture + '.jpg')
            cube.current.map = txture

            renderer.current.render(scene.current, camera.current)
        }

        renderer.current.setSize(500, 500);
        camera.current.position.z = 3
        container.current.appendChild(renderer.current.domElement)

        const hemiLight = new HemisphereLight(0xfffffff, 0xffffff, 0.8)
        hemiLight.color.setHSL(0.6, 1, 0.6)
        hemiLight.groundColor.setHSL(0.095, 1, 0.75);
        hemiLight.position.set(0, 50, 0)
        scene.current.add(hemiLight);

        const geometry = new BoxGeometry();

        const loader = new TextureLoader()
        const txture = loader.load('/img/' + state.texture + '.jpg')

        const material = new MeshLambertMaterial({color: 0x00FF00, map: txture});
        cube.current = new Mesh(geometry, material);
        scene.current.add(cube.current)

        update()
    }, [renderer])

    return (
        <div className="Renderer" ref={container}>
            Renderer
        </div>
    );
}

export default Renderer;
