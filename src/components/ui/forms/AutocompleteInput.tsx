"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface AutocompleteInputProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  icon?: string;
  className?: string;
  variant?: "default" | "hero";
}

export default function AutocompleteInput({
  value,
  onChange,
  options,
  placeholder,
  icon,
  className = "",
  variant = "default",
}: AutocompleteInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter options based on input value
  useEffect(() => {
    if (value) {
      const filtered = options.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(options);
    }
  }, [value, options]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    setIsOpen(true);
  };

  const handleOptionClick = (option: string) => {
    onChange(option);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const inputClasses =
    variant === "hero"
      ? "w-full px-4 py-3 pr-8 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      : "w-full px-4 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent";

  const dropdownClasses =
    variant === "hero"
      ? "absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg max-h-60 overflow-y-auto"
      : "absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto";

  const buttonClasses =
    variant === "hero"
      ? "w-full text-left px-4 py-3 hover:bg-blue-50 hover:text-blue-700 focus:bg-blue-50 focus:text-blue-700 focus:outline-none transition-colors first:rounded-t-xl last:rounded-b-xl"
      : "w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-700 focus:bg-blue-50 focus:text-blue-700 focus:outline-none transition-colors";

  const iconPosition =
    variant === "hero"
      ? "top-1/2 -translate-y-1/2"
      : "top-1/2 -translate-y-1/2";

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={inputClasses}
          autoComplete="off"
        />
        <div
          className={`absolute right-3 ${iconPosition} flex items-center gap-1 cursor-pointer hover:text-gray-600 transition-colors`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {icon && (
            <span className="text-gray-400 flex items-center select-none text-sm">
              {icon}
            </span>
          )}
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && filteredOptions.length > 0 && (
        <div className={dropdownClasses}>
          {filteredOptions.map((option, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleOptionClick(option)}
              className={buttonClasses}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {/* No options found */}
      {isOpen && value && filteredOptions.length === 0 && (
        <div className={dropdownClasses}>
          <div
            className={
              variant === "hero"
                ? "px-4 py-3 text-gray-500 text-sm"
                : "px-4 py-2 text-gray-500 text-sm"
            }
          >
            No se encontraron opciones
          </div>
        </div>
      )}
    </div>
  );
}
