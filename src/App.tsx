import './App.css';
import Toolbar from './components/Toolbar/Toolbar';
import { Link, Route, Routes } from 'react-router-dom';
import About from './containers/About/About';
import AddPost from './containers/AddPost/AddPost';
import Contacts from './containers/Contacts/Contacts';
import Home from './containers/Home/Home';
import OnePost from './containers/OnePost/OnePost';
import EditPost from './containers/EditPost/EditPost';

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
          <Route path="/posts/:id" element={<OnePost />} />
          <Route path="/posts/:id/edit" element={<EditPost />} />
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
