export default {
  name: 'place',
  title: 'Place',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required().max(30),
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (Rule) => Rule.required().max(30),
    },
    {
      name: 'image',
      title: 'Image of the location',
      type: 'image',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'details',
      title: 'Details of the location',
      type: 'text',
      validation: (Rule) =>
        Rule.required().min(10).error('Please provide a longer description for the place'),
    },
    {
      name: 'price',
      title: 'Price of the location',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    },
  ],
};
