import { Outlet, Navigate } from 'react-router-dom';
import Header from '../../components/Header/Header';

function ProtectedRoute() {
  const userRole = JSON.parse(localStorage.getItem('userRole'));

  if (userRole !== 'admin' && userRole !== 'user' && userRole !== 'superAdmin') {
    return <Navigate to={'/login'} />;
  }

  if (userRole === 'admin') {
    return (
      <>
        <Header />
        <Outlet />
      </>
    );
  }

  if (userRole === 'superAdmin') {
    return (
      <>
        <Header />
        <Outlet />
      </>
    );
  }

  // Si vous avez des configurations spécifiques pour superAdmin, ajoutez-les ici.

  return( 
  <>
    <Header />
  <Outlet />
  </>
  );
}


export default ProtectedRoute