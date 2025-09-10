import { Calendar, Clock, Users } from "lucide-react";

// Helper function to get icon component
export const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "Calendar":
      return Calendar;
    case "Clock":
      return Clock;
    case "Users":
      return Users;
    default:
      return Calendar;
  }
};

// Helper function to get icon color classes
export const getIconColorClasses = (color: string) => {
  switch (color) {
    case "green":
      return "bg-green-100 text-green-600";
    case "blue":
      return "bg-blue-100 text-blue-600";
    case "purple":
      return "bg-purple-100 text-purple-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};
