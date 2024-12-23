import LoginForm from '@/components/LoginForm';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh' 
        }}>
            <Card title="Вход" style={{ width: 300 }}>
                <LoginForm />
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
                </div>
            </Card>
        </div>
    );
};

export default LoginPage;