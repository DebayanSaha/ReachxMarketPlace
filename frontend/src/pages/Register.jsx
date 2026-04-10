import { useState } from "react";
import { registerUser } from "../api/api";

const Register = ({ onGoLogin, addToast }) => {
  const [form, setForm] = useState({ fullname: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerUser(form);
      addToast("Account created! Please sign in.", "success");
      onGoLogin();
    } catch (err) {
      addToast(err?.response?.data?.message || "Registration failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-500 mb-4 shadow-lg shadow-blue-200">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">ProjectHub</h1>
          <p className="text-sm text-gray-400 mt-1">Create your account</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Full name</label>
              <input
                type="text" name="fullname" value={form.fullname} onChange={handleChange} required
                placeholder="John Doe"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all placeholder:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Email address</label>
              <input
                type="email" name="email" value={form.email} onChange={handleChange} required
                placeholder="you@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all placeholder:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Password</label>
              <input
                type="password" name="password" value={form.password} onChange={handleChange} required
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all placeholder:text-gray-300"
              />
            </div>
            <button
              type="submit" disabled={loading}
              className="w-full py-2.5 rounded-xl bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600 active:scale-[0.98] transition-all disabled:opacity-60 mt-1"
            >
              {loading ? "Creating account…" : "Create Account"}
            </button>
          </form>
          <p className="text-center text-xs text-gray-400 mt-4">
            Already have an account?{" "}
            <button onClick={onGoLogin} className="text-blue-500 font-medium hover:text-blue-600 transition-colors">
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;