const types = "export type Schema = {\n  step1: {\n    firstName: string;\n    secondName: string;\n    gender: 'male' | 'female' | 'other';\n  };\n  step2: {\n    university: number;\n    profession: number;\n    country: number;\n  };\n  step3: {\n    contact: Array<{ email: string; phone?: string }>;\n  };\n};\n";

export { types as default };
