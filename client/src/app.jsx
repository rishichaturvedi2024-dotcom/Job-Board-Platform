import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Link, NavLink, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import JobDetailsPage from './pages/JobDetailsPage';
import SavedJobsPage from './pages/SavedJobsPage';
import ExploreRolesPage from './pages/ExploreRolesPage';
import ApplicationsPage from './pages/ApplicationsPage';

const THEME_KEY = 'theme-mode';

const App = () => {
    const [themeMode, setThemeMode] = useState(() => {
        const storedTheme = window.localStorage.getItem(THEME_KEY);
        return storedTheme === 'dark' ? 'dark' : 'light';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', themeMode);
        window.localStorage.setItem(THEME_KEY, themeMode);
    }, [themeMode]);

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
                            <NavLink to="/applications" activeClassName="active-nav-link">
                                Applications
                            </NavLink>
                        </nav>
                        <button
                            type="button"
                            className="btn btn-ghost theme-toggle"
                            onClick={() => setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'))}
                            aria-label="Toggle dark mode"
                        >
                            {themeMode === 'light' ? 'Dark Mode' : 'Light Mode'}
                        </button>
                    </div>
                </header>

                <main className="container main-content" role="main">
                    <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/explore-roles" component={ExploreRolesPage} />
                        <Route path="/job/:jobId" component={JobDetailsPage} />
                        <Route path="/saved-jobs" component={SavedJobsPage} />
                        <Route path="/applications" component={ApplicationsPage} />
                    </Switch>
                </main>
            </div>
        </Router>
    );
};

export default App;
