const nextJest = require("next/jest");

const createJestConfig = nextJest({
	// Provide the path to your Next.js app
	dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
	setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
	testEnvironment: "jest-environment-jsdom",
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
		"^@styles/(.*)$": "<rootDir>/src/styles/$1",
	},
	testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config
module.exports = createJestConfig(customJestConfig);
