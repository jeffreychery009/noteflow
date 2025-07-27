"use client";

const benefits = [
  { value: "10K+", label: "Active Users", color: "text-blue-500" },
  { value: "99.9%", label: "Uptime", color: "text-green-500" },
  { value: "50M+", label: "Notes Created", color: "text-purple-500" },
  { value: "4.9", label: "User Rating", color: "text-orange-500" },
];

export default function BenefitsSection() {
  return (
    <div className="mt-40 text-center">
      <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
        Why Choose veltnote?
      </h2>
      <p className="mx-auto mb-16 max-w-2xl text-xl text-gray-600 dark:text-gray-300">
        Join thousands of users who have transformed their productivity with our
        intuitive note-taking platform.
      </p>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit, index) => (
          <div key={index} className="text-center">
            <div className={`mb-3 text-3xl font-bold ${benefit.color}`}>
              {benefit.value}
            </div>
            <p className="text-gray-600 dark:text-gray-300">{benefit.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
