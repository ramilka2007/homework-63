import './App.css';
import Toolbar from './components/Toolbar/Toolbar';
import { Link, Route, Routes } from 'react-router-dom';
import About from './components/About/About';
import AddPost from './components/AddPost/AddPost';
import Contacts from './components/Contacts/Contacts';
import Home from './components/Home/Home';

const App = () => {
  return (
    <>
      <header>
        <Toolbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-post" element={<AddPost />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
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
