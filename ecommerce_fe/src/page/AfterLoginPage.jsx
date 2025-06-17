import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

function AfterLoginPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  async function fetchUser() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://127.0.0.1:8000/api/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (!response.ok) throw new Error('Token không hợp lệ');
        const user = await response.json();
        localStorage.setItem('user', JSON.stringify(user));
        console.log('Người dùng:', user);
    } catch (err) {
        console.error('Không thể lấy thông tin người dùng:', err);
    }
    }


  useEffect(() => {
    const token = searchParams.get('access_token');


    if (token) {
      localStorage.setItem('token', token);
      fetchUser().then(() => {

        navigate('/');
      });
    }
  }, []);

  return <div>Đăng nhập thành công! Đang chuyển hướng...</div>;
}

export default AfterLoginPage;
