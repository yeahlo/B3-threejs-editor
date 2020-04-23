import React, {useContext, useRef, useState} from 'react';
import {Store, updateColor, updateGadget} from "../../store";

const Gadget = props => {

    const {dispatch, state} = useContext(Store)
    const [gadget, setGadget] = useState(null)
    const sphere = useRef(null)

    return (
        <div className="Gadget">
            {/*<button onClick={() => dispatch(updateColor(Math.random() * 0XFFFFFF ))}>Color</button>*/}

            <form>
                <div className="radio">
                    <label>
                        <input type="radio" value="sphere" onClick={() => { dispatch(updateGadget(setGadget === this.value))}}/>
                        1 sphere
                    </label>
                </div>
                <div className="radio">
                    <label>
                        <input type="radio" value="cube" onClick={() => { dispatch(updateGadget(setGadget === this.value))}}/>
                        1 cube
                    </label>
                </div>
                <div className="radio">
                    <label>
                        <input type="radio" value="spheres" onClick={() => { dispatch(updateGadget(setGadget === this.value ))}} />
                        2 spheres
                    </label>
                </div>
            </form>
        </div>
    );
}

export default Gadget;
/*3 boutons : 1 sphere , 1 cube , 2 sphere
* save chaine de caractere pour chaque
* radio box
 */
