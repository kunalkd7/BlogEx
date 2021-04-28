import './App.css';
import Header from './components/header';
import Signup from './components/signup';
import Login from './components/login';
import Home from './components/home';
import Dashboard from './components/userdashboard';
import Createblog from './components/createblog';
import Blogview from './components/blogview'

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux'
import store from './redux/store'

function App() {
  return (
    <Provider store={store}>
      <Router>

        <Header />
        {/* we can create layout of routing too ex: diving it in column */}
        <Switch>
          {/* can also give any component link in Route also */}
          <Route path="/" exact component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/createblog" component={Createblog} />
          <Route path="/blogview/:slug" component={Blogview} />
          <Route render={() => <h1>404: page not found</h1>} />
        </Switch>

      </Router>

    </Provider>
  );
}

export default App;
