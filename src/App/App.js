
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
import SearchPage        from '../Pages/SearchPage/SearchPage.js';
import StampPage         from '../Pages/StampPage/StampPage.js'  ;
import OAuthRedirectPage from '../Pages/OAuthRedirectPage/OAuthRedirectPage.js';


// Style
import './App.scss';


const App = () => (
    <>
    <Provider store={store}>
        
        <Router>

            <Routes>

                <Route element={<SearchPage/>}         path={'https://ayminpk.github.io/sot3/build/index.html'        }       > </Route>
                <Route element={<StampPage/> }         path={'https://ayminpk.github.io/sot3/build/:videoID'}       > </Route>
                <Route element={<OAuthRedirectPage/> } path={'https://ayminpk.github.io/sot3/build/redirect.html'} > </Route>

            </Routes>

        </Router>

    </Provider>
    </>
);

export default App;