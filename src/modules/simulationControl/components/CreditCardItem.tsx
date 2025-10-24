// modules/simulationControl/components/CreditCardItem.tsx
import React, { useState, useEffect } from 'react';
import type { CreditCard } from '../types';

interface CreditCardItemProps {
  card: CreditCard;
  isSelected: boolean;
  onToggleSelect: (cardId: string) => void;
  disabled?: boolean;
  isSimulationRunning?: boolean;
}

export const CreditCardItem: React.FC<CreditCardItemProps> = ({
  card,
  isSelected,
  onToggleSelect,
  disabled = false,
  isSimulationRunning = false,
}) => {
  const [previousBalance, setPreviousBalance] = useState(card.balance);
  const [isBalanceChanging, setIsBalanceChanging] = useState(false);

  useEffect(() => {
    if (card.balance !== previousBalance) {
      setIsBalanceChanging(true);
      setPreviousBalance(card.balance);
      
      const timer = setTimeout(() => {
        setIsBalanceChanging(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [card.balance, previousBalance]);

  const formatCardNumber = (number: string): string => {
    return number.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const formatBalance = (balance: number): string => {
    return new Intl.NumberFormat('es-CR', {
      style: 'currency',
      currency: 'CRC',
      minimumFractionDigits: 0,
    }).format(balance);
  };

  const calculatePercentage = (): number => {
    if (!card.initialBalance || card.initialBalance === 0) return 100;
    return (card.balance / card.initialBalance) * 100;
  };

  const getBalanceColor = (): string => {
    const percentage = calculatePercentage();
    if (percentage > 50) return 'text-green-400';
    if (percentage > 25) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div
      onClick={() => !disabled && onToggleSelect(card.id)}
      className={`relative bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-6 shadow-xl transition-all transform ${
        !disabled ? 'cursor-pointer hover:scale-105' : ''
      } ${
        isSelected ? 'ring-4 ring-green-400 ring-offset-2' : ''
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {isSelected && (
        <div className="absolute top-3 right-3 bg-green-500 rounded-full p-1 z-10">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}

      {isSimulationRunning && isSelected && (
        <div className="absolute top-3 left-3 z-10">
          <div className="flex items-center space-x-1 bg-green-500 bg-opacity-90 rounded-full px-2 py-1">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-white text-xs font-semibold">ACTIVA</span>
          </div>
        </div>
      )}

      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center backdrop-blur-sm">
            <span className="text-white font-bold text-xs">La Roja</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-6 h-6 bg-amber-400 rounded-full"></div>
            <div className="w-6 h-6 bg-amber-400 rounded-full -ml-3"></div>
            <div className="w-6 h-6 bg-amber-400 rounded-full -ml-3"></div>
          </div>
        </div>
        <div className="text-white font-bold text-2xl">BAC</div>
      </div>

      <div className="mb-6">
        <div className="text-white text-lg font-mono tracking-wider">
          {formatCardNumber(card.cardNumber)}
        </div>
      </div>

      <div className="mb-4">
        <div className="text-white text-opacity-80 text-xs mb-1">NOMBRE DEL TARJETAHABIENTE</div>
        <div className="text-white font-semibold text-sm uppercase">
          {card.holderName}
        </div>
      </div>

      <div className="flex justify-between items-end">
        <div className="flex-1">
          <div className="text-white text-opacity-80 text-xs mb-1">SALDO DISPONIBLE</div>
          <div 
            className={`text-white font-bold text-xl transition-all duration-300 ${
              isBalanceChanging ? 'scale-110 text-yellow-300' : ''
            }`}
          >
            {formatBalance(card.balance)}
          </div>
          
          {isSimulationRunning && isSelected && card.initialBalance && (
            <div className="mt-2">
              <div className="w-full bg-white bg-opacity-20 rounded-full h-1.5 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 rounded-full ${
                    calculatePercentage() > 50 ? 'bg-green-400' : 
                    calculatePercentage() > 25 ? 'bg-yellow-400' : 'bg-red-400'
                  }`}
                  style={{ width: `${calculatePercentage()}%` }}
                />
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className={`text-xs font-semibold ${getBalanceColor()}`}>
                  {calculatePercentage().toFixed(0)}%
                </span>
                {card.lastTransaction && (
                  <span className="text-xs text-white text-opacity-60">
                    -{formatBalance(card.lastTransaction.amount)}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="w-12 h-12 bg-amber-400 rounded-lg opacity-80 ml-2"></div>
      </div>

      {isSimulationRunning && isSelected && card.lastTransaction && (
        <div className="mt-3 pt-3 border-t border-white border-opacity-20">
          <div className="flex items-center justify-between text-xs">
            <span className="text-white text-opacity-70">Última transacción</span>
            <span className="text-white font-semibold">
              {new Date(card.lastTransaction.date).toLocaleTimeString('es-CR', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};