import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { NotFound } from '../pages/NotFound';
import { Login } from '../pages/Login';
import { RedefinePassword } from '../pages/redefinePassword';
import { APP_PAGES } from './pages.routes';

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />}>
                {APP_PAGES().map(({ route, component }) => {
                    return <Route key={route} path={route} element={component} />
                }
                )}
            </Route>
            <Route path="*" element={<NotFound />} />
            <Route path="/login" element={<Login />} />
            <Route path="/firstLogin" element={<RedefinePassword />} />
            <Route path="/login/adm" element={<Login />} />
            <Route path="/firstLogin/adm" element={<RedefinePassword />} />
        </Routes>
    )
}