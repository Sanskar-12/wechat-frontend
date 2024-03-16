import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import { LayoutLoader } from "./components/layout/Loaders";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Groups = lazy(() => import("./pages/Groups"));
const NotFound = lazy(() => import("./pages/NotFound"));

const AdminLogin = lazy(() => import("../src/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("../src/admin/AdminDashboard"));
const UserManagement = lazy(() => import("../src/admin/UserManagement"));
const ChatManagement = lazy(() => import("../src/admin/ChatManagement"));
const MessageManagement = lazy(() => import("../src/admin/MessageManagement"));

const App = () => {
  let user = true;

  return (
    <Router>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/groups" element={<Groups />} />
          </Route>

          <Route
            path="/login"
            element={
              <ProtectedRoute user={!user} redirect="/">
                <Login />
              </ProtectedRoute>
            }
          />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users-management" element={<UserManagement />} />
          <Route path="/admin/chats-management" element={<ChatManagement />} />
          <Route path="/admin/messages" element={<MessageManagement />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
