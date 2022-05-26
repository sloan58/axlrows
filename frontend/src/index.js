import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Ucms from "./Pages/Ucm/Ucms";
import Ucm from "./Pages/Ucm/Ucm";
import Query from "./Pages/Query/Query";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<App />}>
                  <Route index element={<Query />} />
                  <Route path="/ucm" element={<Ucms />} />
                  <Route path="/ucm/:ucmId" element={<Ucm />}/>
                  <Route
                      path="*"
                      element={
                          <div className="row mt-5 justify-content-center">
                              <div className="col-6 text-center">
                                  <h1>404 Not Found</h1>
                              </div>
                          </div>
                      }
                  />
              </Route>
          </Routes>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
