import React from 'react';
import { cn } from '@/lib/utils';

// Color mapping utility
export const getColorClasses = (color: string) => {
  const colorMap: Record<string, string> = {
    yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    blue: 'bg-blue-100 text-blue-800 border-blue-200',
    indigo: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    green: 'bg-green-100 text-green-800 border-green-200',
    red: 'bg-red-100 text-red-800 border-red-200',
    gray: 'bg-gray-100 text-gray-800 border-gray-200',
  };
  
  return colorMap[color] || colorMap.gray;
};

interface StatusBadgeProps {
  status: string;
  statusColor: string;
  statusLabel: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function StatusBadge({ 
  status, 
  statusColor, 
  statusLabel, 
  size = 'md',
  className 
}: StatusBadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <span 
      className={cn(
        'rounded-full font-medium border inline-flex items-center',
        getColorClasses(statusColor),
        sizeClasses[size],
        className
      )}
    >
      {statusLabel}
    </span>
  );
}

interface ChangeTypeBadgeProps {
  orderChange?: string | null;
  orderChangeLabel?: string;
  orderChangeColor?: string;
  className?: string;
}

export function ChangeTypeBadge({ 
  orderChange, 
  orderChangeLabel, 
  orderChangeColor,
  className 
}: ChangeTypeBadgeProps) {
  if (!orderChange || !orderChangeLabel) {
    return <span className="text-gray-400 text-xs">Not Set</span>;
  }

  return (
    <StatusBadge
      status={orderChange}
      statusColor={orderChangeColor || 'gray'}
      statusLabel={orderChangeLabel}
      size="sm"
      className={className}
    />
  );
}

interface PricingDisplayProps {
  pricingType?: string | null;
  pricingTypeLabel?: string;
  pricingTypeColor?: string;
  formattedOrderAmount?: string;
  className?: string;
}

export function PricingDisplay({ 
  pricingType, 
  pricingTypeLabel,
  pricingTypeColor,
  formattedOrderAmount,
  className 
}: PricingDisplayProps) {
  if (!pricingType || !pricingTypeLabel) {
    return <span className="text-gray-400 text-xs">Not Set</span>;
  }

  return (
    <div className={cn('space-y-1', className)}>
      <StatusBadge
        status={pricingType}
        statusColor={pricingTypeColor || (pricingType === 'free' ? 'green' : 'blue')}
        statusLabel={pricingTypeLabel}
        size="sm"
      />
      {formattedOrderAmount && formattedOrderAmount !== 'Not Set' && (
        <div className="text-sm font-medium text-gray-700">
          {formattedOrderAmount}
        </div>
      )}
    </div>
  );
}