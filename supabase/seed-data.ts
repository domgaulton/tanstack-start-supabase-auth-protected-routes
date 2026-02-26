export interface SeedUser {
	email: string;
	password: string;
	displayName: string;
	isRobot: boolean;
}

export const seedUsers: SeedUser[] = [
	{
		email: "user-a@example.com",
		password: "password123",
		displayName: "Alice",
		isRobot: false,
	},
	{
		email: "user-b@example.com",
		password: "password123",
		displayName: "Bob",
		isRobot: true,
	},
];
