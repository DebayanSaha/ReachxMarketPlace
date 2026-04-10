import { useState } from "react";
import { IconX } from "./Icons";

const EditModal = ({ project, onSave, onCancel, loading }) => {
  const [form, setForm] = useState({
    title: project.title || "",
    description: project.description || "",
    link: project.link || "",
    category: project.category || "",
  });

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm overflow-y-auto py-8">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg mx-4 border border-gray-100">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-semibold text-gray-900">Edit Project</h3>
          <button onClick={onCancel} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 transition-colors">
            <IconX />
          </button>
        </div>
        <div className="space-y-3.5">
          {[
            { label: "Title", name: "title", type: "text" },
            { label: "Link", name: "link", type: "url" },
            { label: "Category", name: "category", type: "text" },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">{label}</label>
              <input
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all bg-gray-50/50"
              />
            </div>
          ))}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all bg-gray-50/50 resize-none"
            />
          </div>
        </div>
        <div className="flex gap-2.5 mt-5">
          <button onClick={onCancel} className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button onClick={() => onSave(form)} disabled={loading} className="flex-1 px-4 py-2.5 rounded-xl bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
            {loading ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;