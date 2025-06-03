import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { signal } from '@angular/core';


interface Experience {
  position: string;
  company: string;
  period: string;
  descriptions: string[];
}

interface Education {
  degree: string;
  school: string;
  year: string;
  description?: string;
}

interface Skill {
  icon: string;
  name: string;
}

interface SkillCategory {
  name: string;
  items: Skill[];
}

interface Profile {
  name: string;
  avatarUrl: string;
  title: string;
  postalCode: string;
  email: string;
  linkedinUrl: string;
  linkedinShort: string;
  about: string;
  experience: Experience[];
  education: Education[];
  skills: SkillCategory[];
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class ProfileComponent implements OnInit, OnDestroy, AfterViewInit {
  activeSection = signal('about');
  visibleSections: { [key: string]: boolean } = {};
  private observer: IntersectionObserver | null = null;

  profile: Profile = {
    avatarUrl: 'profile.jpg',
    name: 'Timothy Keating',
    title: 'Head Concierge / Building Manager',
    postalCode: 'V6Z 2E9, Vancouver, BC',
    email: 'timspub@yahoo.com',
    linkedinUrl: 'https://www.linkedin.com/in/timothy-keating',
    linkedinShort: 'in/timothy-keating',
    about:
      'Personable and results-driven concierge and hospitality professional with 15+ years of proven success in condominium, hotel, and casino environments. Recognized for exceptional interpersonal skills, problem-solving abilities, and operational efficiency. Adept at coordinating teams, managing client relations, and ensuring seamless front desk and guest experiences. Committed to delivering service excellence and creating welcoming environments for residents, guests, and VIP clientele.',
    experience: [
      {
        position: 'Head Concierge / Building Manager',
        company: 'FirstService Residential',
        period: 'Nov 2014 - Jan 2024 | 9 years 3 months',
        descriptions: [
          'Supervised concierge team, ensuring consistent high-level service to residents.',
          'Trained and mentored new staff, improving team performance and retention.',
          'Oversaw payroll, shift scheduling, and performance evaluations.',
          'Acted as a liaison between residents, contractors, and management.',
          'Managed building operations, ensuring safety, efficiency, and client satisfaction.',
        ],
      },
      {
        position: 'Casino Shift Manager',
        company: 'Edgewater Casino Inc.',
        period: 'Feb 2005 - Aug 2013 | 8 years 7 months',
        descriptions: [
          'Directed staff operations, scheduling, and training for the slot department.',
          'Oversaw preparation and submission of daily revenue reports.',
          'Managed VIP parties, providing seamless event execution.',
          'Conducted employee evaluations and performance improvement planning.',
        ],
      },
      {
        position: 'Slot Attendant',
        company: 'Great Canadian Casino',
        period: 'Oct 1998 - Dec 2004 | 6 years 3 months',
        descriptions: [
          'Delivered exceptional customer service to casino patrons.',
          'Processed cash transactions and validated identification for loyalty programs.',
          'Addressed guest inquiries and ensured satisfaction with all services.',
          'Promoted a friendly, welcoming atmosphere in high-traffic environments.',
        ],
      },
    ],
    education: [
      {
        degree: 'Bachelor of Arts - BA, Philosophy',
        school: 'University of Manitoba',
        year: 'Sep 1995 - Apr 1987',
        description:
          'Graduated with a Bachelor of Arts in Philosophy, focusing on critical thinking, ethics, and logic.',
      },
      {
        degree: "Associate's degree, Hotel restaurant hospitality",
        school: 'Red River Community College',
        year: 'Sep 1984 - Jun 1985',
        description:
          "Completed an Associate's degree in Hotel Restaurant Hospitality, gaining foundational knowledge in hospitality management and customer service.",
      },
    ],
    skills: [
      {
        name: 'Guest Services & Frontline Operations',
        items: [
          { icon: '🤝', name: 'Customer Relationship Management' },
          { icon: '🧘', name: 'Conflict Resolution & Complaint Handling' },
          { icon: '🛎', name: 'Concierge & Front Desk Operations' },
          { icon: '👑', name: 'VIP Guest Services' },
          { icon: '🎰', name: 'Casino Management & Front Office Operations' },
        ],
      },
      {
        name: 'Leadership & Administrative Management',
        items: [
          { icon: '👥', name: 'Team Leadership & Staff Training' },
          { icon: '📆', name: 'Payroll, Scheduling, & Timekeeping' },
          { icon: '🧭', name: 'Duty Management' },
          { icon: '🗂️', name: 'Organizational Efficiency' },
          { icon: '📋', name: 'Hospitality SOPs & Compliance' },
        ],
      },
      {
        name: 'Hospitality Strategy & Reporting',
        items: [
          { icon: '🌙', name: 'Night Audit & Financial Reporting' },
          { icon: '👩‍💼', name: 'Hospitality Management' },
          { icon: '😊', name: 'Hotel Management' },
        ],
      },
    ],
  };

  ngOnInit(): void {
    // Initialize visibility for the about section
    setTimeout(() => {
      this.visibleSections['about'] = true;
    }, 100);
  }

  ngAfterViewInit(): void {
    this.setupIntersectionObserver();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  scrollToSection(sectionId: string): void {
    this.activeSection.set(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }

  onImageError(event: any): void {
    // Fallback to initials if image fails to load
    const img = event.target;
    const fallbackDiv = document.createElement('div');
    fallbackDiv.className = 'profile-img-fallback';
    fallbackDiv.style.cssText = `
      width: 150px;
      height: 150px;
      border-radius: 50%;
      border: 5px solid white;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      margin: 0 auto 1rem;
      background: linear-gradient(135deg, #667eea, #764ba2);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 2rem;
      font-weight: bold;
    `;
    fallbackDiv.textContent = this.getInitials();
    img.parentNode?.replaceChild(fallbackDiv, img);
  }

  getInitials(): string {
    return this.profile.name
      .split(' ')
      .map((name) => name.charAt(0))
      .join('')
      .toUpperCase();
  }

  private setupIntersectionObserver(): void {
    const sections = document.querySelectorAll('.section');
    const options = {
      threshold: 0.3,
      rootMargin: '-50px 0px',
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          this.visibleSections[sectionId] = true;
          this.activeSection.set(sectionId);
        }
      });
    }, options);

    sections.forEach((section) => {
      if (this.observer) {
        this.observer.observe(section);
      }
    });
  }
}
