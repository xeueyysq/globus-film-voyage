import RegisterForm from '@/components/RegisterForm';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh' 
        }}>
            <Card title="Регистрация" style={{ width: 300 }}>
                <RegisterForm />
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    Уже есть аккаунт? <Link to="/login">Войти</Link>
                </div>
            </Card>
        </div>
    );
};

export default RegisterPage;