import React from "react";
import javaSvgUrl from "../assets/course-logos/java.svg";
import pythonSvgUrl from "../assets/course-logos/python.svg";
import powerbiSvgUrl from "../assets/course-logos/powerbi.svg";

/**
 * Official Java Logo Component
 * Authentic Sun/Oracle Java coffee cup with red steam and blue cup.
 */
export function JavaIcon({ className = "w-6 h-6", ...props }) {
  return (
    <svg
      viewBox="0 0 128 128"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Java Logo"
      {...props}
    >
      <path
        fill="#0074BD"
        d="M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969zm-2.988-13.665s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336z"
      />
      <path
        fill="#EA2D2E"
        d="M69.802 61.271c6.025 6.935-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.792 15.635-29.58 0 .001-42.731 10.67-22.324 34.187z"
      />
      <path
        fill="#0074BD"
        d="M102.123 108.229s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.094.171-4.451-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.953-3.487-32.013 6.85-13.743 9.815 49.821 8.076 90.817-3.637 77.896-9.468zM49.912 70.294s-22.686 5.389-8.033 7.348c6.188.828 18.518.638 30.011-.326 9.39-.789 18.813-2.474 18.813-2.474s-3.308 1.419-5.704 3.053c-23.042 6.061-67.544 3.238-54.731-2.958 10.832-5.239 19.644-4.643 19.644-4.643zm40.697 22.747c23.421-12.167 12.591-23.86 5.032-22.285-1.848.385-2.677.72-2.677.72s.688-1.079 2-1.543c14.953-5.255 26.451 15.503-4.823 23.725 0-.002.359-.327.468-.617z"
      />
      <path
        fill="#EA2D2E"
        d="M76.491 1.587S89.459 14.563 64.188 34.51c-20.266 16.006-4.621 25.13-.007 35.559-11.831-10.673-20.509-20.07-14.688-28.815C58.041 28.42 81.722 22.195 76.491 1.587z"
      />
      <path
        fill="#0074BD"
        d="M52.214 126.021c22.476 1.437 57-.8 57.817-11.436 0 0-1.571 4.032-18.577 7.231-19.186 3.612-42.854 3.191-56.887.874 0 .001 2.875 2.381 17.647 3.331z"
      />
    </svg>
  );
}

/**
 * Official Python Logo Component
 * Authentic Python Software Foundation blue & yellow interlocking snakes with dots.
 */
export function PythonIcon({ className = "w-6 h-6", ...props }) {
  return (
    <svg
      viewBox="0 0 128 128"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Python Logo"
      {...props}
    >
      <defs>
        <linearGradient id="python-blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#387EB8" />
          <stop offset="100%" stopColor="#306998" />
        </linearGradient>
        <linearGradient id="python-yellow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE873" />
          <stop offset="100%" stopColor="#FFD43B" />
        </linearGradient>
      </defs>
      {/* Top Snake (Blue) */}
      <path
        fill="url(#python-blue-grad)"
        d="M63.391 12.248c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V77.494c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V26.093c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 19.817c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z"
      />
      {/* Bottom Snake (Yellow) */}
      <path
        fill="url(#python-yellow-grad)"
        d="M91.682 38.64v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938V92.74h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 98.187c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z"
      />
    </svg>
  );
}

/**
 * Official Data Analytics / Microsoft Power BI Logo Component
 * Authentic multi-tiered data visualization bars with Microsoft gold/amber gradients and depth.
 */
export function DataAnalyticsIcon({ className = "w-6 h-6", ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-100 0 1400 1600"
      className={className}
      fill="none"
      role="img"
      aria-label="Data Analytics & Power BI Logo"
      {...props}
    >
      <defs>
        <linearGradient id="pbi-back-bar" x1="758" y1="0" x2="1448" y2="1507" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E6AD10" />
          <stop offset="1" stopColor="#C87E0E" />
        </linearGradient>
        <linearGradient id="pbi-mid-bar" x1="525" y1="400" x2="1106" y2="1562" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F6D751" />
          <stop offset="1" stopColor="#E6AD10" />
        </linearGradient>
        <linearGradient id="pbi-front-bar" x1="200" y1="800" x2="520" y2="1582" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F9E589" />
          <stop offset="1" stopColor="#F6D751" />
        </linearGradient>
        <filter id="pbi-drop-shadow" x="515" y="390" width="570" height="1225" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="3" stdDeviation="5" floodOpacity="0.22" />
        </filter>
      </defs>
      <g transform="translate(-200, 0)">
        {/* Right / Back Tall Bar */}
        <path
          d="m 1400,66.75 v 1466.5 c 0,36.86 -29.89,66.75 -66.75,66.75 H 916.75 C 879.885,1600 850,1570.11 850,1533.25 V 66.75 C 850,29.885 879.885,0 916.75,0 h 416.5 c 36.87,0 66.75,29.8849 66.75,66.75 z"
          fill="url(#pbi-back-bar)"
        />
        {/* Middle Bar with Shadow */}
        <g filter="url(#pbi-drop-shadow)">
          <path
            d="M 1075,466.667 V 1600 H 525 V 466.667 C 525,429.848 554.848,400 591.667,400 h 416.663 c 36.82,0 66.67,29.848 66.67,66.667 z"
            fill="url(#pbi-mid-bar)"
          />
        </g>
        {/* Left / Front Short Bar */}
        <path
          d="m 200,866.667 v 666.663 c 0,36.82 29.848,66.67 66.667,66.67 H 750 V 866.667 C 750,829.848 720.152,800 683.333,800 H 266.667 C 229.848,800 200,829.848 200,866.667 Z"
          fill="url(#pbi-front-bar)"
        />
      </g>
    </svg>
  );
}

/**
 * Helper to get the matching official course icon component by course id or slug
 */
export function getCourseIcon(courseId) {
  switch (courseId) {
    case "java-full-stack-ai":
      return JavaIcon;
    case "python-full-stack-ai":
      return PythonIcon;
    case "data-analytics":
      return DataAnalyticsIcon;
    default:
      return JavaIcon;
  }
}

/**
 * Helper to get the official course SVG image URL by course id or slug
 */
export function getCourseSvgUrl(courseId) {
  switch (courseId) {
    case "java-full-stack-ai":
      return javaSvgUrl;
    case "python-full-stack-ai":
      return pythonSvgUrl;
    case "data-analytics":
      return powerbiSvgUrl;
    default:
      return javaSvgUrl;
  }
}

export { javaSvgUrl, pythonSvgUrl, powerbiSvgUrl };
