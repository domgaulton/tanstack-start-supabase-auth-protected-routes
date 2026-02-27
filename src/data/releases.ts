import type { FileRoutesByTo } from "@/routeTree.gen";
import type { ReleaseContentData, ReleaseSection } from "./release-content";
import {
	getReleaseByVersion as rawGetReleaseByVersion,
	releases as rawReleases,
} from "./release-content";

export type { ReleaseSection };

export type ReleaseMetadata = Omit<ReleaseContentData, "path"> & {
	path: keyof FileRoutesByTo;
};

export const releases = rawReleases as ReleaseMetadata[];

export const getReleaseByVersion = rawGetReleaseByVersion as (
	version: string,
) => ReleaseMetadata;
