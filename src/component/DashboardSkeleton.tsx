export default function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-gray-800 rounded-lg p-4 animate-pulse">
          <div className="h-6 bg-gray-700 rounded mb-4 w-3/4"></div>
          <div className="h-4 bg-gray-700 rounded mb-2 w-full"></div>
          <div className="h-4 bg-gray-700 rounded mb-2 w-5/6"></div>
          <div className="h-4 bg-gray-700 rounded mb-4 w-2/3"></div>
          <div className="h-8 bg-gray-700 rounded w-24"></div>
        </div>
      ))}
    </div>
  );
}
