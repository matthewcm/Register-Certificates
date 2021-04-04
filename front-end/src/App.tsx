import React, { useEffect, useState} from 'react'
import "./assets/css/output.css"
import "./assets/css/base.css"

import "@clayui/css/lib/css/atlas.css";

import Index from "./pages/Index"

import {BrowserRouter, Switch, Route} from "react-router-dom";

import {StoreProvider} from "./context/store/Store";


const App = () => {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
            <StoreProvider>
                <Index/>
            </StoreProvider>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
