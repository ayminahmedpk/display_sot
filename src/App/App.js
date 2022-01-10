
// React
import React from 'react';
// Router
// Router
import {
    BrowserRouter as Router ,
    Routes                  ,
    Route                   ,
} from 'react-router-dom';


// Pages
import SearchPage from '../Pages/SearchPage/SearchPage.js';
import StampPage  from '../Pages/StampPage/StampPage.js'  ;


// Style
import './App.scss';


const App = () => (
    <>
    <Router>

        <Routes>

            <Route path={'/'} element={<SearchPage/>}> </Route>

            <Route path={'/:videoID'} element={<StampPage/>}> </Route>

        </Routes>

    </Router>
    </>
);

export default App;