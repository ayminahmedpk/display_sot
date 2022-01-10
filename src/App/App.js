
// React
import React from 'react';
// Router
import {
    BrowserRouter as Router ,
    Routes                  ,
    Route                   ,
} from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from '../Redux/store.js';


// Pages
import SearchPage from '../Pages/SearchPage/SearchPage.js';
import StampPage  from '../Pages/StampPage/StampPage.js'  ;


// Style
import './App.scss';


const App = () => (
    <>
    <Provider store={store}>
        
        <Router>

            <Routes>

                <Route element={<SearchPage/>} path={'/'        } > </Route>
                <Route element={<StampPage/> } path={'/:videoID'} > </Route>

            </Routes>

        </Router>

    </Provider>
    </>
);

export default App;