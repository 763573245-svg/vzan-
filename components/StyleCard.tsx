
import React from 'react';
import { StyleType } from '../types';

interface StyleCardProps {
  type: StyleType;
  description: string;
  icon: string;
  color: string;
  isSelected: boolean;
  onClick: () => void;
}

const StyleCard: React.FC<StyleCardProps> = ({
  type,
  description,
  icon,
  color,
  isSelected,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-xl border-2 p-4 transition-all duration-200 hover:shadow-md ${
        isSelected
          ? `${color} ring-2 ring-offset-2 ring-indigo-500 border-transparent`
          : 'bg-white border-gray-100 hover:border-indigo-200'
      }`}
    >
      <div className="flex items-center space-x-3 mb-2">
        <span className="text-2xl">{icon}</span>
        <h3 className="font-semibold text-gray-900">{type}</h3>
      </div>
      <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
    </div>
  );
};

export default StyleCard;
