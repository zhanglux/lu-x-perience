'use client';

import { useState } from 'react';
import { Github, Mail, Linkedin, ExternalLink, ArrowRight, Sparkles } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  image?: string;
}

const projects: Project[] = [
  {
    title: 'Search Builder & AI Filters',
    description: 'Advanced search interface with AI-powered filter suggestions and intuitive query building.',
    tags: ['UX Design', 'Product Design', 'AI/ML'],
    link: 'https://engineering.signal-ai.com/design-prototypes/save-search/search-builder-v3',
  },
  {
    title: 'Risk Heat Map',
    description: 'Interactive visualization tool for risk assessment and data analysis.',
    tags: ['Data Visualization', 'Dashboard Design'],
    link: 'https://engineering.signal-ai.com/design-prototypes/risk-heat-map',
  },
  {
    title: 'Risk Matrix',
    description: 'Comprehensive risk management interface with matrix-based analysis.',
    tags: ['Enterprise UX', 'Data Design'],
    link: 'https://engineering.signal-ai.com/design-prototypes/risk-matrix',
  },
  {
    title: 'Reputation Risk Report',
    description: 'Detailed reporting interface for reputation risk insights and analytics.',
    tags: ['Reporting', 'Information Architecture'],
    link: 'https://engineering.signal-ai.com/design-prototypes/rep-risk-report',
  },
];

export default function Portfolio() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-purple-600">Product Designer</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-gray-900 leading-tight">
            Hi, I&apos;m{' '}
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Lu Zhang
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl leading-relaxed">
            I design digital experiences that are both beautiful and functional. 
            Passionate about creating intuitive interfaces and solving complex user problems.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <a
              href="https://github.com/zhanglux"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>
            <a
              href="mailto:your.email@example.com"
              className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 border-2 border-gray-200 rounded-full hover:border-gray-300 transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>Email</span>
            </a>
            <a
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 border-2 border-gray-200 rounded-full hover:border-gray-300 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 left-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              A collection of design prototypes and product experiences I&apos;ve created.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl border-2 border-gray-100 p-8 hover:border-purple-200 transition-all duration-300 hover:shadow-xl"
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {project.link ? (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="block">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                        {project.title}
                      </h3>
                      <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                    </div>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </a>
                ) : (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
            About Me
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              I&apos;m a product designer passionate about creating meaningful digital experiences. 
              I specialize in user experience design, interface design, and bringing complex 
              products to life through thoughtful design.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              My work focuses on understanding user needs, solving problems creatively, and 
              building products that people love to use. I believe in the power of design to 
              make technology more accessible and intuitive.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-600 mb-4">
            © {new Date().getFullYear()} Lu Zhang. All rights reserved.
          </p>
          <div className="flex justify-center gap-6">
            <a
              href="https://github.com/zhanglux"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-900 transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="mailto:your.email@example.com"
              className="text-gray-400 hover:text-gray-900 transition-colors"
            >
              <Mail className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-900 transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
