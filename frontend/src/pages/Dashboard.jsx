import { useState, useEffect, useRef } from "react";
import { createProject, getProjects, updateProject, deleteProject, createClient } from "../api/api";
import ProjectCard from "../components/ProjectCard";
import EditModal from "../components/EditModal";
import DeleteModal from "../components/DeleteModal";

const IconGrid = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
  </svg>
);
const IconPlus = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const IconLogout = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);
const IconImage = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21 15 16 10 5 21"/>
  </svg>
);
const IconX = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const FIELDS = [
  { label: "Title",       name: "title",    type: "text", placeholder: "My awesome project" },
  { label: "Project URL", name: "link",     type: "url",  placeholder: "github.com/user/project", prefix: "https://" },
  { label: "Category",    name: "category", type: "text", placeholder: "Web, Mobile, Design…" },
];

const Dashboard = ({ user, onLogout, addToast }) => {
  const [projects,      setProjects]      = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [creating,      setCreating]      = useState(false);
  const [editTarget,    setEditTarget]    = useState(null);
  const [editLoading,   setEditLoading]   = useState(false);
  const [deleteTarget,  setDeleteTarget]  = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [imagePreview,  setImagePreview]  = useState(null);
  const [search,        setSearch]        = useState("");
  const [catFilter,     setCatFilter]     = useState("All");
  const [sidebarOpen,   setSidebarOpen]   = useState(false);
  const [clientImage,   setClientImage]   = useState(null);
  const [clientPreview, setClientPreview] = useState(null);
  const [clientLoading, setClientLoading] = useState(false);
  const fileRef = useRef(null);
  const clientFileRef = useRef(null);

  const [form, setForm] = useState({
    title: "", description: "", link: "", category: "", image: null,
  });

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data.projects || data || []);
    } catch { setProjects([]); }
    finally  { setLoading(false); }
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files?.[0]) {
      setForm(f => ({ ...f, image: files[0] }));
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.image) { addToast("Please select an image", "error"); return; }
    setCreating(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => v && fd.append(k, v));
      await createProject(fd);
      addToast("Project created!", "success");
      setForm({ title: "", description: "", link: "", category: "", image: null });
      setImagePreview(null);
      if (fileRef.current) fileRef.current.value = "";
      setSidebarOpen(false);
      fetchProjects();
    } catch (err) {
      addToast(err?.response?.data?.message || "Failed to create project", "error");
    } finally { setCreating(false); }
  };

  const handleClientUpload = async (e) => {
    e.preventDefault();
    if (!clientImage) { addToast("Please select a client image", "error"); return; }
    setClientLoading(true);
    try {
      const fd = new FormData();
      fd.append("image", clientImage);
      await createClient(fd);
      addToast("Client added!", "success");
      setClientImage(null);
      setClientPreview(null);
      if (clientFileRef.current) clientFileRef.current.value = "";
    } catch (err) {
      addToast(err?.response?.data?.message || "Failed to add client", "error");
    } finally { setClientLoading(false); }
  };

  const handleEdit = async (updated) => {
    setEditLoading(true);
    try {
      await updateProject(editTarget._id, updated);
      addToast("Project updated!", "success");
      setEditTarget(null);
      fetchProjects();
    } catch (err) {
      addToast(err?.response?.data?.message || "Failed to update", "error");
    } finally { setEditLoading(false); }
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await deleteProject(deleteTarget._id);
      addToast("Deleted", "success");
      setDeleteTarget(null);
      fetchProjects();
    } catch (err) {
      addToast(err?.response?.data?.message || "Failed to delete", "error");
    } finally { setDeleteLoading(false); }
  };

  const initials = user?.fullname
    ? user.fullname.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
    : "U";

  const categories = ["All", ...new Set(projects.map(p => p.category).filter(Boolean))];
  const filtered   = projects.filter(p => {
    const matchCat    = catFilter === "All" || p.category === catFilter;
    const matchSearch = p.title?.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  // Shared form — rendered in both desktop sidebar and mobile drawer
  const FormContent = (
    <form onSubmit={handleCreate} className="space-y-3.5">
      {FIELDS.map(({ label, name, type, placeholder, prefix }) => (
        <div key={name}>
          <label className="block text-xs font-medium text-zinc-400 mb-1.5 tracking-wide">{label}</label>
          <div className={prefix ? "relative" : undefined}>
            {prefix && (
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-zinc-600 pointer-events-none">
                {prefix}
              </span>
            )}
            <input
              type={type} name={name} value={form[name]} onChange={handleFormChange} required
              placeholder={placeholder}
              className={`w-full ${prefix ? "pl-14" : "px-3.5"} pr-3.5 py-2.5 rounded-xl
                border border-white/[0.08] bg-[#1c2236] text-sm text-zinc-100
                placeholder:text-zinc-600
                focus:outline-none focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/10
                transition-all`}
            />
          </div>
        </div>
      ))}

      <div>
        <label className="block text-xs font-medium text-zinc-400 mb-1.5 tracking-wide">Description</label>
        <textarea
          name="description" value={form.description} onChange={handleFormChange} required
          placeholder="Describe your project…" rows={3}
          className="w-full px-3.5 py-2.5 rounded-xl border border-white/[0.08] bg-[#1c2236]
            text-sm text-zinc-100 placeholder:text-zinc-600 resize-none
            focus:outline-none focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/10 transition-all"
        />
      </div>

      <div className="border-t border-white/[0.06] pt-4">
        <label className="block text-xs font-medium text-zinc-400 mb-2 tracking-wide">Cover image</label>
        {imagePreview ? (
          <div className="relative rounded-xl overflow-hidden aspect-video bg-zinc-900 group">
            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => {
                setImagePreview(null);
                setForm(f => ({ ...f, image: null }));
                if (fileRef.current) fileRef.current.value = "";
              }}
              className="absolute top-2 right-2 w-6 h-6 bg-black/60 rounded-lg flex items-center justify-center
                         text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <IconX />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full aspect-video rounded-xl
            border-2 border-dashed border-white/[0.08] bg-[#1c2236] cursor-pointer
            hover:border-violet-500/40 hover:bg-violet-500/5 transition-all group">
            <span className="text-zinc-600 group-hover:text-violet-400 transition-colors"><IconImage /></span>
            <span className="text-xs text-zinc-500 mt-2">Drop image or click to upload</span>
            <span className="text-[11px] text-zinc-600 mt-0.5">PNG, JPG, WebP · max 5MB</span>
            <input type="file" name="image" accept="image/*" onChange={handleFormChange} ref={fileRef} className="hidden" />
          </label>
        )}
      </div>

      <button
        type="submit" disabled={creating}
        className="w-full mt-1 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 active:scale-[0.98]
          text-white text-sm font-medium transition-all disabled:opacity-50
          flex items-center justify-center gap-2"
      >
        {creating ? (
          <><span className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> Creating…</>
        ) : (
          <><IconPlus size={13} /> Create project</>
        )}
      </button>
    </form>
  );

  const ClientContent = (
    <form onSubmit={handleClientUpload} className="space-y-3.5">
      <div>
        <label className="block text-xs font-medium text-zinc-400 mb-2 tracking-wide">Client Logo/Image</label>
        {clientPreview ? (
          <div className="relative rounded-xl overflow-hidden aspect-video bg-zinc-900 group border border-white/[0.08]">
            <img src={clientPreview} alt="Preview" className="w-full h-full object-contain p-2" />
            <button
              type="button"
              onClick={() => {
                setClientPreview(null);
                setClientImage(null);
                if (clientFileRef.current) clientFileRef.current.value = "";
              }}
              className="absolute top-2 right-2 w-6 h-6 bg-black/60 rounded-lg flex items-center justify-center text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <IconX />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full aspect-video rounded-xl border-2 border-dashed border-white/[0.08] bg-[#1c2236] cursor-pointer hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all group">
            <span className="text-zinc-600 group-hover:text-emerald-400 transition-colors"><IconImage /></span>
            <span className="text-xs text-zinc-500 mt-2">Drop image or click to upload</span>
            <span className="text-[11px] text-zinc-600 mt-0.5">PNG, JPG, WebP</span>
            <input type="file" accept="image/*" onChange={(e) => {
              if (e.target.files?.[0]) {
                setClientImage(e.target.files[0]);
                setClientPreview(URL.createObjectURL(e.target.files[0]));
              }
            }} ref={clientFileRef} className="hidden" />
          </label>
        )}
      </div>
      <button
        type="submit" disabled={clientLoading}
        className="w-full mt-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white text-sm font-medium transition-all disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {clientLoading ? (
          <><span className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> Uploading…</>
        ) : (
          <><IconPlus size={13} /> Upload client</>
        )}
      </button>
    </form>
  );

  return (
    // Root: full viewport height, no overflow — children manage their own scroll
    <div className="h-screen overflow-hidden bg-[#0f1117] text-zinc-100 flex flex-col">

      {/* ── Navbar — never scrolls, always visible ── */}
      <header className="flex-shrink-0 bg-[#161b27] border-b border-white/[0.07] z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-[52px] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-violet-700 flex items-center justify-center">
              <IconGrid />
            </div>
            <span className="text-sm font-medium tracking-wide text-white">Admin Panel</span>
            
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile "Add project" button — opens bottom drawer */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500
                text-white text-xs font-medium transition-all"
            >
              <IconPlus size={11} />
              <span>Add</span>
            </button>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#1c2236] border border-white/[0.08]">
              <div className="w-6 h-6 rounded-full bg-violet-700 flex items-center justify-center text-[10px] font-medium text-violet-100">
                {initials}
              </div>
              <span className="text-sm text-zinc-300 hidden sm:block">{user?.fullname || user?.email}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>

            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/[0.08] text-xs text-zinc-400
                         hover:text-red-300 hover:border-red-500/30 hover:bg-red-500/10 transition-all"
            >
              <IconLogout />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Two-column body — fills remaining height ── */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full max-w-6xl mx-auto px-4 sm:px-6 flex gap-5">

          {/* ── Left sidebar — desktop only, scrolls independently ── */}
          <aside className="hidden lg:block w-[300px] flex-shrink-0 overflow-y-auto py-6
            [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.08)_transparent]">
            <div className="bg-[#161b27] border border-white/[0.07] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-6 h-6 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                  <IconPlus />
                </div>
                <span className="text-sm font-medium text-white">Add new project</span>
              </div>
              {FormContent}
            </div>

            <div className="bg-[#161b27] border border-white/[0.07] rounded-2xl p-5 mt-5">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <IconPlus />
                </div>
                <span className="text-sm font-medium text-white">Add new client</span>
              </div>
              {ClientContent}
            </div>
          </aside>

          {/* ── Right main — scrolls independently ── */}
          <main className="flex-1 min-w-0 overflow-y-auto py-6
            [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.08)_transparent]">

            {/* Page heading */}
            <div className="mb-5">
              <h1 className="text-xl font-medium text-white">Projects</h1>
              <p className="text-sm text-zinc-400 mt-0.5">Manage and publish your portfolio work</p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { label: "Total",      value: projects.length,                                                                         accent: "border-l-violet-500", num: "text-violet-300" },
                { label: "Categories", value: new Set(projects.map(p => p.category)).size,                                             accent: "border-l-teal-500",   num: "text-teal-300"   },
                { label: "This month", value: projects.filter(p => new Date(p.createdAt) > new Date(Date.now() - 30*86400000)).length, accent: "border-l-amber-500",  num: "text-amber-300"  },
               
              ].map(({ label, value, accent, num }) => (
                <div key={label} className={`bg-[#161b27] border border-white/[0.07] border-l-2 ${accent} rounded-xl px-4 py-3.5`}>
                  <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">{label}</p>
                  <p className={`text-3xl font-medium leading-none ${num}`}>{value}</p>
                </div>
              ))}
            </div>

            {/* Toolbar */}
            <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
              <div className="flex items-center gap-2.5">
                <span className="text-sm font-medium text-white">All projects</span>
                <span className="text-xs font-medium bg-[#1c2236] text-zinc-400 border border-white/[0.08] px-2.5 py-0.5 rounded-lg">
                  {filtered.length}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search…"
                  className="px-3 py-2 rounded-xl border border-white/[0.08] bg-[#1c2236] text-sm text-zinc-200
                    placeholder:text-zinc-600 w-32 sm:w-40 focus:outline-none focus:border-violet-500/50 transition-all"
                />
                <select
                  value={catFilter} onChange={e => setCatFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-white/[0.08] bg-[#1c2236] text-sm text-zinc-300
                    focus:outline-none focus:border-violet-500/50 transition-all"
                >
                  {categories.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {/* Project grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="bg-[#161b27] border border-white/[0.07] rounded-2xl overflow-hidden animate-pulse">
                    <div className="aspect-video bg-white/[0.04]" />
                    <div className="p-4 space-y-2">
                      <div className="h-3 bg-white/[0.05] rounded-lg w-3/4" />
                      <div className="h-2.5 bg-white/[0.04] rounded-lg w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="bg-[#161b27] border border-white/[0.07] rounded-2xl py-16
                flex flex-col items-center justify-center text-center">
                <div className="w-10 h-10 rounded-xl bg-[#1c2236] flex items-center justify-center text-zinc-600 mb-3">
                  <IconGrid />
                </div>
                <p className="text-sm font-medium text-zinc-400">No projects found</p>
                <p className="text-xs text-zinc-600 mt-1">
                  {search ? "Try a different search term" : "Create your first project using the form"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6">
                {filtered.map(p => (
                  <ProjectCard key={p._id} project={p} onEdit={setEditTarget} onDelete={setDeleteTarget} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ── Mobile bottom drawer ── */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setSidebarOpen(false)}
          />
          {/* Panel */}
          <div className="relative bg-[#161b27] border-t border-white/[0.08] rounded-t-2xl
            max-h-[90vh] overflow-y-auto z-10
            [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.08)_transparent]">
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1 sticky top-0 bg-[#161b27]">
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </div>
            <div className="px-5 pb-10 pt-3">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                    <IconPlus />
                  </div>
                  <span className="text-sm font-medium text-white">Add new project</span>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="w-7 h-7 rounded-lg bg-white/[0.05] flex items-center justify-center
                    text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  <IconX />
                </button>
              </div>
              {FormContent}

              <div className="w-full h-px bg-white/[0.08] my-8" />

              <div className="flex items-center gap-2 mb-5">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <IconPlus />
                </div>
                <span className="text-sm font-medium text-white">Add new client</span>
              </div>
              {ClientContent}
            </div>
          </div>
        </div>
      )}

      {editTarget && (
        <EditModal project={editTarget} onSave={handleEdit} onCancel={() => setEditTarget(null)} loading={editLoading} />
      )}
      {deleteTarget && (
        <DeleteModal project={deleteTarget} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} loading={deleteLoading} />
      )}
    </div>
  );
};

export default Dashboard;