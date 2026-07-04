import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './features/auth/login';
import Register from './features/auth/register';
import Home from './features/notes/noteHome';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/notes" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;