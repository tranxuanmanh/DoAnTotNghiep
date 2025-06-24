import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import useAuth from '../../../Login_Logout/CustomHook';
import { useNavigate } from 'react-router';

const useCheckJwt = () => {
  const navigate = useNavigate();
  const { getToken, logout } = useAuth();

  useEffect(() => {
    const token = getToken();
    if (!token) return;

    let logoutTimer;

    try {
      const decoded = jwtDecode(token);

      // Nếu token đã hết hạn
      if (decoded.exp < Date.now() / 1000) {
        handleLogout();
        return;
      }

      // Nếu token còn hạn: tính thời gian còn lại
      const timeUntilExpiry = decoded.exp * 1000 - Date.now();
      
      logoutTimer = setTimeout(() => {
        handleLogout();
        console.log(timeUntilExpiry)
      }, timeUntilExpiry);
    } catch (error) {
      console.error('Token decode error:', error);
      handleLogout();
    }

    return () => clearTimeout(logoutTimer);

    function handleLogout() {
      toast.error('Phiên đăng nhập đã hết hạn!! Vui lòng đăng nhập lại', {
        autoClose: 2000,
        position: 'top-center',
        onClose: () => {
            logout();
            window.location.href = "/logout";
        }
      });

    //   setTimeout(() => {
    //     logout();
    //     window.location.href = "/logout";
    //     // navigate('/login', { replace: true });
    //   }, 2500);
    }
  }, [getToken, logout, navigate]);
};

export default useCheckJwt;
