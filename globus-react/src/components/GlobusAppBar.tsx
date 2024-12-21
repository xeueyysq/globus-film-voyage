import { useState } from 'react';
import { Button, Layout, Menu } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, SearchOutlined, HomeOutlined } from '@ant-design/icons';

const { Sider, Header, Content } = Layout;

const GlobusAppBar = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed} width='17%'>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    style={{ height: '100%', fontWeight: 'bolder'}}
                    items={[
                        {
                            key: '1',
                            label: 'Home',
                            icon: <HomeOutlined />
                        },
                        {
                            key: '2',
                            label: 'Search',
                            icon: <SearchOutlined/>,
                        },
                    ]}
                />
            </Sider>

            <Layout>
                <Header style={{ padding: 0, background: 'white' }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>

                <Content style={{ margin: '16px', padding: '24px', background: 'white', minHeight: '280px' }}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default GlobusAppBar;
