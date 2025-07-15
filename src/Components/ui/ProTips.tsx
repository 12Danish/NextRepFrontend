export default function ProTips() {
  const tips = [
    {
      title: '💡 Be Specific',
      description: 'Include details like your fitness level, goals, and preferences for better advice.',
      bgColor: 'bg-cyan-50',
      textColor: 'text-cyan-700',
      descColor: 'text-cyan-600'
    },
    {
      title: '📊 Track Progress',
      description: 'Ask me to help you create tracking systems for workouts and nutrition.',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      descColor: 'text-green-600'
    },
    {
      title: '🎯 Set Goals',
      description: 'Let me help you set SMART fitness goals and create action plans.',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      descColor: 'text-purple-600'
    }
  ];
  return (
    <div>
      <h3 className="font-semibold text-gray-800 mb-4">Pro Tips</h3>
      <div className="space-y-3">
        {tips.map((tip, idx) => (
          <div key={idx} className={`p-3 ${tip.bgColor} rounded-lg`}>
            <div className={`text-sm font-medium ${tip.textColor} mb-1`}>{tip.title}</div>
            <div className={`text-xs ${tip.descColor}`}>{tip.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 