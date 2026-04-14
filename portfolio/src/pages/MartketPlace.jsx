import React, { useState, useEffect, useRef } from "react";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://reachxmarketplace.onrender.com";

const getProjects = async () => {
  const res = await fetch(`${BASE_URL}/project`);
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
};

// ─── Industries Data ──────────────────────────────────────────────────────────
const INDUSTRIES = [
  { name: "Agro Product Websites",            icon: "ri-plant-line",           color: "#16a34a", grad: "linear-gradient(135deg,#22c55e,#16a34a)" },
  { name: "Astrology Websites",               icon: "ri-moon-line",            color: "#7c3aed", grad: "linear-gradient(135deg,#a78bfa,#7c3aed)" },
  { name: "Bank Websites",                    icon: "ri-bank-line",            color: "#b45309", grad: "linear-gradient(135deg,#fbbf24,#b45309)" },
  { name: "Classified Websites",              icon: "ri-megaphone-line",       color: "#1d4ed8", grad: "linear-gradient(135deg,#60a5fa,#1d4ed8)" },
  { name: "College and University Websites",  icon: "ri-graduation-cap-line",  color: "#0369a1", grad: "linear-gradient(135deg,#38bdf8,#0369a1)" },
  { name: "Computer and Telecom Websites",    icon: "ri-wifi-line",            color: "#0e7490", grad: "linear-gradient(135deg,#22d3ee,#0e7490)" },
  { name: "E-commerce Websites",              icon: "ri-shopping-cart-line",   color: "#047857", grad: "linear-gradient(135deg,#34d399,#047857)" },
  { name: "Education Websites",               icon: "ri-book-2-line",          color: "#b91c1c", grad: "linear-gradient(135deg,#f87171,#b91c1c)" },
  { name: "Event Management Websites",        icon: "ri-calendar-event-line",  color: "#c2410c", grad: "linear-gradient(135deg,#fb923c,#c2410c)" },
  { name: "Fashion Websites",                 icon: "ri-scissors-cut-line",    color: "#be185d", grad: "linear-gradient(135deg,#f472b6,#be185d)" },
  { name: "Food and Drinks Websites",         icon: "ri-restaurant-2-line",    color: "#a16207", grad: "linear-gradient(135deg,#facc15,#a16207)" },
  { name: "Government Websites",              icon: "ri-government-line",      color: "#44403c", grad: "linear-gradient(135deg,#a8a29e,#44403c)" },
  { name: "Hospital/Pharma Websites",         icon: "ri-hospital-line",        color: "#1e40af", grad: "linear-gradient(135deg,#93c5fd,#1e40af)" },
  { name: "Hotel Websites",                   icon: "ri-hotel-line",           color: "#6d28d9", grad: "linear-gradient(135deg,#c4b5fd,#6d28d9)" },
  { name: "Import Export Websites",           icon: "ri-ship-line",            color: "#075985", grad: "linear-gradient(135deg,#7dd3fc,#075985)" },
  { name: "Industrial Websites",              icon: "ri-building-4-line",      color: "#374151", grad: "linear-gradient(135deg,#9ca3af,#374151)" },
  { name: "Interior Design Websites",         icon: "ri-layout-masonry-line",  color: "#92400e", grad: "linear-gradient(135deg,#fcd34d,#92400e)" },
  { name: "Laundry Service Websites",         icon: "ri-drop-line",            color: "#0284c7", grad: "linear-gradient(135deg,#7dd3fc,#0284c7)" },
  { name: "Legal Websites",                   icon: "ri-scales-3-line",        color: "#1f2937", grad: "linear-gradient(135deg,#6b7280,#1f2937)" },
  { name: "Magazine Websites",                icon: "ri-newspaper-line",       color: "#4338ca", grad: "linear-gradient(135deg,#a5b4fc,#4338ca)" },
  { name: "News Websites",                    icon: "ri-broadcast-line",       color: "#dc2626", grad: "linear-gradient(135deg,#fca5a5,#dc2626)" },
  { name: "NGO Websites",                     icon: "ri-team-line",            color: "#15803d", grad: "linear-gradient(135deg,#86efac,#15803d)" },
  { name: "Personal Websites",                icon: "ri-user-3-line",          color: "#7c3aed", grad: "linear-gradient(135deg,#c4b5fd,#7c3aed)" },
  { name: "Photography Websites",             icon: "ri-camera-3-line",        color: "#1e293b", grad: "linear-gradient(135deg,#94a3b8,#1e293b)" },
  { name: "Product Websites",                 icon: "ri-shopping-bag-3-line",  color: "#ea580c", grad: "linear-gradient(135deg,#fdba74,#ea580c)" },
  { name: "Real Estate Websites",             icon: "ri-home-4-line",          color: "#1d4ed8", grad: "linear-gradient(135deg,#93c5fd,#1d4ed8)" },
  { name: "School Websites",                  icon: "ri-school-line",          color: "#0369a1", grad: "linear-gradient(135deg,#38bdf8,#0369a1)" },
  { name: "Share Related Websites",           icon: "ri-stock-line",           color: "#166534", grad: "linear-gradient(135deg,#4ade80,#166534)" },
  { name: "Solar System Websites",            icon: "ri-sun-line",             color: "#b45309", grad: "linear-gradient(135deg,#fde68a,#b45309)" },
  { name: "Special Activity Websites",        icon: "ri-basketball-line",      color: "#15803d", grad: "linear-gradient(135deg,#86efac,#15803d)" },
  { name: "Spiritual and Meditation Websites",icon: "ri-mental-health-line",   color: "#9333ea", grad: "linear-gradient(135deg,#e879f9,#9333ea)" },
  { name: "Technical Support",                icon: "ri-customer-service-2-line",color:"#0f766e",grad: "linear-gradient(135deg,#2dd4bf,#0f766e)" },
  { name: "Training & Job Consultancy",       icon: "ri-briefcase-4-line",     color: "#991b1b", grad: "linear-gradient(135deg,#fca5a5,#991b1b)" },
  { name: "Transport and Logistic Websites",  icon: "ri-truck-line",           color: "#1e40af", grad: "linear-gradient(135deg,#93c5fd,#1e40af)" },
  { name: "Travel And Tourism Websites",      icon: "ri-plane-line",           color: "#0c4a6e", grad: "linear-gradient(135deg,#7dd3fc,#0c4a6e)" },
  { name: "Other Websites",                   icon: "ri-apps-2-line",          color: "#5b21b6", grad: "linear-gradient(135deg,#a78bfa,#5b21b6)" },
];

