import React, { useEffect, useState } from 'react';
import { getAllProjects } from '../../api/projects';
import { Link } from 'react-router-dom';
import './Projects.scss';

export interface IProjectProps {}

export interface Project {
  _id: String | null | undefined;
  title: String;
  duration: String;
  meeting_cadence: String;
  technologies_used: [String];
  project_owner: {};
}

const Projects: React.FC<IProjectProps> = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = async () => {
    const displayAllProjects = await getAllProjects();
    setProjects(displayAllProjects);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="project-container">
      <h1>Browse Projects</h1>
      <ul>
        {projects.map((project: any) => {
          return (
            <li key={project._id}>
              <h3>{project.title}</h3>
              <p>{project.meeting_cadence}</p>
              <p>{project.duration}</p>
              <Link to={`/project/${project._id}`}>Learn More</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Projects;
