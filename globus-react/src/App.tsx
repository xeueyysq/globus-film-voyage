import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ConfigProvider, theme } from 'antd';
import SearchPage from "./pages/SearchPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FavoritesPage from "./pages/FavoritesPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
                token: {
                    colorPrimary: '#1668dc',
                }
            }}
        >
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path='/favorites' element={<FavoritesPage />} />
                    <Route path='/profile' element={<ProfilePage />} />
                    <Route path="/" element={<SearchPage />} />
                </Routes>
            </Router>
        </ConfigProvider>
    );
}

export default App;