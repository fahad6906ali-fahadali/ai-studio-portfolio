/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectShowcase } from './components/ProjectShowcase';
import { AgentSimulator } from './components/AgentSimulator';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ProjectManagerModal } from './components/ProjectManagerModal';
import { AIProject, Language } from './types/portfolio';
import { INITIAL_AI_PROJECTS } from './data/initialProjects';

export default function App() {
  // Language State: 'en' or 'ur' (Urdu)
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('afa_language');
      return saved === 'ur' ? 'ur' : 'en';
    } catch {
      return 'en';
    }
  });

  // Projects State: Loaded from localStorage or seeded from INITIAL_AI_PROJECTS
  const [projects, setProjects] = useState<AIProject[]>(() => {
    try {
      const saved = localStorage.getItem('afa_projects');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed reading afa_projects from localStorage', e);
    }
    return INITIAL_AI_PROJECTS;
  });

  // Modal States
  const [selectedDetailProject, setSelectedDetailProject] = useState<AIProject | null>(null);
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [inquiryTargetProject, setInquiryTargetProject] = useState<string | null>(null);

  // Sync Language to localStorage
  const handleToggleLanguage = () => {
    setLanguage((prev) => {
      const nextLang = prev === 'en' ? 'ur' : 'en';
      try {
        localStorage.setItem('afa_language', nextLang);
      } catch {}
      return nextLang;
    });
  };

  // Sync projects to localStorage
  const handleSaveProject = (updatedProj: AIProject) => {
    setProjects((prev) => {
      const exists = prev.some((p) => p.id === updatedProj.id);
      const nextProjects = exists
        ? prev.map((p) => (p.id === updatedProj.id ? updatedProj : p))
        : [updatedProj, ...prev];

      try {
        localStorage.setItem('afa_projects', JSON.stringify(nextProjects));
      } catch (err) {
        console.error('Error saving projects to localStorage', err);
      }
      return nextProjects;
    });
  };

  const handleDeleteProject = (id: string) => {
    setProjects((prev) => {
      const nextProjects = prev.filter((p) => p.id !== id);
      try {
        localStorage.setItem('afa_projects', JSON.stringify(nextProjects));
      } catch (err) {
        console.error('Error saving projects to localStorage', err);
      }
      return nextProjects;
    });
  };

  const handleResetDefaults = () => {
    setProjects(INITIAL_AI_PROJECTS);
    try {
      localStorage.setItem('afa_projects', JSON.stringify(INITIAL_AI_PROJECTS));
    } catch (err) {
      console.error('Error resetting default projects', err);
    }
  };

  const handleSelectForInquiry = (projectName: string) => {
    setInquiryTargetProject(projectName);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen bg-[#080c14] text-slate-100 flex flex-col font-sans ${language === 'ur' ? 'lang-ur' : ''}`}>
      
      {/* 3-Zone Compliant Navigation Header */}
      <Navbar
        language={language}
        onToggleLanguage={handleToggleLanguage}
        onOpenManager={() => setIsManagerOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section with Split View & Metrics */}
        <Hero language={language} />

        {/* Selected AI Works with Filter Tabs & Add/Edit Project trigger */}
        <ProjectShowcase
          language={language}
          projects={projects}
          onOpenDetail={(proj) => setSelectedDetailProject(proj)}
          onOpenManager={() => setIsManagerOpen(true)}
        />

        {/* Live Interactive Agent Reasoning Sandbox */}
        <AgentSimulator language={language} />

        {/* Technical Arsenal & Core AI Capabilities */}
        <CapabilitiesSection language={language} />

        {/* Multi-channel Contact & Inquiries */}
        <ContactSection
          language={language}
          preselectedProject={inquiryTargetProject}
        />
      </main>

      {/* Footer */}
      <Footer language={language} />

      {/* Case Study Detail Modal */}
      <ProjectDetailModal
        project={selectedDetailProject}
        language={language}
        onClose={() => setSelectedDetailProject(null)}
        onSelectForInquiry={handleSelectForInquiry}
      />

      {/* In-App Project Manager Modal (User can add/edit projects anytime) */}
      <ProjectManagerModal
        isOpen={isManagerOpen}
        language={language}
        projects={projects}
        onClose={() => setIsManagerOpen(false)}
        onSaveProject={handleSaveProject}
        onDeleteProject={handleDeleteProject}
        onResetDefaults={handleResetDefaults}
      />
    </div>
  );
}
