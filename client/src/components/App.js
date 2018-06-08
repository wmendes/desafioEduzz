import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PageNotFound from './common/PageNotFound';
import CandidateListContainer from './candidate/CandidateListContainer'; // eslint-disable-line import/no-named-as-default
import AddOrEditCandidateContainer from './candidate/AddOrEditCandidateContainer'; // eslint-disable-line import/no-named-as-default
import createBrowserHistory from 'history/createBrowserHistory';
// import HeaderNavContainer from './landing/HeaderNavContainer'; // eslint-disable-line import/no-named-as-default



const history = createBrowserHistory();


const App = () => {
    return (
        <div >
            <Router history={history}>
                <div>



                    <Switch>
                        <Route exact path="/" component={CandidateListContainer} />
                        <Route exact path="/candidate" component={AddOrEditCandidateContainer} />
                        <Route path="/candidate/:id" component={AddOrEditCandidateContainer} />
                        <Route component={PageNotFound} />
                    </Switch>

                </div>

            </Router>
        </div>
    );
};


export default App;
