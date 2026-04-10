import { useState, useEffect, useRef } from "react";
import { createProject, getProjects, updateProject, deleteProject } from "../api/api";
import { IconLogout, IconPlus, IconImage, IconX, IconFolder } from "../components/Icons";
import ProjectCard from "../components/ProjectCard";
import EditModal from "../components/EditModal";
import DeleteModal from "../components/DeleteModal";

const Dashboard = ({ user, onLogout, addToast }) => {
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [creating, setCreating] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const fileRef = useRef(null);

  const [form, setForm] = useState({
    title: "", description: "", link: "", category: "", image: null,
  });

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data.projects || data || []);
    } catch {
      setProjects([]);
    } finally {
      setLoadingProjects(false);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files?.[0]) {
      setForm((f) => ({ ...f, image: files[0] }));
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.image) { addToast("Please select an image", "error"); return; }
    setCreating(true);
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("description", form.description);
      fd.append("link", form.link);
      fd.append("category", form.category);
      fd.append("image", form.image);
      await createProject(fd);
      addToast("Project created!", "success");
      setForm({ title: "", description: "", link: "", category: "", image: null });
      setImagePreview(null);
      if (fileRef.current) fileRef.current.value = "";
      fetchProjects();
    } catch (err) {
      addToast(err?.response?.data?.message || "Failed to create project", "error");
    } finally {
      setCreating(false);
    }
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
    } finally {
      setEditLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await deleteProject(deleteTarget._id);
      addToast("Project deleted", "success");
      setDeleteTarget(null);
      fetchProjects();
    } catch (err) {
      addToast(err?.response?.data?.message || "Failed to delete", "error");
    } finally {
      setDeleteLoading(false);
    }
  };

  const initials = user?.fullname
    ? user.fullname.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "U";

  return (
    <div className="min-h-screen bg-gray-50/60">
      {/* Navbar */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
              </svg>
            </div>
            <span className="text-sm font-bold text-gray-900 tracking-tight">ProjectHub</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-100">
              <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center">
                <span className="text-xs font-bold text-blue-600">{initials}</span>
              </div>
              <span className="text-xs font-medium text-gray-600 hidden sm:block">{user?.fullname || user?.email}</span>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-500 hover:bg-gray-50 hover:text-red-500 hover:border-red-100 transition-all"
            >
              <IconLogout /> <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: "Total Projects", value: projects.length },
            { label: "Categories", value: [...new Set(projects.map((p) => p.category))].length },
            { label: "This Month", value: projects.filter((p) => new Date(p.createdAt) > new Date(Date.now() - 30 * 86400000)).length },
            { label: "Active", value: projects.length },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 p-4">
              <p className="text-xs text-gray-400 mb-1">{label}</p>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Create Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-20">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center">
                  <IconPlus />
                </div>
                <h2 className="text-sm font-semibold text-gray-900">New Project</h2>
              </div>
              <form onSubmit={handleCreate} className="space-y-3.5">
                {[
                  { label: "Title", name: "title", type: "text", placeholder: "My awesome project" },
                  { label: "Project Link", name: "link", type: "url", placeholder: "https://github.com/…" },
                  { label: "Category", name: "category", type: "text", placeholder: "Web, Mobile, Design…" },
                ].map(({ label, name, type, placeholder }) => (
                  <div key={name}>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">{label}</label>
                    <input
                      type={type} name={name} value={form[name]} onChange={handleFormChange} required
                      placeholder={placeholder}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all placeholder:text-gray-300 bg-gray-50/30"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Description</label>
                  <textarea
                    name="description" value={form.description} onChange={handleFormChange} required
                    placeholder="Describe your project…" rows={3}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all placeholder:text-gray-300 bg-gray-50/30 resize-none"
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Cover Image</label>
                  {imagePreview ? (
                    <div className="relative rounded-xl overflow-hidden aspect-video bg-gray-100 group">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => { setImagePreview(null); setForm((f) => ({ ...f, image: null })); if (fileRef.current) fileRef.current.value = ""; }}
                        className="absolute top-2 right-2 w-6 h-6 bg-black/50 rounded-lg flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <IconX />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full aspect-video rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition-all">
                      <IconImage />
                      <span className="text-xs text-gray-400 mt-2">Click to upload image</span>
                      <input type="file" name="image" accept="image/*" onChange={handleFormChange} ref={fileRef} className="hidden" />
                    </label>
                  )}
                </div>

                <button
                  type="submit" disabled={creating}
                  className="w-full py-2.5 rounded-xl bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600 active:scale-[0.98] transition-all disabled:opacity-60 flex items-center justify-center gap-2 mt-1"
                >
                  {creating ? (
                    <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Creating…</>
                  ) : (
                    <><IconPlus /> Create Project</>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Project List */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-900">Projects</h2>
              <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-lg font-medium">{projects.length} total</span>
            </div>

            {loadingProjects ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
                    <div className="aspect-video bg-gray-100" />
                    <div className="p-4 space-y-2">
                      <div className="h-3 bg-gray-100 rounded-lg w-3/4" />
                      <div className="h-2.5 bg-gray-100 rounded-lg w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : projects.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 py-16 flex flex-col items-center justify-center text-center">
                <IconFolder />
                <p className="text-sm font-medium text-gray-400 mt-3">No projects yet</p>
                <p className="text-xs text-gray-300 mt-1">Create your first project using the form</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projects.map((p) => (
                  <ProjectCard key={p._id} project={p} onEdit={setEditTarget} onDelete={setDeleteTarget} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

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