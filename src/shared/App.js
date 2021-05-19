import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import {Home, Robot, LoginPage, PageNotFound, MakeMapPage, RobotSet, Setting, Clean, Member, Support, AdminRobot, TableSetting} from '../routes';

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
                    <Route exact path="/robot/settings/makemap" component={MakeMapPage}/>
                    <Route exact path="/setting" component={Setting}/>
                    <Route exact path="/robot/tables" component={TableSetting} />
                    <Route exact path="/clean" component={Clean}/>
                    <Route exact path="/admin/support" component={Support}/>
                    <Route exact path="/admin/members" component={Member}/>
                    <Route exact path="/admin/robot/setting" component={AdminRobot}/>
                    <Route component={PageNotFound} />
                  </Switch>
                </div>
              </BrowserRouter> 
        );
    }
}
export default App;