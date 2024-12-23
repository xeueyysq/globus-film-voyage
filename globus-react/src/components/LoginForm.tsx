import { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import instance from '../axios';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../useStore';

const LoginForm = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { setUser } = useStore();

    const onFinish = async (values: { email: string; password: string }) => {
        try {
            setLoading(true);
            const response = await instance.post('/login', values);
            localStorage.setItem('token', response.data.token);
            setUser(response.data.user);
            message.success('Успешный вход');
            navigate('/');
        } catch (error) {
            message.error('Ошибка при входе');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form onFinish={onFinish}>
            <Form.Item
                name="email"
                rules={[{ required: true, message: 'Введите email' }]}
            >
                <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Введите пароль' }]}
            >
                <Input.Password placeholder="Пароль" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Войти
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;