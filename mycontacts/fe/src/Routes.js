import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home/index'
import NewContact from './pages/NewContact/index'
import EditContact from './pages/EditContact/index'

export default function Routes() {
  return(
    //Garante que seja renderizada apenas uma rota por vez
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/new" component={NewContact} />
      <Route path="/edit/:id" component={EditContact} />
    </Switch>
  )
}
