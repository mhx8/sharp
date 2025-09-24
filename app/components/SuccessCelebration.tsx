"use client";

import { useEffect, useState } from "react";

interface SuccessCelebrationProps {
  show: boolean;
  onClose: () => void;
  type?: 'budget' | 'idea';
  title?: string;
  message?: string;
}

export default function SuccessCelebration({
  show,
  onClose,
  type = 'budget',
  title,
  message,
}: SuccessCelebrationProps) {
  // Get default content based on type
  const getDefaultContent = () => {
    if (type === 'budget') {
      return {
        title: "Budget erfolgreich hinzugefügt! 💰",
        message: "Ihr Budget wurde erfolgreich zur Sammlung hinzugefügt!",
        image: "/budget.jpeg",
        alt: "Budget Success"
      };
    } else {
      return {
        title: "Idee erfolgreich geteilt! 💡",
        message: "Ihre Idee wurde erfolgreich zur Sammlung hinzugefügt!",
        image: "/sucess.avif",
        alt: "Idea Success"
      };
    }
  };

  const defaultContent = getDefaultContent();
  const displayTitle = title || defaultContent.title;
  const displayMessage = message || defaultContent.message;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      // Auto-close after 4 seconds
      const timer = setTimeout(() => {
        handleClose();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [show]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 500); // Wait for fade-out animation
  };

  if (!show) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`
          fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm
          transition-opacity duration-500
          ${isVisible ? "opacity-100" : "opacity-0"}
        `}
        onClick={handleClose}
      />

      {/* Success Modal */}
      <div
        className={`
          fixed inset-0 z-[9999] flex items-center justify-center p-4
          transition-all duration-500 ease-out
          ${isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"}
        `}
      >
        <div className="relative max-w-md w-full">
          {/* Success Image with Animation */}
          <div className="relative mb-6 flex justify-center">
            <div
              className={`
              transform transition-all duration-700 ease-out
              ${isVisible ? "scale-100 rotate-0" : "scale-50 rotate-12"}
            `}
            >
              <img
                src={defaultContent.image}
                alt={defaultContent.alt}
                className="w-48 h-48 object-cover rounded-full shadow-2xl animate-bounce"
                style={{
                  animationDuration: "1s",
                  animationIterationCount: "3",
                }}
              />
            </div>

            {/* Sparkle Effects */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`
                    absolute w-2 h-2 bg-yellow-400 rounded-full
                    animate-ping
                  `}
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: "1.5s",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Success Card */}
          <div
            className={`
            card bg-white shadow-2xl
            transform transition-all duration-500 delay-200
            ${isVisible ? "translate-y-0" : "translate-y-8"}
          `}
          >
            <div className="card-body text-center">
              <h2 className="card-title text-2xl justify-center text-green-600 mb-2">
                {displayTitle}
              </h2>
              <p className="text-gray-600 mb-6">{displayMessage}</p>

              {/* Animated Checkmark */}
              <div className="flex justify-center mb-4">
                <div
                  className={`
                  w-16 h-16 rounded-full bg-green-100 flex items-center justify-center
                  transform transition-all duration-700 delay-300
                  ${isVisible ? "scale-100" : "scale-0"}
                `}
                >
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M5 13l4 4L19 7"
                      className={`
                        ${isVisible ? "animate-draw-check" : ""}
                      `}
                      style={{
                        strokeDasharray: "20",
                        strokeDashoffset: isVisible ? "0" : "20",
                        transition: "stroke-dashoffset 0.5s ease-in-out 0.5s",
                      }}
                    />
                  </svg>
                </div>
              </div>

              <div className="card-actions justify-center">
                <button
                  onClick={handleClose}
                  className={`
                    btn btn-primary btn-wide
                    transform transition-all duration-500 delay-500
                    ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}
                  `}
                >
                  Weiter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes draw-check {
          to {
            stroke-dashoffset: 0;
          }
        }
        
        .animate-draw-check {
          animation: draw-check 0.5s ease-in-out 0.5s forwards;
        }
      `}</style>
    </>
  );
}
