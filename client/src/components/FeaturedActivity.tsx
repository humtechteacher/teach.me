import { Link } from "wouter";
import { Activity } from "@/lib/types";

// Props interface for the FeaturedActivity component
interface FeaturedActivityProps {
  activity: Activity;
}

// Component for displaying the featured activity in a prominent card on the home page
const FeaturedActivity = ({ activity }: FeaturedActivityProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="md:flex">
        <div className="md:flex-shrink-0 flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50 p-6 md:w-48">
          <div className="w-24 h-24 text-primary">
            {activity.icon}
          </div>
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-primary font-semibold">{activity.category}</div>
          <Link href={activity.path} className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
            {activity.title}
          </Link>
          <p className="mt-2 text-gray-500">{activity.description}</p>
          {activity.available ? (
            <Link href={activity.path}>
              <button className="mt-4 btn-primary">
                Start Activity
              </button>
            </Link>
          ) : (
            <button className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition cursor-not-allowed" disabled>
              Coming Soon
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedActivity;
