import { Routes, Route } from "react-router-dom";
import TmmLanding from "./pages/TmmLanding.tsx";
import NotFound from "./pages/NotFound.tsx";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<TmmLanding/>} />
            <Route path="/demo" element={<TmmLanding/>} />
            <Route path="*" element={<NotFound />} />

        </Routes>
    );
}