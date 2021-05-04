import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import {Home, Robot, LoginPage, PageNotFound} from '../routes';

class App extends Component {
    render(){ 
        return( 
              <BrowserRouter>
                <div>
                  <Switch>
                    <Route exact path="/" component={LoginPage}/>
                    <Route exact path="/robot"  component={Robot}/>
                    <Route exact path="/home"  component={Home}/>
                    <Route component={PageNotFound} />
                  </Switch>
                </div>
              </BrowserRouter> 
        );
    }
}
export default App;