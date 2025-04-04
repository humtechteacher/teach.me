import { Link } from "wouter";
import { Activity } from "@/lib/types";

// Props interface for the ActivityCard component
interface ActivityCardProps {
  activity: Activity;
}

// Component for displaying an activity in a card format on the home page
const ActivityCard = ({ activity }: ActivityCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden activity-card">
      {/* SVG Icon for the activity */}
      <div className="h-48 w-full flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
        <div className="w-32 h-32 text-primary">
          {activity.icon}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-bold text-lg mb-2">{activity.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{activity.description}</p>
        
        {/* Button changes based on availability */}
        {activity.available ? (
          <Link href={activity.path}>
            <button className="btn-primary">
              Start Activity
            </button>
          </Link>
        ) : (
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition cursor-not-allowed" disabled>
            Coming Soon
          </button>
        )}
      </div>
    </div>
  );
};

export default ActivityCard;
