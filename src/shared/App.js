import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import {Home, Robot, LoginPage} from '../routes';

class App extends Component {
    render(){ 
        return( 
              <BrowserRouter>
                <Route  path="/" exact={true} component={LoginPage}/>
                <Route  path="/home" component={Home}/>
                <Route  path="/robot" compoent={Robot}/>
              </BrowserRouter> 
        );
    }
}
export default App;