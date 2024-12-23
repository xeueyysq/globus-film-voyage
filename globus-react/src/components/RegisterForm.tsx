import { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import instance from '../axios';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: { username: string; email: string; password: string }) => {
        try {
            setLoading(true);
            const response = await instance.post('/register', values);
            localStorage.setItem('token', response.data.token);
            message.success('Регистрация успешна');
            navigate('/');
        } catch (error) {
            message.error('Ошибка при регистрации');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form onFinish={onFinish}>
            <Form.Item
                name="username"
                rules={[{ required: true, message: 'Введите имя пользователя' }]}
            >
                <Input placeholder="Имя пользователя" />
            </Form.Item>

            <Form.Item
                name="email"
                rules={[
                    { required: true, message: 'Введите email' },
                    { type: 'email', message: 'Введите корректный email' }
                ]}
            >
                <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[
                    { required: true, message: 'Введите пароль' },
                    { min: 6, message: 'Пароль должен быть не менее 6 символов' }
                ]}
            >
                <Input.Password placeholder="Пароль" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Зарегистрироваться
                </Button>
            </Form.Item>
        </Form>
    );
};

export default RegisterForm;