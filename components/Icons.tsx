import React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const CommunityIcon = ({ size, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={size || "26"}
    height={size || "26"}
    {...props}
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export const HeritageIcon = ({ size, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={size || "26"}
    height={size || "26"}
    {...props}
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

export const ExchangeIcon = ({ size, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={size || "26"}
    height={size || "26"}
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export const IntegrityIcon = ({ size, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={size || "26"}
    height={size || "26"}
    {...props}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

export const CollaborationIcon = ({ size, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={size || "26"}
    height={size || "26"}
    {...props}
  >
    <circle cx="12" cy="5" r="3" />
    <path d="M12 8v8" />
    <path d="M8.5 14a3.5 3.5 0 1 0 7 0" />
    <path d="M5 19a3 3 0 1 0 6 0" />
    <path d="M13 19a3 3 0 1 0 6 0" />
  </svg>
);

export const ConfidentialityIcon = ({ size, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={size || "26"}
    height={size || "26"}
    {...props}
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export const GrowthIcon = ({ size, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={size || "26"}
    height={size || "26"}
    {...props}
  >
    <path d="M12 22V12" />
    <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
    <path d="M8 6s.7 5 4 6c3.3-1 4-6 4-6" />
    <path d="M12 6V2" />
  </svg>
);

export const CelebrationIcon = ({ size, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={size || "26"}
    height={size || "26"}
    {...props}
  >
    <path d="M3.5 20.5 2 22l1.5-6L9 18l-1.5 1.5z" />
    <path d="M15 3l6 6" />
    <path d="M9 9l3-6 2 4 4-1-1 4 4 2-3.5 2.5" />
  </svg>
);

export const CultureIcon = ({ size, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={size || "26"}
    height={size || "26"}
    {...props}
  >
    <path d="M6 2v2" />
    <path d="M18 2v2" />
    <rect x="2" y="6" width="20" height="16" rx="2" />
    <path d="M12 10v8" />
    <path d="M8 14h8" />
  </svg>
);

export const DragonIcon = ({ size, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={size || "26"}
    height={size || "26"}
    {...props}
  >
    <path d="M3 17l4-4 4 4 4-4 4 4" />
    <path d="M3 12l4-4 4 4 4-4 4 4" />
    <path d="M3 7l4-4 4 4 4-4 4 4" />
  </svg>
);

export const EducationIcon = ({ size, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={size || "26"}
    height={size || "26"}
    {...props}
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

export const ArtsIcon = ({ size, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={size || "26"}
    height={size || "26"}
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export const VolunteerIcon = ({ size, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={size || "26"}
    height={size || "26"}
    {...props}
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

export const EmailIcon = ({ size, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={size || "22"}
    height={size || "22"}
    {...props}
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

export const PhoneIcon = ({ size, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={size || "22"}
    height={size || "22"}
    {...props}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.1 6.1l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export const ChatIcon = ({ size, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={size || "22"}
    height={size || "22"}
    {...props}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

export const LocationIcon = ({ size, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={size || "22"}
    height={size || "22"}
    {...props}
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const DiamondIcon = ({ size, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={size || "30"}
    height={size || "30"}
    {...props}
  >
    <path d="M6 3h12l4 6-10 13L2 9 6 3z" />
    <path d="M11 3L8 9l4 13 4-13-3-6" />
    <path d="M2 9h20" />
  </svg>
);

export const TrophyIcon = ({ size, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={size || "30"}
    height={size || "30"}
    {...props}
  >
    <polyline points="8 21 16 21" />
    <line x1="12" y1="17" x2="12" y2="21" />
    <path d="M7 4H4a2 2 0 0 0-2 2v2c0 1.66 1.34 3 3 3h1" />
    <path d="M17 4h3a2 2 0 0 1 2 2v2c0 1.66-1.34 3-3 3h-1" />
    <rect x="7" y="2" width="10" height="12" rx="2" />
  </svg>
);

export const MedalIcon = ({ size, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={size || "30"}
    height={size || "30"}
    {...props}
  >
    <circle cx="12" cy="15" r="6" />
    <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85" />
    <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
  </svg>
);

export const StarIcon = ({ size, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={size || "30"}
    height={size || "30"}
    {...props}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export const IconMap: Record<string, React.ComponentType<IconProps>> = {
  community: CommunityIcon,
  heritage: HeritageIcon,
  exchange: ExchangeIcon,
  integrity: IntegrityIcon,
  collaboration: CollaborationIcon,
  confidentiality: ConfidentialityIcon,
  growth: GrowthIcon,
  celebration: CelebrationIcon,
  culture: CultureIcon,
  dragon: DragonIcon,
  education: EducationIcon,
  arts: ArtsIcon,
  volunteer: VolunteerIcon,
  email: EmailIcon,
  phone: PhoneIcon,
  chat: ChatIcon,
  location: LocationIcon,
  diamond: DiamondIcon,
  trophy: TrophyIcon,
  medal: MedalIcon,
  star: StarIcon,
};

export function renderIcon(name: string, props?: IconProps) {
  const IconComponent = IconMap[name];
  if (!IconComponent) return null;
  return <IconComponent {...props} />;
}
