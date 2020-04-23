import {include} from 'named-urls'

export const ROUTE_OPTIONS = 'options';
export const ROUTE_COLORS = 'colors';
export const ROUTE_SHAPES = 'shapes';
export const ROUTE_TEXTURES = 'textures';

export default {
    home: include('/', {
        all: '',
        options: include(ROUTE_OPTIONS, {
            all: '',
            colors: include(ROUTE_COLORS, {
                all: ''
            }),
            shapes: include(ROUTE_SHAPES, {
                all: ''
            }),
            textures: include(ROUTE_TEXTURES, {
                all: ''
            })
        })
    })
}
