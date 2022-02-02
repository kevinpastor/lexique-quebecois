import { ReactElement } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./home";
import { Navigation } from "./navigation";

export const App = (): ReactElement => (
    <BrowserRouter>
        <Navigation />
        <main className="container mx-auto py-4">
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </main>
    </BrowserRouter>
)


