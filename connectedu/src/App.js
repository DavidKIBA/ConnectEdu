// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// importation des pages
import Home from './pages/Home';
import About from './pages/About';
import Inscription from './pages/Inscription';
import Contact from './pages/Contact'; 
import Error from './pages/Error';
import Connected from './pages/Connected';
import Connexion from './pages/Connexion';


// fichiers css
import './css/Home.css';
import './css/Menu.css';
import './css/Connected.css';
import './css/Inscription.css';
import './css/Connexion.css';
import './css/Footer.css';

const App = () => {
  return (
    <Router>
      {/* Définir les routes */}
  
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" exact component={About} />
        <Route path="/inscription" exact component={Inscription} />
        <Route path="/contact" exact component={Contact} />
        <Route path="/connected" exact component={Connected} />
        <Route path="/connexion" exact component={Connexion} />
        <Route component={Error} />
      </Switch>
    </Router>
  );
};

export default App;