// ─── Industries Modal ─────────────────────────────────────────────────────────
const IndustriesModal = ({ onClose }) => {
  const backdropRef = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleBackdrop = (e) => {
    if (e.target === backdropRef.current) onClose();
  };

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdrop}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9998,
        background: "rgba(0,0,0,0.45)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        animation: "fadeIn 0.2s ease",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "780px",
          maxHeight: "88vh",
          borderRadius: "24px",
          background: "#ffffff",
          boxShadow: "0 32px 80px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.06)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          animation: "slideUp 0.28s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "28px 28px 20px",
            borderBottom: "1px solid rgba(0,0,0,0.07)",
            flexShrink: 0,
            background: "#fff",
            position: "sticky",
            top: 0,
            zIndex: 2,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <div>
            <h2
              className="font-[font3]"
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#0c1a2e",
                letterSpacing: "-0.02em",
                marginBottom: "4px",
              }}
            >
              Industries We Work For
            </h2>
            <p
              className="font-[font3]"
              style={{ fontSize: "12px", color: "rgba(12,26,46,0.45)", lineHeight: 1.5 }}
            >
              Industry-Specific Solutions for Your Business &mdash; From Startups to Enterprises: We work for All
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              flexShrink: 0,
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              border: "1px solid rgba(0,0,0,0.1)",
              background: "rgba(0,0,0,0.04)",
              color: "#0c1a2e",
              fontSize: "15px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(0,0,0,0.1)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "rgba(0,0,0,0.04)"}
          >
            ✕
          </button>
        </div>

        {/* Scrollable Grid */}
        <div
          style={{
            overflowY: "auto",
            padding: "20px 24px 28px",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "12px",
          }}
          className="industries-grid"
        >
          <style>{`
            .industries-grid::-webkit-scrollbar { width: 4px; }
            .industries-grid::-webkit-scrollbar-track { background: transparent; }
            .industries-grid::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.12); border-radius: 4px; }
            @media (max-width: 600px) {
              .industries-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
            @media (min-width: 601px) and (max-width: 768px) {
              .industries-grid { grid-template-columns: repeat(3, 1fr) !important; }
            }
            .industry-card { cursor: default; transition: border-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease; }
            .industry-card:hover { box-shadow: 0 4px 14px rgba(0,0,0,0.08) !important; transform: translateY(-2px) !important; border-color: rgba(0,0,0,0.13) !important; }
            .industry-card:hover .industry-name { color: #0c1a2e !important; }
            .industry-icon-circle { transition: transform 0.18s ease; }
            .industry-card:hover .industry-icon-circle { transform: scale(1.06); }
          `}</style>
          {INDUSTRIES.map((ind) => (
            <div
              key={ind.name}
              className="industry-card"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                padding: "18px 10px 14px",
                borderRadius: "14px",
                border: "1px solid rgba(0,0,0,0.07)",
                background: "#ffffff",
              }}
            >
              {/* Colorful circular icon */}
              <div
                className="industry-icon-circle"
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: ind.grad,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <i
                  className={`${ind.icon} industry-icon`}
                  style={{ fontSize: "24px", color: "#ffffff", lineHeight: 1 }}
                />
              </div>
              <span
                className="industry-name font-[font3]"
                style={{
                  fontSize: "10px",
                  color: "rgba(12,26,46,0.55)",
                  textAlign: "center",
                  lineHeight: 1.4,
                  transition: "color 0.22s ease",
                }}
              >
                {ind.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
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
              style={{ fontSize: "14px", color: "rgba(12,26,46,0.35)", textTransform: "uppercase", letterSpacing: "0.08em" }}
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
            <span className="text-[14px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full bg-black/30 backdrop-blur-md text-white/80 border border-white/20">
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
              href={`https://wa.me/919123855424?text=${encodeURIComponent(`Hey I want to know more info about this\n\nPost Title: ${project.title}`)}`}
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
  const [showIndustries, setShowIndustries] = useState(false);

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
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(28px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>

      {/* Project Modal */}
      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}

      {/* Industries Modal */}
      {showIndustries && (
        <IndustriesModal onClose={() => setShowIndustries(false)} />
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
          <div className="flex items-center gap-2 w-full md:w-auto">
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className="px-4 py-2 flex-1 md:flex-none md:w-auto rounded-full bg-white/20 text-zinc-500 border border-white/30 backdrop-blur-md outline-none text-center md:text-left"
            >
              {filters.map((filter) => (
                <option key={filter} value={filter} className="text-black">{filter}</option>
              ))}
            </select>
            <button
              onClick={() => setShowIndustries(true)}
              className="font-[font3]"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.25)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.35)",
                color: "#3f3f46",
                fontSize: "13px",
                fontWeight: 500,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "background 0.2s ease, box-shadow 0.2s ease",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.45)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.25)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
              }}
            >
              <i className="ri-layout-grid-line" style={{ fontSize: "14px" }} />
              Industries We Serve
            </button>
          </div>
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
                  <span className="bg-black/10 py-2 px-5 rounded-full font-[font3] text-xl font-bold">{category}</span>
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