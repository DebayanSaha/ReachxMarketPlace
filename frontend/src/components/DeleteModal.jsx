import { IconTrash } from "./Icons";

const DeleteModal = ({ project, onConfirm, onCancel, loading }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
    <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm mx-4 border border-gray-100">
      <div className="w-11 h-11 bg-red-50 rounded-xl flex items-center justify-center mb-4">
        <IconTrash />
      </div>
      <h3 className="text-base font-semibold text-gray-900 mb-1">Delete Project</h3>
      <p className="text-sm text-gray-500 mb-5">
        Are you sure you want to delete <span className="font-medium text-gray-700">"{project?.title}"</span>? This action cannot be undone.
      </p>
      <div className="flex gap-2.5">
        <button onClick={onCancel} className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button onClick={onConfirm} disabled={loading} className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-60">
          {loading ? "Deleting…" : "Delete"}
        </button>
      </div>
    </div>
  </div>
);

export default DeleteModal;