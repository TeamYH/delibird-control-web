import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import {Home, Robot} from '../routes';

class App extends Component {
    render(){ 
        return( 
            <div>
                <Route exact path="/" component={Home}/>
                <Route exact path="/robot" compoent={Robot}/> 
            </div>
        );
    }
}
export default App;