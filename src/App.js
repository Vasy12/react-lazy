import React, { lazy, Suspense } from 'react';
import HyperlinkParser from './components/HyperlinkParser';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from 'react-router-dom';

const AuthPage = lazy(() => import('./pages/Auth'));
const DashboardPage = lazy(() => import('./pages/Dashboard'));
const HomePage = lazy(() => import('./pages/Home'));

function App() {
  return (
    <>
      <Router>
        <nav>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to={'/login'}>Login</NavLink>
            </li>
            <li>
              <NavLink to="/signup">Sign Up</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/parser">Parser</NavLink>
            </li>
          </ul>
        </nav>
        <Suspense fallback={<span>Loading...</span>}>
          <Switch>
            <Route path="/" exact>
              <HomePage />
            </Route>
            <Route path={['/signin', '/signup', '/login']} exact>
              <AuthPage />
            </Route>
            <Route path="/dashboard" exact>
              <DashboardPage />
            </Route>
            <Route path="/parser">
              <HyperlinkParser url="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API" />
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
