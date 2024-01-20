const Testimonials = () => {
  //Mock Data
  const testimonialsData = [
    {
      id: 1,
      profile_pic: 'https://randomuser.me/api/portraits/men/58.jpg',
      author: 'John Doe',
      text: 'Excellent service and caring staff. I highly recommend Fix Health.',
      rating: 5,
    },
    {
      id: 2,
      profile_pic: 'https://randomuser.me/api/portraits/women/59.jpg',
      author: 'Jane Smith',
      text: 'The physiotherapy sessions were effective, and the team was supportive.',
      rating: 4,
    },
    {
      id: 3,
      profile_pic: 'https://randomuser.me/api/portraits/men/60.jpg',
      author: 'Alex Johnson',
      text: 'Professional and friendly. I saw improvement after just a few sessions.',
      rating: 5,
    },
  ];

  return (
    <section className="py-16 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">
        What Our Clients Say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {testimonialsData.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;

// eslint-disable-next-line react/prop-types
const TestimonialCard = ({author, text, profile_pic, rating}) => {
  return (
    <div className="bg-gray-800 w- p-6 rounded-lg shadow-md">
      <img
        className="w-full mb-4"
        src={profile_pic}
        alt="Testimonials or Recommedations for FixHealth from people"
      />
      <p className="text-lg">{text}</p>
      <div className="flex justify-between">
        <p className="text-sm text-gray-500 mt-2">{`- ${author}`}</p>
        <p>{'⭐'.repeat(rating)}</p>
      </div>
    </div>
  );
};
