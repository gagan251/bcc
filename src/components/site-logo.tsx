import React from 'react';

export const SiteLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 200"
    {...props}
  >
    <defs>
      <linearGradient id="logo-ring-gradient" x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="40%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#16a34a" />
      </linearGradient>
      <path
        id="text-arc-path"
        d="M 45 100 A 55 55 0 1 1 155 100"
        fill="none"
      />
    </defs>

    {/* Gradient Ring */}
    <circle
      cx="100"
      cy="100"
      r="80"
      fill="none"
      stroke="url(#logo-ring-gradient)"
      strokeWidth="12"
      transform="rotate(-120 100 100)"
      strokeDasharray="502"
      strokeDashoffset="50"
    />
    
    {/* "BCC" Text */}
    <text
      x="50%"
      y="55%"
      dominantBaseline="middle"
      textAnchor="middle"
      fontSize="64"
      fontWeight="bold"
      fill="#f97316"
      fontFamily="system-ui, sans-serif"
    >
      BCC
    </text>

    {/* Circular Text */}
    <text
      fill="#374151"
      fontSize="14"
      fontWeight="500"
      letterSpacing="1"
    >
      <textPath href="#text-arc-path" startOffset="50%" textAnchor="middle">
        BHARAT COMMUNICATION CENTER
      </textPath>
    </text>

    {/* Wifi Symbol */}
    <g transform="translate(156 50) rotate(50)">
      <path d="M 0 0 A 24 24 0 0 1 -17 17" stroke="#f97316" strokeWidth="6" fill="none" />
      <path d="M 0 0 A 16 16 0 0 1 -11.3 11.3" stroke="#f97316" strokeWidth="6" fill="none" />
      <path d="M 0 0 A 8 8 0 0 1 -5.6 5.6" stroke="#f97316" strokeWidth="6" fill="none" />
    </g>

    {/* Dot */}
    <circle cx="160" cy="48" r="7">
        <linearGradient id="dot-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#16a34a" />
            <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <fill>url(#dot-gradient)</fill>
    </circle>
  </svg>
);
