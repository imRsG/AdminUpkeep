import { BrowserRouter, Route, Switch } from "react-router-dom";
import "mdb-ui-kit/css/mdb.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./pages/home";

// import Signup from "./Components/BodyComponent/Signup";
import Signin from './Components/BodyComponent/Signin';
function App() {
  const token = localStorage.getItem('accessToken');
  console.log(token)
  if (!token) {
    return <Signin />

  }
  console.log(token)
  return (
    <div className="wrapper">
      {/* <Signup /> */}
      <BrowserRouter>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
export default App;
