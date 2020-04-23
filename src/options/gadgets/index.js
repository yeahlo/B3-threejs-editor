import React, {useContext, useRef, useState, useEffect} from 'react';
import {Store, updateColor, updateGadget} from "../../store";

const Gadget = props => {

    const {dispatch, state} = useContext(Store)

    return (
        <div className="Gadget">
            <form>
                <div className="radio">
                    <label>
                        <input type="radio" checked={state.gadget === 'sphere'} value="sphere" name={"gadget"}
                               onChange={e => dispatch(updateGadget(e.currentTarget.value))}/>
                        1 sphere
                    </label>
                </div>
                <div className="radio">
                    <label>
                        <input type="radio" checked={state.gadget === 'cube'}  value="cube" name={"gadget"}
                               onChange={e => dispatch(updateGadget(e.currentTarget.value))}/>
                        1 cube
                    </label>
                </div>
                <div className="radio">
                    <label>
                        <input type="radio" checked={state.gadget === 'spheres'} value="spheres" name={"gadget"}
                               onChange={e => dispatch(updateGadget(e.currentTarget.value))}/>
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
