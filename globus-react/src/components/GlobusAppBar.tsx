import { Layout, Typography, Menu, theme } from 'antd';
import { useStore } from '../useStore';
import { useNavigate } from 'react-router-dom';
import {
    HomeOutlined,
    UserOutlined,
    HeartOutlined,
    LoginOutlined,
    LogoutOutlined
} from '@ant-design/icons';

const { Content, Sider } = Layout;
const { Text } = Typography;

interface Props {
    children: React.ReactNode;
}

const GlobusAppBar = ({ children }: Props) => {
    const { user, setUser } = useStore();
    const navigate = useNavigate();
    const { token } = theme.useToken();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    const menuItems = [
        {
            key: '1',
            icon: <HomeOutlined />,
            label: 'Главная',
            onClick: () => navigate('/')
        },
        user ? {
            key: '2',
            icon: <HeartOutlined />,
            label: 'Избранное',
            onClick: () => navigate('/favorites')
        } : null,
        user ? {
            key: '3',
            icon: <UserOutlined />,
            label: 'Профиль',
            onClick: () => navigate('/profile')
        } : null,
        user ? {
            key: '4',
            icon: <LogoutOutlined />,
            label: 'Выйти',
            onClick: handleLogout
        } : {
            key: '4',
            icon: <LoginOutlined />,
            label: 'Войти',
            onClick: handleLogin
        }
    ].filter(Boolean);

    return (
        <Layout style={{ minHeight: '100vh', background: token.colorBgContainer }}>
            <Sider
                theme="dark"
                breakpoint="lg"
                collapsedWidth="0"
                style={{
                    background: token.colorBgElevated
                }}
            >
                <div style={{ 
                    height: '32px', 
                    margin: '16px', 
                    background: token.colorPrimary,
                    color: token.colorTextLightSolid,
                    textAlign: 'center',
                    lineHeight: '32px',
                    borderRadius: token.borderRadius
                }}>
                    GlobusFilmVoyage
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={menuItems}
                    style={{
                        background: 'transparent'
                    }}
                />
                {user && (
                    <div style={{ 
                        padding: '16px', 
                        textAlign: 'center',
                        borderTop: `1px solid ${token.colorBorder}`,
                        color: token.colorTextSecondary
                    }}>
                        <Text style={{ color: token.colorTextSecondary }}>{user.username}</Text>
                    </div>
                )}
            </Sider>
            <Layout>
                <Content style={{ margin: '24px 16px 0', background: token.colorBgElevated }}>
                    <div style={{ padding: 24, minHeight: 360 }}>
                        {children}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default GlobusAppBar;
