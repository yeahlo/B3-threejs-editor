import React, { useRef, useEffect, useContext } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Store, updateTexture } from '../../store';

const Textures = props => {
    const {dispatch, state} = useContext(Store)

    return (
        <div className="Textures">
            <OwlCarousel
                className="owl-theme"
                loop
                margin={10}
                nav
            >
                <div class="item"><img height='200px' onClick={() => {dispatch(updateTexture('01'))}} src="/img/01.jpg"></img></div>
                <div class="item"><img height='200px' onClick={() => {dispatch(updateTexture('02'))}} src="/img/02.jpg"></img></div>
                <div class="item"><img height='200px' onClick={() => {dispatch(updateTexture('03'))}} src="/img/03.jpg"></img></div>
            </OwlCarousel>
        </div>
    );
}

export default Textures;
