//@ts-nocheck
function validateField(
  path: string,
  options?: {
    silentValidation?: boolean;
    validateOn?: string[];
    force?: boolean;
    delay?: number;
  }
): Promise<void>;
