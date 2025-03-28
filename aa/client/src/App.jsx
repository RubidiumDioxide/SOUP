import {React, useState} from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate } from 'react-router-dom';

import Header from './components/nav/Header';
import AllProjectsPage from './components/pages/AllProjectsPage';
import MyProjectsPage from './components/pages/MyProjectsPage';
import WelcomePage from './components/pages/WelcomePage'; 
import NotificationsPage from './components/pages/NotificationsPage'; 
import IndProject from './components/indproject_comps/IndProject';
import IndUser from './components/induser_comps/IndUser';


function App() {
  const [appState, setAppState] = useState({
    usertype : sessionStorage.getItem('savedAppState')? sessionStorage.getItem('savedAppState') : "observer", 
    userID : sessionStorage.getItem('savedUserID')? sessionStorage.getItem('savedUserID') : null
  })

  sessionStorage.setItem('saveAppState', appState); 

  function changeAppState(newUserType, newUserID){
    setAppState({
      usertype : newUserType, 
      userID : newUserID
    });
    sessionStorage.setItem('savedAppState', newUserType); 
    sessionStorage.setItem('savedUserID', newUserID); 
  }

  const RegisteredRoute = ({ usertype, children }) => {
    return (usertype === "observer")? <Navigate to="/welcome"/> : children; 
  }; 

  const appRouter = createBrowserRouter(
      createRoutesFromElements(
        <>
          <Route path="/welcome" element = {
            <div>
              <Header />
              <WelcomePage 
                changeAppState={changeAppState}
              />
            </div>
          }/>
          
          <Route
            path="/" 
            element={
              <RegisteredRoute usertype={appState.usertype}>
                <Header />
              </RegisteredRoute>
            }
          />

          <Route 
            path="/allprojects" 
            element={
              <RegisteredRoute usertype={appState.usertype}>
                <div>
                  <Header />
                  <AllProjectsPage />
                </div>
              </RegisteredRoute>
            }          
          />

          <Route 
            path="/myprojects" 
            element={
              <RegisteredRoute usertype={appState.usertype}>
                <div>
                  <Header />
                  <MyProjectsPage />
                </div>
              </RegisteredRoute>
            }          
          />

          <Route 
            path="/user" 
            element={
              <RegisteredRoute usertype={appState.usertype}>
                <div>
                  <Header />
                  <IndUser />
                </div>
              </RegisteredRoute>
            }          
          />  

          <Route 
            path="/notifications" 
            element={
              <RegisteredRoute usertype={appState.usertype}>
                <div>
                  <Header />
                  <NotificationsPage />
                </div>
              </RegisteredRoute>
            }          
          />  


          <Route 
            path="/user/:id" 
            element={
              <RegisteredRoute usertype={appState.usertype}>
                <div>
                  <Header />
                  <IndUser />
                </div>
              </RegisteredRoute>
            }          
          />  

          <Route 
            path="/project/:id" 
            element={
              <RegisteredRoute usertype={appState.usertype}>
                <div>
                  <Header />
                  <IndProject />
                </div>
              </RegisteredRoute>
            }          
          /> 
        </>    
      ),
      {
        basename: '/app' 
      }
  )

  return (
    <div class="app">
      <p>Current user type: {appState.usertype} </p>
      <p>Current userID: {appState.userID} </p>
      <RouterProvider router={appRouter}/>
    </div>
  );
}

export default App;
