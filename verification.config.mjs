const verification = {
  schemaVersion: 1,
  id: "brick",
  kind: "public-package-with-consumer",
  commands: {
    focused: "check:focused",
    repository: "check:repository",
    release: "check:release",
    processCheck: "test:processes",
    contract: "verify:repository-contract",
  },
  servers: [
    {
      name: "playground",
      developmentPort: 3010,
      testPort: 4010,
      configurationFiles: ["playground/vite.config.ts"],
      strictPort: true,
    },
    {
      name: "consumer",
      developmentPort: 3011,
      testPort: 4011,
      configurationFiles: ["apps/consumer/vite.config.ts"],
      strictPort: true,
    },
  ],
  browserConfigs: ["playwright.config.ts", "apps/consumer/playwright.config.ts"],
  workflows: {
    ci: ".github/workflows/ci.yml",
    nightly: ".github/workflows/nightly.yml",
    publish: ".github/workflows/publish.yml",
  },
  impact: {
    strategy: "component-manifest",
    manifest: "scripts/component-test-manifest.mjs",
    conservativePaths: ["package.json", "package-lock.json", "src/index.ts", "src/styles", "scripts", "playground/src/index.tsx"],
  },
  manual: ["reviewed visual baselines", "physical mobile browsers", "human accessibility and interaction judgment"],
};

export default verification;
