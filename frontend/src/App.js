import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Error from "./pages/Error";
import Post from "./pages/Post";
import Search from "./pages/Search";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/search" exact component={Search} />
        <Route path="/post/:postId" exact component={Post} />
        <Route path="/" exact component={Home} />
        <Route path="/" exact component={Home} />
        <Route path="/home" exact component={Home} />
        <Route path="*" exact component={Error} />
      </Switch>
    </Router>
  );
}

export default App;
