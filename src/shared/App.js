import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import {Home, Robot, LoginPage, PageNotFound, Key, RobotSet} from '../routes';

class App extends Component {
    render(){ 
        return( 
              <BrowserRouter>
                <div>
                  <Switch>
                    <Route exact path="/" component={LoginPage}/>
                    <Route exact path="/robot"  component={Robot}/>
                    <Route exact path="/home"  component={Home}/>
                    <Route exact path="/robot/settings" component={RobotSet}/>
                    <Route exact path="/robot/settings/makemap" component={Key}/>
                    <Route component={PageNotFound} />
                  </Switch>
                </div>
              </BrowserRouter> 
        );
    }
}
export default App;