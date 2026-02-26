export interface SeedUser {
	email: string;
	password: string;
	displayName: string;
}

export const seedUsers: SeedUser[] = [
	{
		email: "user-a@example.com",
		password: "password123",
		displayName: "Alice",
	},
	{
		email: "user-b@example.com",
		password: "password123",
		displayName: "Bob",
	},
];
