import { useState } from "react"

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  const faqs = [
    {
      category: "General",
      questions: [
        {
          q: "What is LearnHub?",
          a: "LearnHub is an online learning platform that offers high-quality courses taught by industry experts. We provide courses in various fields including web development, design, data science, and more.",
        },
        {
          q: "How do I get started?",
          a: "Getting started is easy! Simply create a free account, browse our course catalog, and enroll in any course that interests you. You can start learning immediately after enrollment.",
        },
        {
          q: "Are the courses self-paced?",
          a: "Yes, all our courses are self-paced. You can learn at your own speed and access course materials anytime, anywhere. There are no deadlines or time restrictions.",
        },
        {
          q: "Do I get a certificate after completing a course?",
          a: "Yes! Upon successful completion of a course, you'll receive a verified certificate that you can download and share on your LinkedIn profile or resume.",
        },
      ],
    },
    {
      category: "Pricing & Payments",
      questions: [
        {
          q: "How much do courses cost?",
          a: "Course prices vary depending on the course. We offer both free and paid courses. Paid courses typically range from $29 to $199, with frequent discounts and promotions.",
        },
        {
          q: "What payment methods do you accept?",
          a: "We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely through our encrypted payment gateway.",
        },
        {
          q: "Do you offer refunds?",
          a: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied with your course purchase, you can request a full refund within 30 days.",
        },
        {
          q: "Are there any subscription plans?",
          a: "Yes! We offer Pro and Teams subscription plans that give you unlimited access to all courses. Check our pricing page for more details.",
        },
      ],
    },
    {
      category: "Learning Experience",
      questions: [
        {
          q: "What format are the courses in?",
          a: "Our courses include video lectures, downloadable resources, coding exercises, quizzes, and hands-on projects. Each course is designed to provide a comprehensive learning experience.",
        },
        {
          q: "Can I access courses on mobile devices?",
          a: "Absolutely! Our platform is fully responsive and works great on smartphones and tablets. You can learn on the go, anytime, anywhere.",
        },
        {
          q: "How long do I have access to a course?",
          a: "Once you enroll in a course, you have lifetime access to all course materials, including future updates. You can revisit the content as many times as you want.",
        },
        {
          q: "Can I download course materials?",
          a: "Yes, most courses include downloadable resources such as PDFs, code files, and templates. These are available for download from the course dashboard.",
        },
      ],
    },
    {
      category: "Technical Support",
      questions: [
        {
          q: "What if I have technical issues?",
          a: "Our support team is available 24/7 to help with any technical issues. You can contact us through the support page or email us directly at support@learnhub.com.",
        },
        {
          q: "Do you offer instructor support?",
          a: "Yes! Most courses include Q&A sections where you can ask questions directly to instructors. Instructors typically respond within 24-48 hours.",
        },
        {
          q: "Can I get help with course content?",
          a: "Absolutely! We have a community forum where students can help each other, and instructors are available to answer questions about course content.",
        },
      ],
    },
  ]

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Find answers to common questions about LearnHub</p>
        </div>

        <div className="space-y-8">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{category.category}</h2>
              <div className="space-y-3">
                {category.questions.map((faq, index) => {
                  const globalIndex = categoryIndex * 100 + index
                  const isOpen = openIndex === globalIndex

                  return (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <span className="font-medium text-gray-900 dark:text-white">{faq.q}</span>
                        <svg
                          className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {isOpen && (
                        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-primary-50 dark:bg-primary-900/20 rounded-xl p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Still have questions?</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Our support team is here to help!</p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  )
}

