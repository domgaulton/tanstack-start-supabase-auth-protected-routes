import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import Header from "../components/Header";
import { AuthProvider } from "../context/AuthContext";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: "TanStack Start + Supabase Auth" },
			{
				name: "description",
				content:
					"A production-ready starter template combining TanStack Start with Supabase Auth. Includes protected routes, email/password authentication, shadcn/ui, Tailwind CSS, and Vercel deployment.",
			},
			{ name: "theme-color", content: "#0f172a" },
			{ property: "og:type", content: "website" },
			{
				property: "og:title",
				content: "TanStack Start + Supabase Auth",
			},
			{
				property: "og:description",
				content:
					"A production-ready starter template combining TanStack Start with Supabase Auth. Includes protected routes, email/password authentication, shadcn/ui, Tailwind CSS, and Vercel deployment.",
			},
			{ property: "og:image", content: "/og-image.svg" },
			{ property: "og:image:width", content: "1200" },
			{ property: "og:image:height", content: "630" },
			{
				property: "og:site_name",
				content: "TanStack Start + Supabase Auth",
			},
			{ name: "twitter:card", content: "summary_large_image" },
			{
				name: "twitter:title",
				content: "TanStack Start + Supabase Auth",
			},
			{
				name: "twitter:description",
				content:
					"A production-ready starter template combining TanStack Start with Supabase Auth. Includes protected routes, email/password authentication, shadcn/ui, Tailwind CSS, and Vercel deployment.",
			},
			{ name: "twitter:image", content: "/og-image.svg" },
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
			{ rel: "apple-touch-icon", href: "/logo192.svg" },
			{ rel: "manifest", href: "/manifest.json" },
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				<AuthProvider>
					<Header />
					{children}
					<TanStackDevtools
						config={{
							position: "bottom-right",
						}}
						plugins={[
							{
								name: "Tanstack Router",
								render: <TanStackRouterDevtoolsPanel />,
							},
						]}
					/>
					<Scripts />
				</AuthProvider>
			</body>
		</html>
	);
}
