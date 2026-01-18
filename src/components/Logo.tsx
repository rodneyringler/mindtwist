interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 48, className = '' }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle with gradient */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9333EA" />
          <stop offset="50%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>
        <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F3E8FF" />
        </linearGradient>
      </defs>

      {/* Main circle background */}
      <circle cx="50" cy="50" r="48" fill="url(#logoGradient)" />

      {/* Brain with twist - stylized */}
      <g transform="translate(20, 22) scale(0.6)">
        {/* Left brain hemisphere */}
        <path
          d="M45 10 C25 10, 10 30, 10 50 C10 70, 20 85, 35 90 C40 91, 45 90, 50 88"
          fill="url(#brainGradient)"
          stroke="white"
          strokeWidth="2"
        />
        {/* Right brain hemisphere */}
        <path
          d="M55 10 C75 10, 90 30, 90 50 C90 70, 80 85, 65 90 C60 91, 55 90, 50 88"
          fill="url(#brainGradient)"
          stroke="white"
          strokeWidth="2"
        />

        {/* Brain folds/gyri - left */}
        <path
          d="M20 35 Q30 30, 40 35"
          fill="none"
          stroke="#9333EA"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M15 50 Q30 45, 45 50"
          fill="none"
          stroke="#EC4899"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M20 65 Q35 60, 45 65"
          fill="none"
          stroke="#F97316"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Brain folds/gyri - right */}
        <path
          d="M60 35 Q70 30, 80 35"
          fill="none"
          stroke="#9333EA"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M55 50 Q70 45, 85 50"
          fill="none"
          stroke="#EC4899"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M55 65 Q65 60, 80 65"
          fill="none"
          stroke="#F97316"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Twist in the middle - spiral */}
        <path
          d="M50 30 Q55 40, 45 50 Q35 60, 50 70 Q65 80, 55 90"
          fill="none"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </g>

      {/* Sparkles for whimsy */}
      <circle cx="15" cy="20" r="3" fill="white" opacity="0.8" />
      <circle cx="85" cy="25" r="2" fill="white" opacity="0.8" />
      <circle cx="80" cy="80" r="2.5" fill="white" opacity="0.8" />
      <circle cx="20" cy="75" r="2" fill="white" opacity="0.8" />
    </svg>
  );
}
