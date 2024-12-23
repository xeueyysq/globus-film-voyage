import { Card } from 'antd';
import GlobusAppBar from '@/components/GlobusAppBar';
import ProfileForm from '@/components/ProfileForm';

const ProfilePage = () => {
    return (
        <GlobusAppBar>
            <Card title="Профиль пользователя" style={{ maxWidth: 600, margin: '20px auto' }}>
                <ProfileForm />
            </Card>
        </GlobusAppBar>
    );
};

export default ProfilePage;