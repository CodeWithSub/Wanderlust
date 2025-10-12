const Joi = require('joi');

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required().messages({
      'any.required': 'Title is required.',
      'string.empty': 'Title cannot be empty.'
    }),

    description: Joi.string().required().max(300).messages({
      'any.required': 'Description is required.',
      'string.empty': 'Description cannot be empty.',
      'string.max': 'Description is too long.'
    }),

    image: Joi.string()
      .allow('', null)
      .messages({
        'string.base': 'Image must be a valid URL or left blank.'
      }),

    location: Joi.string().required().messages({
      'any.required': 'Location is required.',
      'string.empty': 'Location cannot be empty.'
    }),

    country: Joi.string().required().messages({
      'any.required': 'Country is required.',
      'string.empty': 'Country cannot be empty.'
    }),

    price: Joi.number().required().min(0).messages({
      'any.required': 'Price is required.',
      'number.base': 'Price must be a number.',
      'number.min': 'Price cannot be negative.'
    }),
  })
    .required()
    .messages({
      'any.required': 'Listing data is required.'
    })
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required()
  }).required()
})