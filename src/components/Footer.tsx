export default function Footer() {
	return (
		<footer className="bg-gray-800 border-t border-gray-700 py-6 px-6">
			<div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
				<span className="font-semibold text-white">
					TanStack Start + Supabase Auth
				</span>
				<div className="flex items-center gap-6">
					<a
						href="https://github.com/domgaulton/tanstack-start-supabase-auth-protected-routes"
						target="_blank"
						rel="noreferrer"
						className="hover:text-cyan-400 transition-colors"
					>
						GitHub
					</a>
				</div>
			</div>
		</footer>
	);
}
