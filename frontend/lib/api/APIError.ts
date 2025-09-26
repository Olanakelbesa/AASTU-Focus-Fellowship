class APIError extends Error {
  code: string | number;
  error?: string;

  constructor(code: string | number = "UNKNOWN", message?: string, error?: string) {
    super(message);
    this.code = code;
    this.error = error;
  }
}

export default APIError;