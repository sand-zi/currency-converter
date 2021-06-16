import { Switch, Route } from 'react-router-dom';
import './assets/scss/styles.scss';
import { AppHeader } from './cmps/AppHeader';
import { CurrencyConvertor } from './pages/CurrencyConvertor';
import { CurrencyRates } from './pages/CurrencyRates';
import { Home } from './pages/Home';

function App() {
  return (
    <div className="App">
      <AppHeader/>
      <Switch>
        <Route path="/rates" component={CurrencyRates}></Route>
        <Route path="/currency" component={CurrencyConvertor}></Route>
        <Route path="/" exact component={Home}></Route>
      </Switch>
    </div>
  );
}

export default App;
