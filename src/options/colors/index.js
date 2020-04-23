import React, {useContext} from 'react';
import {Store, updateColor} from "../../store";
import { CirclePicker } from 'react-color';

const Colors = props => {
    const {dispatch, state} = useContext(Store);

    const handleChange = (color) => {
        console.log(color.rgb)
        dispatch(updateColor(color.rgb));
    };
    return (
        <div className="Color">
            <CirclePicker onChange={ handleChange }/>
        </div>
    );
}

export default Colors;
