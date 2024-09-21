import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { FaCode, FaPython, FaJava, FaCuttlefish } from 'react-icons/fa';
import { SiJavascript } from 'react-icons/si';

const Home = () => {
  const { user } = useAuthContext();

  const useCases = [
    { icon: <FaPython className="text-4xl text-green-500" />, language: 'Python', description: 'Generate clean Python classes and interfaces' },
    { icon: <FaJava className="text-4xl text-red-500" />, language: 'Java', description: 'Create robust Java object structures' },
    { icon: <SiJavascript className="text-4xl text-yellow-500" />, language: 'JavaScript', description: 'Build modern ES6 classes and prototypes' },
    { icon: <FaCuttlefish className="text-4xl text-blue-500" />, language: 'C++', description: 'Design efficient C++ class hierarchies' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Welcome to <span className="text-indigo-600">CodeGen</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Generate OOP code structures easily! Streamline your development process with our intuitive code generation tool.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link to={user ? "/dashboard" : "/signup"} className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                Get Started
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Link to="/about" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                Learn More
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">Use Cases</h2>
          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {useCases.map((useCase, index) => (
                <div key={index} className="pt-6">
                  <div className="flow-root bg-white rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                        {useCase.icon}
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{useCase.language}</h3>
                      <p className="mt-5 text-base text-gray-500">
                        {useCase.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Why Choose CodeGen?
            </h3>
            <div className="mt-5">
              <ul className="list-disc list-inside text-gray-600">
                <li>Rapid prototyping of object-oriented structures</li>
                <li>Support for multiple programming languages</li>
                <li>Customizable templates for different design patterns</li>
                <li>Integration with popular IDEs and text editors</li>
                <li>Time-saving for both beginners and experienced developers</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
