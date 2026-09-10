import { useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';

// Components
import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Dashboard from './components/Dashboard/Dashboard'
import Landing from './components/Landing/Landing'
import Hootlist from './components/HootList/Hootlist';
// Context
import { UserContext } from './contexts/UserContext';

//Services
import * as hootService from './services/hootService';
import HootDetails from './components/HootDetails/HootDetails';

const App = () => {
  const { user } = useContext(UserContext)
  const [hoots, setHoots] = useState([])
  useEffect(() => {
    const getAllHoots = async () => {
      try {
        const retrievedHoots = await hootService.index();
        console.log(retrievedHoots)
        setHoots(retrievedHoots)
      } catch (error) {
        console.log(error);
      }

    }
    getAllHoots()

  }, [user])

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
            <Route path='/hoots' element={<Hootlist hoots={hoots} />} />
            <Route path='/hoots/:hootId' element={<HootDetails />} />
          </>
        ) : (
          <>
            <Route path='/sign-up' element={<SignUpForm />} />
            <Route path='/sign-in' element={<SignInForm />} />
          </>
        )}

      </Routes>
    </>
  );
};

export default App;
