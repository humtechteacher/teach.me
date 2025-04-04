import { activities, featuredActivity } from "@/lib/activities";
import FeaturedActivity from "@/components/FeaturedActivity";
import ActivityCard from "@/components/ActivityCard";

// Home page component that displays all available activities
const HomePage = () => {
  return (
    <div className="container-app">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Welcome to EdTech Activity Hub</h1>
      
      <p className="text-lg text-gray-700 mb-8">
        A platform designed to help students develop critical thinking skills through interactive activities.
      </p>
      
      {/* Featured Activity Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Featured Activity</h2>
        <FeaturedActivity activity={featuredActivity} />
      </div>
      
      {/* All Activities Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">All Activities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity, index) => (
            <ActivityCard key={index} activity={activity} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
