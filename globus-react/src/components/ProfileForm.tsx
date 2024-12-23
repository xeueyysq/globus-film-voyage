import { Form, Input, Button, message } from 'antd';
import { useState } from 'react';
import instance from '../axios';
import { useStore } from '../useStore';

interface UserProfile {
    username: string;
    email: string;
    bio?: string;
    location?: string;
}

const ProfileForm = () => {
    const { user, setUser } = useStore();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: UserProfile) => {
        try {
            setLoading(true);
            const response = await instance.put('/profile', values);
            setUser(response.data);
            message.success('Профиль обновлен');
        } catch (error) {
            message.error('Ошибка при обновлении профиля');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form
            initialValues={{
                username: user?.username,
                email: user?.email,
                bio: user?.bio,
                location: user?.location
            }}
            onFinish={onFinish}
            layout="vertical"
        >
            <Form.Item
                label="Имя пользователя"
                name="username"
                rules={[{ required: true, message: 'Введите имя пользователя' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[
                    { required: true, message: 'Введите email' },
                    { type: 'email', message: 'Введите корректный email' }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="О себе"
                name="bio"
            >
                <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item
                label="Местоположение"
                name="location"
            >
                <Input />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Сохранить изменения
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ProfileForm;