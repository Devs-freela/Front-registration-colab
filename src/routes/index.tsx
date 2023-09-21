import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { NotFound } from '../pages/NotFound';
import { APP_PAGES } from './pages.routes';
import { Login } from '../pages/Login';

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />}>
                {APP_PAGES.map(({ route, component }) => (
                    <Route key={route} path={route} element={component} />
                ))}
            </Route>
            <Route path="*" element={<NotFound />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}