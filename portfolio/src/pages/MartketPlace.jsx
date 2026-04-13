import React, { useState, useEffect } from "react";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://reachxmarketplace.onrender.com";

const getProjects = async () => {
  const res = await fetch(`${BASE_URL}/project`);
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
};

// ─── Modal ────────────────────────────────────────────────────────────────────
const ProjectModal = ({ project, onClose }) => {
  const [imgError, setImgError] = useState(false);

  // Close on backdrop click
  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      onClick={handleBackdrop}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        animation: "fadeIn 0.2s ease",
      }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div
        style={{
          width: "100%",
          maxWidth: "560px",
          borderRadius: "28px",
          overflow: "hidden",
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.4)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.3)",
          animation: "slideUp 0.25s ease",
        }}
      >
        {/* Modal Image */}
        <div style={{ position: "relative", height: "240px", overflow: "hidden", background: "rgba(186,230,253,0.3)" }}>
          {project.image && !imgError ? (
            <>
              <img
                src={project.image}
                alt={project.title}
                onError={() => setImgError(true)}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 60%)" }} />
            </>
          ) : (
            <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px" }}>
              <span style={{ fontSize: "3rem", opacity: 0.15 }}>🖼</span>
              <span style={{ fontSize: "11px", color: "rgba(0,0,0,0.3)", textTransform: "uppercase", letterSpacing: "0.1em" }}>No Preview</span>
            </div>
          )}

          {/* Category badge */}
          {project.category && (
            <div style={{ position: "absolute", top: "14px", left: "14px" }}>
              <span style={{
                fontSize: "10px", fontWeight: 600, textTransform: "uppercase",
                letterSpacing: "0.1em", padding: "4px 12px", borderRadius: "999px",
                background: "rgba(0,0,0,0.3)", backdropFilter: "blur(8px)",
                color: "rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.2)",
              }}>
                {project.category}
              </span>
            </div>
          )}

          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: "absolute", top: "14px", right: "14px",
              width: "32px", height: "32px", borderRadius: "50%",
              background: "rgba(0,0,0,0.35)", backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.2)", color: "white",
              fontSize: "16px", cursor: "pointer", display: "flex",
              alignItems: "center", justifyContent: "center",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(0,0,0,0.6)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "rgba(0,0,0,0.35)"}
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 md:p-7 md:pb-6">
          <h2
            className="font-[font3]"
            style={{ fontSize: "22px", fontWeight: 700, color: "#0c1a2e", letterSpacing: "-0.02em", marginBottom: "10px" }}
          >
            {project.title}
          </h2>

          <p
            className="font-[font3]"
            style={{ fontSize: "14px", color: "rgba(12,26,46,0.65)", lineHeight: "1.75", marginBottom: "24px" }}
          >
            {project.description}
          </p>

          {/* Divider */}
          <div style={{ height: "1px", background: "rgba(0,0,0,0.07)", marginBottom: "20px" }} />

          {/* Footer */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span
              className="font-[font3]"
              style={{ fontSize: "12px", color: "rgba(12,26,46,0.35)", textTransform: "uppercase", letterSpacing: "0.08em" }}
            >
              {project.category}
            </span>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <a
                href={`https://wa.me/918617262208?text=${encodeURIComponent(`hey I want to know more info about this\n\nPost Title: ${project.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-[font3]"
                style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  padding: "10px 22px", borderRadius: "999px",
                  background: "linear-gradient(135deg, #10b981, #047857)",
                  color: "white", fontSize: "13px", fontWeight: 600,
                  textDecoration: "none", letterSpacing: "0.02em",
                  boxShadow: "0 4px 14px rgba(16,185,129,0.35)",
                  transition: "opacity 0.2s ease",
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = "0.85"}
                onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
              >
                <i className="ri-whatsapp-line" style={{ fontSize: "14px" }} />
                Contact Us
              </a>
              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-[font3]"
                  style={{
                    display: "flex", alignItems: "center", gap: "8px",
                    padding: "10px 22px", borderRadius: "999px",
                    background: "linear-gradient(135deg, #0ea5e9, #0369a1)",
                    color: "white", fontSize: "13px", fontWeight: 600,
                    textDecoration: "none", letterSpacing: "0.02em",
                    boxShadow: "0 4px 14px rgba(14,165,233,0.35)",
                    transition: "opacity 0.2s ease",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = "0.85"}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
                >
                  <i className="ri-links-line" style={{ fontSize: "14px" }} />
                  View Project
                </a>
              ) : (
                <span
                  className="font-[font3]"
                  style={{ fontSize: "12px", color: "rgba(12,26,46,0.3)", textTransform: "uppercase", letterSpacing: "0.08em" }}
                >
                  No link available
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Card ─────────────────────────────────────────────────────────────────────
const ProjectCard = ({ project, onExpand }) => {
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        transform: hovered ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
        boxShadow: hovered
          ? "0 24px 48px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,255,255,0.4)"
          : "0 4px 24px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.2)",
      }}
      className="min-w-[85vw] max-w-[85vw] md:min-w-75 md:max-w-75 flex-0 rounded-3xl overflow-hidden bg-white backdrop-blur-xl border border-white/25"
    >
      {/* Image */}
      <div className="relative h-45 w-full overflow-hidden bg-white/10">
        {project.image && !imgError ? (
          <>
            <img
              src={project.image}
              alt={project.title}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
              style={{
                transition: "transform 0.5s ease",
                transform: hovered ? "scale(1.08)" : "scale(1)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <span className="text-5xl opacity-20">🖼</span>
            <span className="text-xs text-white/30 tracking-widest uppercase">No Preview</span>
          </div>
        )}

        {project.category && (
          <div className="absolute top-3 left-3">
            <span className="text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full bg-black/30 backdrop-blur-md text-white/80 border border-white/20">
              {project.category}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3">
        <div>
          <h3
            className="font-bold text-base text-blue-950 leading-tight font-[font3] truncate"
            style={{ letterSpacing: "-0.01em" }}
          >
            {project.title}
          </h3>
          <p className="text-xs text-blue-950/66 mt-1.5 leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>

        <div className="h-px w-full bg-black/5" />

        {/* Footer */}
        <div className="flex items-center justify-between">
          {/* View More button */}
          <button
            onClick={() => onExpand(project)}
            className="font-[font3]"
            style={{
              fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em",
              color: "rgba(12,26,46,0.45)", background: "none", border: "none",
              cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: "4px",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = "rgba(12,26,46,0.8)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "rgba(12,26,46,0.45)"}
          >
            <i className="ri-expand-diagonal-line" style={{ fontSize: "12px" }} />
            More
          </button>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/918617262208?text=${encodeURIComponent(`hey I want to know more info about this\n\nPost Title: ${project.title}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[11px] font-[font3] uppercase text-emerald-600 hover:text-emerald-700 transition-colors duration-200 group"
            >
              Contact Us
              <span className="w-5 h-5 rounded-full border border-emerald-600/20 flex items-center justify-center text-[10px] transition-transform duration-200 group-hover:scale-110">
                <i className="ri-whatsapp-line"></i>
              </span>
            </a>
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[11px] font-[font3] uppercase text-blue-950 hover:text-blue-800 transition-colors duration-200 group"
              >
                View
                <span className="w-5 h-5 rounded-full border border-black/10 flex items-center justify-center text-[10px] transition-transform duration-200 group-hover:translate-x-1">
                  <i className="ri-links-line"></i>
                </span>
              </a>
            ) : (
              <span className="text-[11px] text-black/20 uppercase tracking-wide font-[font3]">
                No link
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main ─────────────────────────────────────────────────────────────────────
const MartketPlace = () => {
  const [selected, setSelected] = useState("All");
  const [search, setSearch] = useState("");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    getProjects()
      .then((data) => setProjects(data.projects || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = projects.filter((p) => {
    const matchesCategory =
  selected === "All" ||
  (p.category && p.category.toLowerCase() === selected.toLowerCase());
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [...new Set(projects.map((p) => p.category).filter(Boolean))];
  const filters = ["All", ...categories];
  const visibleCategories =
    selected === "All" ? categories : categories.filter((c) => c === selected);

  return (
    <div className="relative min-h-screen p-4 bg-linear-to-b from-white via-sky-300 to-sky-400">
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      
      {/* Modal */}
      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}

      {/* Header */}
      <div className="w-full p-4 flex flex-col gap-2 items-center justify-center py-8 md:py-12 mt-8 md:mt-0">
        <h2 className="bg-black/10 py-2 px-4 rounded-full font-[font3]">Portfolio</h2>
        <h1 className="text-center font-[font3] text-5xl md:text-9xl font-bold leading-[1.1] md:leading-[0.8] mt-2 md:mt-0">
          All our team's work <br className="hidden md:block" /> in one place.
        </h1>
      </div>

      {/* Search + Filter */}
      <div className="relative w-full h-auto md:h-16 flex items-center justify-center mt-2 md:mt-0">
        <div className="mt-2 md:mt-8 py-3 md:py-0 h-auto md:h-full w-[95%] md:w-[60%] flex flex-col md:flex-row items-center justify-between px-4 md:px-6 gap-3 md:gap-0 rounded-3xl md:rounded-full backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg">
          <div className="flex items-center gap-3 px-4 md:px-5 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 w-full md:w-100">
            <i className="ri-search-line text-lg text-zinc-500" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-sm text-white placeholder-zinc-800 w-full"
            />
          </div>
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="px-4 py-2 w-full md:w-auto rounded-full bg-white/20 text-zinc-500 border border-white/30 backdrop-blur-md outline-none text-center md:text-left"
          >
            {filters.map((filter) => (
              <option key={filter} value={filter} className="text-black">{filter}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Cards Area */}
      <div className="relative rounded-3xl mt-8 md:mt-10 border border-sky-300 shadow-lg p-4 md:p-6 flex flex-col gap-8 md:gap-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white/80" style={{ animation: "spin 0.8s linear infinite" }} />
            <p className="text-black/50 text-lg font-[font1] tracking-widest uppercase">Loading...</p>
          </div>
        ) : error ? (
          <p className="text-center text-red-300 py-10">Error: {error}</p>
        ) : visibleCategories.length === 0 ? (
          <p className="text-center text-black/50 py-10 font-[font1] tracking-widest uppercase text-lg">No projects found</p>
        ) : (
          visibleCategories.map((category) => {
            const categoryProjects = filtered.filter((p) => p.category === category);
            if (categoryProjects.length === 0) return null;

            return (
              <div key={category}>
                <div className="flex items-center gap-3 mb-5">
                  <span className="bg-black/10 py-2 px-5 rounded-full font-[font3] text-sm font-bold">{category}</span>
                  <div className="flex-1 h-px bg-zinc-600/50" />
                  <span className="text-xs text-blue-900 font-[font3] uppercase">
                    {categoryProjects.length} project{categoryProjects.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex gap-5 overflow-x-auto pb-4" style={{ scrollbarWidth: "none" }}>
                  {categoryProjects.map((project) => (
                    <ProjectCard key={project._id} project={project} onExpand={setActiveProject} />
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MartketPlace;