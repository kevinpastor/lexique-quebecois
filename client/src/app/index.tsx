import { ReactElement } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Navigation } from "./navigation";
import { HomePage } from "./pages/home";
import { DefinitionPage } from "./pages/definition";
import { Sidebar } from "./sidebar";

export const App = (): ReactElement => (
    <BrowserRouter>
        <Navigation />
        <main className="container mx-auto py-4">
            <div className="flex flex-row space-x-4">
                <div className="basis-2/3">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/definitions/:id" element={<DefinitionPage />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </div>
                <div className="basis-1/3">
                    <Sidebar />
                </div>
            </div>
        </main>
    </BrowserRouter>
);
