import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: number;
}

export default function StarRating({ rating, size = 14 }: StarRatingProps) {
  return (
    <>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          size={size}
          className={index < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
        />
      ))}
    </>
  );
} 