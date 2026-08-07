import { Navigate, Route, Routes } from "react-router-dom"
import ChatPage from "./pages/ChatPage"
import LoginPage from "./pages/LoginPage"
import SingUpPage from "./pages/SingUpPage"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"
import PageLoader from "./components/PageLoader"
import { Toaster } from "react-hot-toast";

function App() {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth])


  if (isCheckingAuth) return <PageLoader />

  return (
    <div className="h-screen bg-slate-900 overflow-hidden relative">
      {/* DECORATORS - GRID BG & GLOW SHAPES */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute top-0 left-0 w-1/2 aspect-square max-w-[400px] pointer-events-none bg-pink-500 opacity-20 blur-[100px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-1/2 aspect-square max-w-[400px] pointer-events-none bg-cyan-500 opacity-20 blur-[100px] translate-x-1/3 translate-y-1/3" />

      <div className="w-full h-full z-10 flex items-center justify-center">
        <Routes>
          <Route path="/" element={authUser ? <ChatPage /> : <Navigate to={"/login"} />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
          <Route path="/signup" element={!authUser ? <SingUpPage /> : <Navigate to={"/"} />} />
        </Routes>
        <Toaster />
      </div>
    </div>

  )
}

export default App