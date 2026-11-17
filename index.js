'use strict';

const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link, .nav-contact');

// Mobile navigation: open and close the menu accessibly.
if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
    navMenu.classList.toggle('is-open', !isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation menu');
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      navMenu.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation menu');
    }
  });
}

// Highlight the navigation item for the section currently in view.
const pageSections = document.querySelectorAll('main section[id]');
if ('IntersectionObserver' in window && pageSections.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      document.querySelectorAll('.nav-link').forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });

  pageSections.forEach((section) => sectionObserver.observe(section));
}

// Reveal content as it enters the viewport. Keep everything visible if unsupported.
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

// Project details are shown in a dialog; no unfinished or unprovided URLs are fabricated.
const projectDetails = {
  osa: {
    number: 'PROJECT / 01',
    title: 'Office of Student Affairs Notifications Portal',
    description: 'A proposed web-based portal concept intended to bring student announcements, office requests, approval workflows, and notifications into one organized place. The goal is to make communication between the student affairs office and students easier to manage.',
    technologies: ['HTML', 'CSS', 'PHP', 'SQLite']
  },
  pos: {
    number: 'PROJECT / 02',
    title: 'POS and Inventory Management System',
    description: 'A point-of-sale and inventory system concept focused on product management, sales transactions, stock monitoring, and automatic inventory deductions after a transaction. It explores how sales and inventory information can work together.',
    technologies: ['PHP', 'SQL', 'HTML', 'CSS']
  },
  sales: {
    number: 'PROJECT / 03',
    title: 'Sales and Order Management System',
    description: 'A system designed to organize customer orders, calculate transaction totals, and monitor sales information. The work focuses on software analysis, documentation, interface design, and system development.',
    technologies: ['Software analysis', 'Documentation', 'Interface design', 'System development']
  },
  network: {
    number: 'ACTIVITY / 04',
    title: 'Networking Activities',
    description: 'A collection of academic networking exercises using Cisco Packet Tracer. Topics include IP addressing, subnetting, VLAN configuration, static routing, and routing protocols such as RIP, OSPF, and EIGRP.',
    technologies: ['Cisco Packet Tracer', 'IP addressing', 'Subnetting', 'VLAN', 'RIP', 'OSPF', 'EIGRP']
  }
};

const projectDialog = document.querySelector('#project-dialog');
const dialogTitle = document.querySelector('#dialog-title');
const dialogNumber = document.querySelector('#dialog-number');
const dialogDescription = document.querySelector('#dialog-description');
const dialogTech = document.querySelector('#dialog-tech');
const dialogClose = document.querySelector('.dialog-close');

function closeProjectDialog() {
  if (projectDialog && projectDialog.open) projectDialog.close();
}

document.querySelectorAll('[data-project]').forEach((button) => {
  button.addEventListener('click', () => {
    const project = projectDetails[button.dataset.project];
    if (!project || !projectDialog) return;

    dialogNumber.textContent = project.number;
    dialogTitle.textContent = project.title;
    dialogDescription.textContent = project.description;
    dialogTech.replaceChildren(...project.technologies.map((technology) => {
      const tag = document.createElement('span');
      tag.textContent = technology;
      return tag;
    }));

    if (typeof projectDialog.showModal === 'function') {
      projectDialog.showModal();
    }
  });
});

if (dialogClose) dialogClose.addEventListener('click', closeProjectDialog);
if (projectDialog) {
  projectDialog.addEventListener('click', (event) => {
    if (event.target === projectDialog) closeProjectDialog();
  });
}

// Keep the footer year current without needing another manual edit.
const yearElement = document.querySelector('#year');
if (yearElement) yearElement.textContent = String(new Date().getFullYear());
