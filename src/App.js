import { BrowserRouter, Route, Switch } from "react-router-dom";
import "mdb-ui-kit/css/mdb.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./pages/home";
import Createlandlord from "./Components/CreateData/Createlandlord";

// import Signup from "./Components/BodyComponent/Signup";
import Signin from './Components/BodyComponent/Signin';
function App() {
  // const token = localStorage.getItem('accessToken');
  // if (!token) {
  //   return <Signin />
  // }
  return (
    <div className="wrapper">
      {/* <Signup /> */}
      {/* <Createlandlord /> */}
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
