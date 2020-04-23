import React from 'react';
import {useEffect, useRef, useContext} from "react";
import {
    BoxGeometry,
    Camera, Color, HemisphereLight,
    Mesh,
    MeshBasicMaterial,
    MeshLambertMaterial,
    PerspectiveCamera,
    Scene,
    WebGLRenderer
} from "three";
import {Store} from "../store";

const Renderer = props => {

    const {dispatch, state} = useContext(Store);

    const renderer = useRef(null);
    const scene = useRef(null);
    const camera = useRef(null);
    const cube = useRef(null);

    const container = useRef(null);

    useEffect(() => {
        if(state.color) {
            cube.current.material.color = new Color().setRGB(
                state.color.r/255,
                state.color.g/255,
                state.color.b/255
            );
        }
    }, [state.color]);

    useEffect(() => {
        console.log('renderer', renderer);

        const update = () => {
            requestAnimationFrame( update );

            cube.current.rotation.x += 0.01;
            cube.current.rotation.z += 0.01;

            renderer.current.render(scene.current, camera.current);
        };

        if (!renderer.current) {

            renderer.current = new WebGLRenderer();
            renderer.current.setPixelRatio(window.devicePixelRatio);
            scene.current = new Scene();
            camera.current = new PerspectiveCamera(
                75,
                window.innerWidth / window.innerHeight,
                0.1,
                100
            );


            renderer.current.setSize(500, 500);
            camera.current.position.z = 3;
            container.current.appendChild(renderer.current.domElement);

            scene.current.background = new Color().setHSL(
                0.6,
                0,
                1
            );

            const hemilight = new HemisphereLight(
                0xffffff,
                0xffffff,
                1.2
            );

            hemilight.color.setHSL(0.6, 1, 0.6);
            hemilight.groundColor.setHSL(0.095, 1, 0.75);
            hemilight.position.set(0, 50, 0);
            scene.current.add( hemilight );

            const geometry = new BoxGeometry();
            const material = new MeshLambertMaterial( {color: 0x00ff00} );
            cube.current = new Mesh(geometry, material);
            scene.current.add(cube.current);

            update();
        }

    }, [renderer]);

    return (
        <div className="Renderer" ref={container}>
            Renderer
        </div>
    );
}

export default Renderer;
