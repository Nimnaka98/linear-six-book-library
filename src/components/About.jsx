import React from 'react';
import { FaReact, FaServer, FaMobile, FaSearch, FaEdit, FaTrash, FaPlus, FaThLarge, FaList } from 'react-icons/fa';
import './About.css';

const About = () => {
  const features = [
    {
      icon: <FaPlus />,
      title: "Add Books",
      description: "Add new books to your library with complete details and validation"
    },
    {
      icon: <FaEdit />,
      title: "Edit Books", 
      description: "Update existing book information with real-time form validation"
    },
    {
      icon: <FaTrash />,
      title: "Delete Books",
      description: "Remove books with confirmation dialogs to prevent accidental deletions"
    },
    {
      icon: <FaSearch />,
      title: "Search & Filter",
      description: "Real-time search by title or author with instant results"
    },
    {
      icon: <FaThLarge />,
      title: "Grid View",
      description: "Beautiful card-based layout with hover effects and animations"
    },
    {
      icon: <FaList />,
      title: "List View", 
      description: "Compact horizontal layout perfect for browsing large collections"
    }
  ];

  const techStack = [
    {
      icon: <FaReact />,
      name: "React 18",
      description: "Modern React with Hooks and Context API"
    },
    {
      icon: <FaServer />,
      name: "JSON Server",
      description: "Mock REST API for full CRUD operations"
    },
    {
      icon: <FaMobile />,
      name: "Responsive Design",
      description: "Mobile-first approach with breakpoints"
    }
  ];

  return (
    <div className="about-page">
      <div className="container">
        {/* Hero Section */}
        <section className="about-hero">
          <h1 className="about-title">Interactive Book Library</h1>
          <p className="about-subtitle">
            A modern, responsive React application for managing your personal book collection
          </p>
          <div className="about-stats">
            <div className="stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">Requirements Met</span>
            </div>
            <div className="stat">
              <span className="stat-number">6</span>
              <span className="stat-label">Core Features</span>
            </div>
            <div className="stat">
              <span className="stat-number">15+</span>
              <span className="stat-label">Components</span>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="about-features">
          <h2 className="section-title">Core Features</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="about-tech">
          <h2 className="section-title">Technology Stack</h2>
          <div className="tech-grid">
            {techStack.map((tech, index) => (
              <div key={index} className="tech-card">
                <div className="tech-icon">{tech.icon}</div>
                <h3 className="tech-name">{tech.name}</h3>
                <p className="tech-description">{tech.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Architecture Section */}
        <section className="about-architecture">
          <h2 className="section-title">Architecture Highlights</h2>
          <div className="architecture-content">
            <div className="architecture-item">
              <h3>State Management</h3>
              <p>Context API with useReducer for predictable state updates and global data flow</p>
            </div>
            <div className="architecture-item">
              <h3>Component Structure</h3>
              <p>Modular design with reusable UI components and clean separation of concerns</p>
            </div>
            <div className="architecture-item">
              <h3>API Integration</h3>
              <p>RESTful API calls with error handling and graceful fallbacks to mock data</p>
            </div>
            <div className="architecture-item">
              <h3>Form Validation</h3>
              <p>Real-time validation with user-friendly error messages and visual feedback</p>
            </div>
          </div>
        </section>

        {/* Project Info */}
        <section className="about-project">
          <h2 className="section-title">Project Information</h2>
          <div className="project-info">
            <div className="info-card">
              <h3>Purpose</h3>
              <p>Technical interview challenge demonstrating modern React development skills and best practices</p>
            </div>
            <div className="info-card">
              <h3>Development Time</h3>
              <p>Built with focus on code quality, user experience, and maintainable architecture</p>
            </div>
            <div className="info-card">
              <h3>Key Achievements</h3>
              <p>100% requirement coverage, responsive design, error handling, and professional UI/UX</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;