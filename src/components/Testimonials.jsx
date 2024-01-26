const Testimonials = () => {
  //Mock Data
  const testimonialsData = [
    {
      id: 1,
      profile_pic: '/images/man01.jpg',
      author: 'John Doe',
      text: 'Excellent service and caring staff. I highly recommend Fix Health.',
      rating: 5,
    },
    {
      id: 2,
      profile_pic: '/images/man02.jpg',
      author: 'James Smith',
      text: 'The physiotherapy sessions were effective, and the team was supportive.',
      rating: 4,
    },
    {
      id: 3,
      profile_pic: '/images/man03.jpg',
      author: 'Alex Johnson',
      text: 'Professional and friendly. I saw improvement after just a few sessions.',
      rating: 5,
    },
    {
      id: 4,
      profile_pic: '/images/man04.jpg',
      author: 'Davis',
      text: 'Great experience! The facilities are top-notch, and the staff is knowledgeable.',
      rating: 4,
    },
    {
      id: 5,
      profile_pic: '/images/man05.jpg',
      author: 'Michael Brown',
      text: 'The personalized care I received exceeded my expectations. Thank you, Fix Health!',
      rating: 5,
    },

    {
      id: 6,
      profile_pic: '/images/man06.jpg',
      author: 'Adams',
      text: 'I appreciate the attention to detail and the friendly atmosphere. Highly recommended.',
      rating: 4,
    },
  ];

  return (
    <section className="py-16 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">
        What FixHealthers have to say
      </h2>
      <div className="testimonials flex min-w-screen overflow-x-auto gap-4 ring-offset-indigo-500">
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
    <div className="min-w-[25rem] bg-gray-800 p-6 rounded-lg shadow-md">
      <img
        loading="lazy"
        className="w-full h-96 mb-4 object-cover"
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
