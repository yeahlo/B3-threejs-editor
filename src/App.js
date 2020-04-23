import React, {useRef} from 'react';
import './App.scss';
import {Switch, Route, Link} from "react-router-dom";
import routes from "./constants/routes";
import {reverse} from 'named-urls';
import Colors from "./options/colors";
import Textures from "./options/textures";
import Shapes from "./options/shapes";
import Renderer from "./renderer";
import Gadget from "./options/gadgets";

const App = props => {
    return (
        <div className="App">

            <Switch>
                <Route exact path={routes.home.options.colors.all} component={Colors}/>
                <Route exact path={routes.home.options.shapes.all} component={Shapes}/>
                <Route exact path={routes.home.options.textures.all} component={Textures}/>
                <Route exact path={routes.home.options.gadgets.all} component={Gadget}/>
            </Switch>

            <nav>
                <Link to={reverse(routes.home.options.colors.all)}>Colors</Link>
                <Link to={reverse(routes.home.options.shapes.all)}>Shapes</Link>
                <Link to={reverse(routes.home.options.textures.all)}>Textures</Link>
                <Link to={reverse(routes.home.options.gadgets.all)}>Gadgets</Link>
            </nav>
            <Renderer/>
        </div>
    );
}

export default App;
