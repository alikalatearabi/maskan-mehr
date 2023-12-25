import React, { Fragment } from 'react';
import './App.css';
import Routers from './Routes';
import {setAuthToken} from "./Config/setAuth";
import CustomizerProvider from "./_helper/customizer/CustomizerProvider";
import AnimationThemeProvider from "./_helper/AnimationTheme/AnimationThemeProvider";

function App() {
      const token = localStorage.getItem("token");
      if (token) {
            setAuthToken(token);
      }
      return (
          <Fragment>
              <CustomizerProvider>
                  <AnimationThemeProvider>
                      <Routers />
                  </AnimationThemeProvider>
              </CustomizerProvider>
          </Fragment >
      );
}
export default App;