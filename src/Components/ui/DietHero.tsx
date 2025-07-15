import DietHeroContent from './DietHeroContent';
import DietHeroIcon from './DietHeroIcon';

export default function DietHero() {
  return (
    <div className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-2xl p-6 lg:p-8 text-white relative overflow-hidden">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
        <DietHeroContent />
        <DietHeroIcon />
      </div>
    </div>
  );
}