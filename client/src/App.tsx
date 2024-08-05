import React from 'react';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import MessagesPage from './pages/MessagesPage';

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/messages" />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/messages" element={<MessagesPage />}>
          <Route path=":chatId" element={<MessagesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
