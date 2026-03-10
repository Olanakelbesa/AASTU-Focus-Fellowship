class APIError extends Error {
  code: string | number;
  error?: string;

  constructor(message: string = "Unknown error", code: string | number = "UNKNOWN", error?: string) {
    super(message);
    this.code = code;
    this.error = error;
  }
}

export default APIError;
