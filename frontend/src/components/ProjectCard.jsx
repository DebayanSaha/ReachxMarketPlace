import { IconImage, IconEdit, IconTrash } from "./Icons";

const ProjectCard = ({ project, onEdit, onDelete }) => (
  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md hover:border-gray-200 transition-all duration-200 group">
    <div className="aspect-video bg-gradient-to-br from-blue-50 to-slate-100 relative overflow-hidden">
      {project.image ? (
        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <IconImage />
        </div>
      )}
      <div className="absolute top-2.5 right-2.5">
        <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-blue-600 rounded-lg border border-blue-100">
          {project.category}
        </span>
      </div>
    </div>
    <div className="p-4">
      <h3 className="font-semibold text-gray-900 text-sm mb-1 truncate">{project.title}</h3>
      <p className="text-xs text-gray-400 truncate mb-3">{project.description}</p>
      {project.link && (
        <a href={project.link} target="_blank" rel="noreferrer" className="text-xs text-blue-500 hover:text-blue-600 truncate block mb-3 transition-colors">
          {project.link}
        </a>
      )}
      <div className="flex gap-2 pt-2 border-t border-gray-50">
        <button
          onClick={() => onEdit(project)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-blue-600 hover:bg-blue-50 transition-colors border border-blue-100"
        >
          <IconEdit /> Edit
        </button>
        <button
          onClick={() => onDelete(project)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-500 hover:bg-red-50 transition-colors border border-red-100"
        >
          <IconTrash /> Delete
        </button>
      </div>
    </div>
  </div>
);

export default ProjectCard;