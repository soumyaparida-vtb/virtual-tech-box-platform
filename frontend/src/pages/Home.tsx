// pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCode, FiShield, FiDatabase, FiCpu, FiActivity } from 'react-icons/fi';
import { LEARNING_AREAS } from '../utils/constants';

const Home: React.FC = () => {
  const features = [
    {
      icon: <FiCode className="text-3xl" />,
      title: 'Interactive Learning',
      description: 'Learn by doing with hands-on exercises and real-world projects',
    },
    {
      icon: <FiShield className="text-3xl" />,
      title: 'Industry-Relevant',
      description: 'Stay current with the latest tools and best practices',
    },
    {
      icon: <FiDatabase className="text-3xl" />,
      title: 'Open Source',
      description: 'Free forever, community-driven, and constantly improving',
    },
  ];

  const learningPaths = [
    { icon: <FiCode />, area: 'devops', color: 'bg-vtb-accent-blue' },
    { icon: <FiShield />, area: 'devsecops', color: 'bg-vtb-dark-green' },
    { icon: <FiDatabase />, area: 'data-engineering', color: 'bg-vtb-accent-orange' },
    { icon: <FiCpu />, area: 'fullstack', color: 'bg-vtb-accent-red' },
    { icon: <FiActivity />, area: 'ai-ml', color: 'bg-vtb-accent-pink' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-vtb-primary-blue to-vtb-secondary-blue text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Master Modern Tech Skills
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Join Virtual Tech Box and learn DevOps, DevSecOps, Data Engineering, Full Stack Development, and AI/ML through interactive, hands-on courses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-vtb-accent-yellow text-vtb-primary-blue hover:bg-yellow-400 transition-all duration-200 px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center group"
              >
                Start Learning Free
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/learning-areas"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-vtb-primary-blue transition-all duration-200 px-8 py-4 rounded-lg font-semibold text-lg"
              >
                Explore Courses
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-vtb-primary-blue mb-4">
              Why Choose Virtual Tech Box?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide a comprehensive learning experience designed to help you succeed in today's tech landscape.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-vtb-accent-blue mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-semibold text-vtb-primary-blue mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-vtb-primary-blue mb-4">
              Choose Your Learning Path
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Select from five comprehensive learning paths designed to accelerate your career in tech.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {learningPaths.map((path, index) => {
              const areaInfo = LEARNING_AREAS[path.area];
              return (
                <motion.div
                  key={path.area}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group cursor-pointer"
                >
                  <Link to={`/learning/${path.area}`}>
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden group-hover:shadow-xl transition-all duration-300">
                      <div className={`${path.color} h-2`}></div>
                      <div className="p-6">
                        <div className="text-4xl mb-4 text-gray-700 group-hover:text-vtb-primary-blue transition-colors">
                          {path.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-vtb-primary-blue mb-2">
                          {areaInfo.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {areaInfo.moduleCount} modules • {areaInfo.estimatedHours} hours
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/learning-areas"
              className="inline-flex items-center text-vtb-accent-blue hover:text-vtb-secondary-blue font-semibold text-lg group"
            >
              View All Learning Paths
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-vtb-primary-green to-vtb-dark-green text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of learners who are advancing their careers with Virtual Tech Box. It's completely free and open source!
            </p>
            <Link
              to="/register"
              className="bg-white text-vtb-primary-green hover:bg-gray-100 transition-all duration-200 px-8 py-4 rounded-lg font-semibold text-lg inline-flex items-center group"
            >
              Get Started Now
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;