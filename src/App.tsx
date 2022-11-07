import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CreateProject } from './screens/CreateProject/CreateProject';
import { Landing } from './screens/Landing/Landing';
import { RegisterUserInfo } from './screens/RegisterUserInfo/RegisterUserInfo';
import { SignIn } from './screens/SignIn/SignIn';
import { SignUp } from './screens/SignUp/SignUp';
import { Nav } from './layout/Nav/Nav';
import { Layout } from './layout/Layout';
import AccountSettings from './screens/AccountSettings/AccountSettings';
import { UserProfile } from './screens/UserProfile/UserProfile';
import { EditProfile } from './screens/UserProfile/EditProfile';
import { Projects } from './screens/Projects/Projects';
import { ProjectDetails } from './screens/Projects/ProjectDetails';
import './App.css';

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
          <Route path="/users/:id/account-setup" element={<RegisterUserInfo />} />
          <Route path="/users/:id/edit" element={<EditProfile />} />
          < Route path="/projects">
            <Route index element={<Projects />} />
            <Route path="create" element={<CreateProject />} />
            <Route path=":id" element={<ProjectDetails />} />
          </Route>
          <Route path="/account-settings/:id" element={< AccountSettings />} />
        </Routes>
      </Router>
    </Layout>
  );
}

export default App;
