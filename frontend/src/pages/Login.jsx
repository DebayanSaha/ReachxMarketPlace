import { useState } from "react";
import { loginUser } from "../api/api";

const Login = ({ onLogin, onGoRegister, addToast }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await loginUser(form);
      addToast("Welcome back!", "success");
      onLogin(data.user);
    } catch (err) {
      addToast(err?.response?.data?.message || "Login failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1117] flex items-center justify-center p-4">

      {/* Subtle background grid */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(127,119,221,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(127,119,221,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="w-full max-w-sm relative z-10">

        {/* Logo + heading */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-violet-700 mb-5">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
            </svg>
          </div>
          <h1 className="text-2xl font-medium text-white tracking-tight">ProjectHub</h1>
          <p className="text-sm text-zinc-500 mt-1.5">Sign in to your account</p>
        </div>

        {/* Card */}
        <div className="bg-[#161b27] border border-white/[0.08] rounded-2xl p-6">
          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5 tracking-wide">
                Email address
              </label>
              <input
                type="email" name="email" value={form.email} onChange={handleChange} required
                placeholder="you@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-white/[0.08] bg-[#1c2236]
                  text-sm text-zinc-100 placeholder:text-zinc-600
                  focus:outline-none focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/10
                  transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5 tracking-wide">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password" value={form.password} onChange={handleChange} required
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-white/[0.08] bg-[#1c2236]
                    text-sm text-zinc-100 placeholder:text-zinc-600
                    focus:outline-none focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/10
                    transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400 transition-colors"
                >
                  {showPassword ? (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full py-2.5 mt-1 rounded-xl bg-violet-600 hover:bg-violet-500 active:scale-[0.98]
                text-white text-sm font-medium transition-all disabled:opacity-50
                flex items-center justify-center gap-2"
            >
              {loading ? (
                <><span className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> Signing in…</>
              ) : "Sign in"}
            </button>
          </form>

          <div className="mt-5 pt-5 border-t border-white/[0.06] text-center">
            <p className="text-sm text-zinc-500">
              No account?{" "}
              <button
                onClick={onGoRegister}
                className="text-violet-400 font-medium hover:text-violet-300 transition-colors"
              >
                Create one
              </button>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-zinc-700 mt-6">
          Portfolio admin · v2.0
        </p>
      </div>
    </div>
  );
};

export default Login;