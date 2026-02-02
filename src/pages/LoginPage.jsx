import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { MessageCircleIcon, LockIcon, MailIcon, UserIcon, LoaderIcon } from "lucide-react";
import { Link } from "react-router-dom";


function LoginPage() {

  const [formData, setFormData] = useState({email:"", password:""});
  const {login, isLoggingIn} = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  }
  
  return (
    <div className="w-full min-h-screen flex items-center justify-center px-2 py-4 sm:px-4 sm:py-6 md:py-8 bg-slate-900">
      <div className="relative w-full max-w-7xl h-auto md:h-[700px] lg:h-[800px]">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row">
            {/* FORM COLUMN - LEFT SIDE */}
            <div className="w-full md:w-1/2 p-4 xs:p-5 sm:p-6 md:p-8 flex flex-col items-center justify-center md:border-r border-slate-600/30">
              <div className="w-full max-w-sm">
                {/* HEADING TEXT */}
                <div className="text-center mb-5 xs:mb-6 sm:mb-7 md:mb-8">
                  <MessageCircleIcon className="w-9 xs:w-10 sm:w-11 md:w-12 lg:w-14 h-9 xs:h-10 sm:h-11 md:h-12 lg:h-14 mx-auto text-slate-400 mb-2 xs:mb-3 sm:mb-4" />
                  <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-200 mb-1 xs:mb-2 sm:mb-3 leading-tight">Welcome Back</h2>
                  <p className="text-xs xs:text-sm sm:text-base text-slate-400">Login to access your account</p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6">

                  {/* EMAIL INPUT */}
                  <div>
                    <label className="auth-input-label">Email</label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon" />

                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="input"
                        placeholder="henry@gmail.com"
                        required
                      />
                    </div>
                  </div>

                  {/* PASSWORD INPUT */}
                  <div>
                    <label className="auth-input-label">Password</label>
                    <div className="relative">
                      <LockIcon className="auth-input-icon" />

                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="input"
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <button className="auth-btn mt-2 xs:mt-3 sm:mt-4" type="submit" disabled={isLoggingIn}>
                    {isLoggingIn ? (
                      <LoaderIcon className="w-5 h-5 animate-spin mx-auto" />
                    ) : (
                      "Login"
                    )}
                  </button>
                </form>

                <div className="mt-3 xs:mt-4 sm:mt-5 md:mt-6 text-center">
                  <p className="text-xs xs:text-sm text-slate-500 mb-2">Don't have an account?</p>
                  <Link to="/signup" className="auth-link text-xs xs:text-sm sm:text-base inline-block">
                    Sign Up Here
                  </Link>
                </div>
              </div>
            </div>

            {/* FORM ILLUSTRATION - RIGHT SIDE */}
            <div className="hidden md:flex md:w-1/2 items-center justify-center p-4 md:p-6 lg:p-8 bg-gradient-to-bl from-slate-800/20 to-transparent">
              <div className="w-full flex flex-col items-center justify-center">
                <img
                  src="/login.png"
                  alt="People using mobile devices"
                  className="w-full h-auto object-contain max-w-xs"
                />
                <div className="mt-4 md:mt-5 lg:mt-6 text-center w-full px-2">
                  <h3 className="text-base md:text-lg lg:text-xl font-medium text-cyan-400 leading-tight">Connect anytime and anywhere</h3>

                  <div className="mt-2 md:mt-3 lg:mt-4 flex flex-wrap justify-center gap-1.5 md:gap-2 lg:gap-3">
                    <span className="auth-badge text-xs">Free</span>
                    <span className="auth-badge text-xs">Easy Setup</span>
                    <span className="auth-badge text-xs">Private</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}

export default LoginPage;