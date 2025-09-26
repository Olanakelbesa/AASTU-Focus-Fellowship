import Joi from "joi"

export const validateRequest = (Schema) => {
  return (req, res, next) => {
    const { error } = Schema.validate(req.body);

    if (error) {
      const errorMessage = error.details.map(detail => detail.message).join(', ');
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errorMessage
      });
    }

    next();
  }
}

export default validateRequest;