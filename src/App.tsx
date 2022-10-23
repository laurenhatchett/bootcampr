import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateProject from './screens/CreateProject/CreateProject';
import './App.css';
import Landing from './screens/Landing/Landing';
import SignIn from './screens/SignIn/SignIn';
import SignUp from './screens/SignUp/SignUp';
import Nav from './layout/Nav/Nav';
import { Layout } from './layout/Layout';
import { UserProfile } from './screens/UserProfile/UserProfile';

function App() {
  return (
    <Layout>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/users/:id" element={<UserProfile />} />
          {/* <Route path="/users/:id/edit" element={<EditProfile />} /> */}
          <Route path="/projects/create" element={<CreateProject />} />
        </Routes>
      </Router>
    </Layout>
  );
}

export default App;
