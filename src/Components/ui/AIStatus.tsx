export default function AIStatus() {
  return (
    <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl p-4 text-white">
      <div className="mb-3">
        <div className="text-sm font-medium mb-1">AI Fitness Coach</div>
        <div className="text-xs text-orange-100 mb-4">
          Available 24/7 to help you reach your goals
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm">Status</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="font-bold text-sm">Online</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">Expertise</span>
          <span className="font-bold text-sm">Fitness & Nutrition</span>
        </div>
      </div>
    </div>
  );
} 