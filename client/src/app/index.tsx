import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom"

import { Navigation } from "./navigation";
import { Home } from "./home";
import { Definition } from "./definition";

export const App = (): ReactElement => (
    <BrowserRouter>
        <Navigation />
        <main className="container mx-auto py-4">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/definitions/:id" element={<Definition />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </main>
    </BrowserRouter>
)


