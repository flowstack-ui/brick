// Filenames identify host-specific screenshot comparisons. Do not match owner
// directories (notably visually-hidden), whose behavior tests remain portable.
export const visualSuitePattern = /(?:^|[\\/])[^\\/]*(?:visual|screenshot)[^\\/]*\.spec\.ts$/;

export const isVisualSuite = (path) => visualSuitePattern.test(path);
