import React from "react";
import { X as XIcon } from "lucide-react";

interface ProfileDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  onLogout: () => void;
}

const ProfileDropdown = React.forwardRef<HTMLDivElement, ProfileDropdownProps>(
  (props, ref) => {
    const { isOpen, onToggle, onLogout } = props;

    return (
      <div ref={ref} className="relative">
        <button
          onClick={onToggle}
          className="flex items-center gap-2 rounded-md p-2 hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          aria-haspopup="true"
          aria-label="User menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-600"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M6 10l4 4 4-4M6 14l4 4 4-4" />
          </svg>
        </button>

        {isOpen && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 mt-2 w-56 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 z-50"
          >
            <button
              onClick={onLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
            <button
              onClick={onToggle}
              className="w-full text-left px-4 py-2 text-sm text-gray-400 hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        )}
      </div>
    );
  }
);

ProfileDropdown.displayName = "ProfileDropdown";

export { ProfileDropdown };