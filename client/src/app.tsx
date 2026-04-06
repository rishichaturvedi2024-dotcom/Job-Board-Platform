import React from 'react';
import { HashRouter as Router, Link, NavLink, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import JobDetailsPage from './pages/JobDetailsPage';
import SavedJobsPage from './pages/SavedJobsPage';
import ExploreRolesPage from './pages/ExploreRolesPage';

const App = () => {
    return (
        <Router>
            <div className="app-shell">
                <header className="topbar">
                    <div className="container topbar-inner">
                        <Link to="/" className="brand-mark" aria-label="Talent Forge Home">
                            Talent Forge
                        </Link>
                        <nav className="top-nav" aria-label="Primary">
                            <NavLink exact to="/" activeClassName="active-nav-link">
                                Open Roles
                            </NavLink>
                            <NavLink to="/explore-roles" activeClassName="active-nav-link">
                                Explore
                            </NavLink>
                            <NavLink to="/saved-jobs" activeClassName="active-nav-link">
                                Saved Jobs
                            </NavLink>
                        </nav>
                    </div>
                </header>

                <main className="container main-content" role="main">
                    <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/explore-roles" component={ExploreRolesPage} />
                        <Route path="/job/:jobId" component={JobDetailsPage} />
                        <Route path="/saved-jobs" component={SavedJobsPage} />
                    </Switch>
                </main>
            </div>
        </Router>
    );
};

export default App;