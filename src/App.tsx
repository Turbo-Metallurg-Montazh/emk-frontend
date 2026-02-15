import { Routes, Route } from "react-router-dom";
import TmmLanding from "./pages/TmmLanding.tsx";
import NotFound from "./pages/NotFound.tsx";
import Univer from "./components/Univer/Univer.tsx";
import {AiAskWidget} from "./components/widgets/AiAskWidget.tsx";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<TmmLanding/>} />
            <Route path="/demo" element={<TmmLanding/>} />
            <Route path="*" element={<NotFound />} />
            <Route path="/table" element={<Univer/>} />
            <Route path="/ask-ai" element={<AiAskWidget/>} />

        </Routes>
    );
}