import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import ScrollToTop from './components/shared/ScrollToTop.'
import './index.css'

import Login from './pages/Login/Login.jsx'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import ResetPassword from './pages/ForgotPassword/ResetPassword'
import NotFound from './pages/Notfound/NotFound'
import Home from './pages/Home/Home'
import Tarifs from './pages/Tarifs/Tarifs'
import Solution from './pages/Solution/Solution.jsx'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'

import ProtectedRoute from './pages/Private/ProtectedRoutes'

import AdminHome from './pages/Private/PrivateAdmin/AdminHome'
import AdminWorker from './pages/Private/PrivateAdmin/AdminWorker/AdminWorker'
import AdminEtablissement from './pages/Private/PrivateAdmin/AdminEtablissement/AdminEtablissement'

import AdminPointage from './pages/Private/PrivateAdmin/AdminPointage/AdminPointage'
import AdminConfig from './pages/Private/PrivateAdmin/AdminConfiguration/AdminConfig'
import AdminMessages from './pages/Private/PrivateAdmin/AdminMessages/AdminMessages'
import AdminEtablissementDetails from './pages/Private/PrivateAdmin/AdminEtablissementDetails/AdminEtablissementDetails'
import AdminWorkerDetails from './pages/Private/PrivateAdmin/AdminWorkerDetails/AdminWorkerDetails'
import AdminPointeuse from './pages/Private/PrivateAdmin/AdminPointeuse/AdminPointeuse'
import AdminPointeuseDetails from './pages/Private/PrivateAdmin/AdminPointeuseDetails/AdminPointeuseDetails'
import PrivateUserMaladies from './pages/Private/PrivateUser/PrivateUserMaladies/PrivateUserMaladies'
import PrivateUserCongees from './pages/Private/PrivateUser/PrivateUserCongees/PrivateUserCongees'
import PrivateUserHome from './pages/Private/PrivateUser/PrivateUserHome/PrivateUserHome'
import PrivateUserMyProfil from './pages/Private/PrivateUser/PrivateUserMyProfil/PrivateUserMyProfil'
import PrivateUserPreferences from './pages/Private/PrivateUser/PrivateUserPreferences/PrivateUserPreferences'
import PrivateUserConfiguration from './pages/Private/PrivateUser/PrivateUserConfiguration/PrivateUserConfiguration'
import PrivateSuperAdminHome from './pages/Private/PrivateSuperAdmin/PrivateSuperAdminHome/PrivateSuperAdminHome'
import PrivateUserMessages from './pages/Private/PrivateUser/PrivateUserMessages/PrivateUserMessages'
import ConnectNotif from './components/shared/ConnectNotif/ConnectNotoif'

// PRIVATE PAGES COMPONENTS

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <div>
          {/* <Header /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/solution" element={<Solution />} />
            <Route path="/tarifs" element={<Tarifs />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />

            <Route path="/admin" element={<ProtectedRoute />}>
              {/* Routes accessible only to admins here */}

              <Route path="/admin/home" element={<AdminHome />} />
              <Route path="/admin/employee" element={<AdminWorker />} />
              <Route
                path="/admin/employee/:id"
                element={<AdminWorkerDetails />}
              />
              <Route
                path="/admin/etablissement"
                element={<AdminEtablissement />}
              />
              <Route
                path="/admin/etablissement/:id"
                element={<AdminEtablissementDetails />}
              />
              <Route path="/admin/pointeuse" element={<AdminPointeuse />} />
              <Route
                path="/admin/pointeuse/:id"
                element={<AdminPointeuseDetails />}
              />
              <Route path="/admin/pointage" element={<AdminPointage />} />
              <Route path="/admin/messages" element={<AdminMessages />} />
              <Route path="/admin/configuration" element={<AdminConfig />} />
            </Route>

            <Route path="/user" element={<ProtectedRoute />}>
              {/* Routes accessible only to users here */}

              <Route path="/user/home" element={<PrivateUserHome />} />
              <Route path="/user/messages" element={<PrivateUserMessages />} />
              <Route path="/user/maladies" element={<PrivateUserMaladies />} />
              <Route path="/user/congees" element={<PrivateUserCongees />} />
              <Route
                path="/user/mon-profil"
                element={<PrivateUserMyProfil />}
              />
              <Route
                path="/user/preferences"
                element={<PrivateUserPreferences />}
              />
              <Route
                path="/user/configuration"
                element={<PrivateUserConfiguration />}
              />
            </Route>

            <Route path="/superAdmin" element={<ProtectedRoute />}>
              <Route
                path="/superAdmin/home"
                element={<PrivateSuperAdminHome />}
              />
            </Route>
          </Routes>
        </div>
        {/* <Footer /> */}
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
