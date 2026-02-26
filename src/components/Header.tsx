import { Link } from "@tanstack/react-router";
import {
	FileText,
	Home,
	Info,
	LayoutDashboard,
	LogIn,
	LogOut,
	Menu,
	Sparkles,
	X,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const { user, isLoading } = useAuth();

	return (
		<>
			<header className="p-4 flex items-center gap-1 bg-gray-800 text-white shadow-lg">
				<button
					type="button"
					onClick={() => setIsOpen(true)}
					className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
					aria-label="Open menu"
				>
					<Menu size={24} />
				</button>
				<Link
					to="/"
					className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
					aria-label="Home"
				>
					<Home size={24} />
				</Link>
			</header>

			{/* Overlay */}
			{isOpen && (
				<button
					type="button"
					className="fixed inset-0 bg-black/50 z-40"
					onClick={() => setIsOpen(false)}
					aria-label="Close menu"
				/>
			)}

			<aside
				className={`fixed top-0 left-0 h-full w-80 bg-gray-900 text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
					isOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<div className="flex items-center justify-between p-4 border-b border-gray-700">
					<h2 className="text-xl font-bold">Navigation</h2>
					<button
						type="button"
						onClick={() => setIsOpen(false)}
						className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
						aria-label="Close menu"
					>
						<X size={24} />
					</button>
				</div>

				<nav className="flex-1 p-4 overflow-y-auto">
					{!isLoading && !user && (
						<>
							<Link
								to="/"
								onClick={() => setIsOpen(false)}
								className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
								activeProps={{
									className:
										"flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2",
								}}
							>
								<Home size={20} />
								<span className="font-medium">Home</span>
							</Link>
							<Link
								to="/about"
								onClick={() => setIsOpen(false)}
								className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
								activeProps={{
									className:
										"flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2",
								}}
							>
								<Info size={20} />
								<span className="font-medium">About</span>
							</Link>
							<Link
								to="/features"
								onClick={() => setIsOpen(false)}
								className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
								activeProps={{
									className:
										"flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2",
								}}
							>
								<Sparkles size={20} />
								<span className="font-medium">Features</span>
							</Link>
							<Link
								to="/login"
								onClick={() => setIsOpen(false)}
								className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
								activeProps={{
									className:
										"flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2",
								}}
							>
								<LogIn size={20} />
								<span className="font-medium">Log in</span>
							</Link>
							<Link
								to="/release-notes"
								onClick={() => setIsOpen(false)}
								className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
								activeProps={{
									className:
										"flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2",
								}}
							>
								<FileText size={20} />
								<span className="font-medium">Release Notes</span>
							</Link>
						</>
					)}

					{!isLoading && user && (
						<>
							<Link
								to="/about"
								onClick={() => setIsOpen(false)}
								className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
								activeProps={{
									className:
										"flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2",
								}}
							>
								<Info size={20} />
								<span className="font-medium">About</span>
							</Link>
							<Link
								to="/features"
								onClick={() => setIsOpen(false)}
								className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
								activeProps={{
									className:
										"flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2",
								}}
							>
								<Sparkles size={20} />
								<span className="font-medium">Features</span>
							</Link>
							<Link
								to="/dashboard"
								onClick={() => setIsOpen(false)}
								className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
								activeProps={{
									className:
										"flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2",
								}}
							>
								<LayoutDashboard size={20} />
								<span className="font-medium">Dashboard</span>
							</Link>
							<Link
								to="/release-notes"
								onClick={() => setIsOpen(false)}
								className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
								activeProps={{
									className:
										"flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2",
								}}
							>
								<FileText size={20} />
								<span className="font-medium">Release Notes</span>
							</Link>
							<Link
								to="/logout"
								onClick={() => setIsOpen(false)}
								className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
							>
								<LogOut size={20} />
								<span className="font-medium">Log out</span>
							</Link>
						</>
					)}
				</nav>
			</aside>
		</>
	);
}
