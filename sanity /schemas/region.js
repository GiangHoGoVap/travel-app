export default {
  name: 'region',
  title: 'Region',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validaton: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Typical Image of the location',
      type: 'image',
      validaton: (Rule) => Rule.required(),
    },
    {
      name: 'places',
      title: 'Typical places of that region',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'place' }],
        },
      ],
    },
  ],
};
