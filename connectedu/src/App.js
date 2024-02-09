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
import Inscription2 from './pages/Inscription2';
import Inscription3 from './pages/Inscription3';
import Inscription4 from './pages/Inscription4';
import Dashboard from './pages/Dashboard';
import Espaceeleves from './pages/Espaceeleves';
import Espaceparents from './pages/Espaceparents';
import Espacemembres from './pages/Espacemembres';
import Dashboardmenu from './components/Dashboardmenu';
import Dashboardsider from './components/Dashboardsider';
import Niveauxprescolaire from './components/Niveauxprescolaire';
import Niveauxcollege from './components/Niveauxcollege';
import Niveauxlycee from './components/Niveauxlycee';
import MessagePage from './pages/MessagesPage';
import Cp1 from './pages/Elèves/Cp1';

// fichiers css

import './css/Home.css';

import './css/Connected.css';
import './css/Inscription.css';
import './css/Connexion.css';
import './css/Footer.css';
import './css/Inscription2.css';
import './css/Inscription3.css';
import './css/Inscription4.css';
import './css/ConnectedMenu.css';
import './css/Dashboard.css';
import './css/Espacemembres.css';





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
        <Route path="/inscription2" exact component={Inscription2} />
        <Route path="/inscription3" exact component={Inscription3} />
        <Route path="/inscription4" exact component={Inscription4} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/espaceeleves" exact component={Espaceeleves} />
        <Route path="/espaceparents" exact component={Espaceparents} />
        <Route path="/espacemembres" exact component={Espacemembres} />
        <Route path="/dashboardmenu" exact component={Dashboardmenu} />
        <Route path="/dashboardsider" exact component={Dashboardsider} />
        <Route path="/espacemembres" exact component={Espacemembres} />
        <Route path="/niveauxprescolaire" exact component={Niveauxprescolaire} />
        <Route path="/niveauxcollege" exact component={Niveauxcollege} />
        <Route path="/niveauxlycee" exact component={Niveauxlycee} />
        <Route path="/MessagePage" exact component={MessagePage} />
        <Route path="/cp1" exact component={Cp1} />

        <Route component={Error} />
      </Switch>
    </Router>
  );
};

export default App;
