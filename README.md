# Delibird Control Web Site

## Members :blush:

| [asdeszqsc](https://github.com/asdeszqsc) | [baehaejin](https://github.com/baehaejin) | [hhhhjjjj96](https://github.com/hhhhjjjj96) | [hyunjun-cho](https://github.com/hyunjun-cho) | [SexyJiny](https://github.com/SexyJiny) |
| :---------------------------------------: | :---------------------------------------: | :-----------------------------------------: | :-------------------------------------------: | :-------------------------------------: |
|                  안윤회                   |                  배해진                   |                   박현진                    |                    조현준                     |                 정진희                  |
|                                           |                                           |                                             |                                               |
|              Frontend design              |              backend server               |           robot node programming            |          robot simulator programming          |             hardware Design             |

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn`

Add package Dependencies.
In this project, use Roslib, react packages, Material-ui, etc...
you can check the dependancies in `package.json`!

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

-----

## `About this Project`

Delibird is Autonomous driving serve robot controled by Web applications.

This web application allows users to control delibird and proceed with the setup. 
And this App is associated with a delibird server to retrieve the robot's data through ROS-bridge.
So you can use robot server by delibird_ros and delibird_control. 

See this.
### [delibird_ros](https://github.com/TeamYH/delibird_ros) 
### [delibird_control](https://github.com/TeamYH/delibird-control)

## `References`

ROS provided roslibjs, ros2djs, and nav2djs were used for control and visualization of the robot. 

ros2d and nav2d have been modified and added for use in react environments.

you can see the modified library from `src/comonent/ros`.

Original opensource library, See this.
[ROS Web Tools](http://robotwebtools.org/tools.html)

------

## `Systme features`

you can see the Delibird web applciation's component in `src` folder.
### `Users`
#### `serve mode`
Serving mode is the core feature of Delibird, which can be performed when accessing the user account.
When the user selects the robot from the robot table and selects the table number, the robot starts serving to that table. 
When the service is complete, select the robot again and select the standby position, and the robot will move to the standby position.
the robot & map can tracked from web page.

you can see the component from `src/routes/Robot.js` and `src/components/serve_mode/`.
#### `clean mode`

Cleaning mode is a special function of delibrid, and the method of use is the same or similar to serving mode. 
When cleaning is started, the robot calculates the entire path within the map and starts cleaning by going around everywhere. 
The cleaned area can be tracked through a map on the web.

you can see the component from `src/routes/clean.js` and `src/components/clean_mode/`.

#### `delibird settings`

Delibird setting is the first step to drive in a real store. 
It includes the initial setup process. 
When the user enters the Map Generation tab and starts map generation, the robot operates Auto SLAM to automatically drive and starts map generation. 
You can save and exit maps.

you can see the component from `src/routes/RobotSet.js` and `src/components/make_map/`.

Users can enter the Tables Settings tab to specify the location of tables in-store. 
Within a map, you can specify and save tables by clicking.

you can see the component from `src/routes/TableSetting.js` and `src/components/table_setting/`.

### `Admin`
Administrators can register user accounts and link accounts with robots.
#### `user settings`

Administrators can add user accounts by accessing the User Accounts tab and entering and saving user information.

you can see the component from `src/routes/admin/Memeber.js` and `src/components/admin/member/`.

#### `delibird connection`

The administrator can access the Delibrid Linked tab to view the user's account as a table and add the robot to that account. 
The added robot can be checked by accessing the user account.

you can see the component from `src/routes/admin/AdminRobot.js` and `src/components/admin/robot_connection/`.


