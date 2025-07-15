import GoalItem from './GoalItem';

export default function Goals() {
  const goalsData = [
    {
      title: 'Running on Track',
      rounds: '05 Rounds',
      date: 'Saturday, April 10',
      time: '08:00 AM'
    },
    {
      title: 'Push Up',
      rounds: '50 Reco...',
      date: 'Sunday, April 11',
      time: '08:00 AM'
    }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">Goals</h3>
        <button className="text-orange-500 text-sm hover:text-orange-600">View All →</button>
      </div>
      
      <div className="space-y-4">
        {goalsData.map((goal, index) => (
          <GoalItem
            key={index}
            title={goal.title}
            rounds={goal.rounds}
            date={goal.date}
            time={goal.time}
          />
        ))}
      </div>
    </div>
  );
}