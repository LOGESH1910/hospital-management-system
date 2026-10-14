import React from "react";

const testimonials = [
  {
    content: "MediCare Pro transformed how our clinic manages patient flow. We've reduced wait times by 40% and patient satisfaction scores have never been higher.",
    author: "Dr. Amanda Foster",
    role: "Medical Director, City General Hospital",
    avatar: null,
    rating: 5
  },
  {
    content: "The telemedicine feature allowed us to continue serving patients during the pandemic seamlessly. The video quality and EHR integration are exceptional.",
    author: "Dr. Rajesh Patel",
    role: "Family Medicine Physician",
    avatar: null,
    rating: 5
  },
  {
    content: "As a patient, I love being able to book appointments, view my records, and message my doctor all from one app. It's healthcare made simple.",
    author: "Maria Gonzalez",
    role: "Patient since 2022",
    avatar: null,
    rating: 5
  },
  {
    content: "The analytics dashboard gives us real-time insights into our operations. We can optimize staffing, reduce no-shows, and improve revenue cycle.",
    author: "Jennifer Liu",
    role: "Practice Manager, Orthopedic Associates",
    avatar: null,
    rating: 5
  }
];

export const Testimonials = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Healthcare Professionals & Patients
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See what our community has to say about their experience
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-white border border-gray-200"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-6">"{testimonial.content}"</p>
              <div>
                <p className="font-semibold text-gray-900">{testimonial.author}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};