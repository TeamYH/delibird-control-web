import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import {Home, Robot, LoginPage} from '../routes';

class App extends Component {
    render(){ 
        return( 
            <div>
                <Route exact path="/" component={LoginPage}/>
                <Route exact path="/home" component={Home}/>
                <Route exact path="/robot" compoent={Robot}/> 
            </div>
        );
    }
}
export default App;