import './App.css';
import Toolbar from "./components/Toolbar/Toolbar";
import {Link, Route, Routes} from "react-router-dom";

const App = () => {
  return (
      <>
          <header>
              <Toolbar/>
          </header>
          <main>
              <Routes>
                  <Route path="/"/>
                  <Route path="/new-post"/>
                  <Route path="/about"/>
                  <Route path="/contacts"/>
                  <Route
                      path="*"
                      element={
                          <div>
                              <h1 className={'mt-5 text-danger'}>Not found!</h1>
                              <Link to="/" className={'btn btn-danger'}>
                                  Go back!
                              </Link>
                          </div>
                      }
                  />
              </Routes>
          </main>
      </>
  );
};

export default App;
