import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function Button({
  children,
  to,
  href,
  onClick,
  variant = "primary",
  size = "md",
  icon,
  arrow = false,
  className = "",
  type = "button",
  disabled = false,
  ...props
}) {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none cursor-pointer";

  const sizeClasses = {
    sm: "text-xs px-3.5 py-2 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2 shadow-sm",
    lg: "text-base px-6 py-3.5 gap-2.5 shadow-md",
    xl: "text-lg px-8 py-4 gap-3 shadow-lg",
  };

  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20 hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] focus:ring-blue-500",
    gradient: "bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] focus:ring-blue-500",
    secondary: "bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/20 hover:scale-[1.02] active:scale-[0.98] focus:ring-slate-900",
    outline: "border-2 border-slate-200 hover:border-blue-600 bg-white hover:bg-blue-50/50 text-slate-800 hover:text-blue-600 focus:ring-blue-500 hover:scale-[1.02] active:scale-[0.98]",
    outlineWhite: "border-2 border-white/80 hover:border-white bg-white/10 hover:bg-white text-white hover:text-slate-900 backdrop-blur-sm focus:ring-white hover:scale-[1.02] active:scale-[0.98]",
    white: "bg-white hover:bg-slate-50 text-blue-600 hover:text-blue-700 shadow-md hover:shadow-lg focus:ring-white hover:scale-[1.02] active:scale-[0.98]",
    whatsapp: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20 hover:shadow-emerald-600/30 focus:ring-emerald-500 hover:scale-[1.02] active:scale-[0.98]",
    subtle: "bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 focus:ring-blue-400",
    ghost: "bg-transparent hover:bg-slate-100 text-slate-700 hover:text-slate-900 focus:ring-slate-400",
  };

  const combinedClasses = `${baseClasses} ${sizeClasses[size] || sizeClasses.md} ${variantClasses[variant] || variantClasses.primary} ${className}`;

  const content = (
    <>
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
      {arrow && <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 shrink-0" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={`group ${combinedClasses}`} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={`group ${combinedClasses}`}
        target={href.startsWith("http") || href.startsWith("https") ? "_blank" : undefined}
        rel={href.startsWith("http") || href.startsWith("https") ? "noopener noreferrer" : undefined}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`group ${combinedClasses}`} {...props}>
      {content}
    </button>
  );
}
