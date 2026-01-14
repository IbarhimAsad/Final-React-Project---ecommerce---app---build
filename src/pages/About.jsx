import FeatureCard from "../components/cards/FeatureCard"

export default function About() {
  const team = [
    {
      name: "Jessica Taylor",
      role: "CEO & Founder",
      image: "/professional-woman-ceo-founder-portrait.jpg",
    },
    {
      name: "Robert Kim",
      role: "CTO",
      image: "/professional-man-asian-cto-portrait.jpg",
    },
    {
      name: "Maria Garcia",
      role: "Head of Content",
      image: "/professional-woman-latina-head-of-content-portrait.jpg",
    },
    {
      name: "James Wilson",
      role: "Lead Developer",
      image: "/professional-developer-portrait.png",
    },
  ]

  const stats = [
    { value: "100K+", label: "Active Learners" },
    { value: "500+", label: "Courses" },
    { value: "50+", label: "Countries" },
    { value: "95%", label: "Satisfaction Rate" },
  ]

  const values = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Innovation",
      description: "We constantly push boundaries to deliver cutting-edge learning experiences.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      title: "Community",
      description: "We believe in the power of community and collaborative learning.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: "Quality",
      description: "We maintain the highest standards in content and instruction.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Accessibility",
      description: "Education should be accessible to everyone, everywhere.",
    },
  ]

  return (
    <div className="py-12">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 text-balance">
              Empowering Learners Worldwide
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              LearnHub was founded in 2020 with a simple mission: to make high-quality education accessible to everyone.
              We believe that learning should be engaging, practical, and transformative.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Today, we're proud to serve over 100,000 learners across 50+ countries, helping them achieve their goals
              and transform their careers.
            </p>
          </div>
          <div>
            <img src="/diverse-team-collaboration-office-modern.jpg" alt="LearnHub Team" className="rounded-2xl shadow-xl" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary-600 py-16 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-primary-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Values</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            The principles that guide everything we do at LearnHub.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, i) => (
            <FeatureCard key={i} {...value} />
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="bg-gray-50 dark:bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              The passionate people behind LearnHub dedicated to your success.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
