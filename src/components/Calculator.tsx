'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/cannabis-utils';

interface CalculatorProps {
  className?: string;
  title?: string;
  onCalculate?: (result: number) => void;
}

/**
 * Cannabis Compliance Calculator Component
 * Provides calculation tools for cannabis business compliance metrics
 */
export const Calculator: React.FC<CalculatorProps> = ({ 
  className, 
  title = "Compliance Calculator",
  onCalculate 
}) => {
  const [display, setDisplay] = useState<string>('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputDot = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
      
      if (onCalculate) {
        onCalculate(newValue);
      }
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return secondValue !== 0 ? firstValue / secondValue : firstValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      performOperation('=');
      setOperation(null);
      setPreviousValue(null);
      setWaitingForOperand(true);
    }
  };

  const Button: React.FC<{ 
    onClick: () => void; 
    className?: string; 
    children: React.ReactNode;
    variant?: 'number' | 'operator' | 'function';
  }> = ({ onClick, className, children, variant = 'number' }) => {
    const baseClasses = "h-12 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 active:scale-95";
    const variantClasses = {
      number: "bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300",
      operator: "bg-cannabis-primary hover:bg-cannabis-primary/90 text-white border border-cannabis-primary",
      function: "bg-red-500 hover:bg-red-600 text-white border border-red-500"
    };
    
    return (
      <button
        onClick={onClick}
        className={cn(baseClasses, variantClasses[variant], className)}
      >
        {children}
      </button>
    );
  };

  return (
    <div className={cn("bg-white rounded-xl shadow-lg border border-gray-200 p-6 max-w-sm mx-auto", className)}>
      {/* Title */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 text-center">{title}</h3>
        <p className="text-sm text-gray-600 text-center">Cannabis compliance calculations</p>
      </div>

      {/* Display */}
      <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
        <div className="text-right">
          <div className="text-2xl font-mono font-bold text-gray-800 min-h-[2rem] flex items-center justify-end">
            {display}
          </div>
        </div>
      </div>

      {/* Buttons Grid */}
      <div className="grid grid-cols-4 gap-2">
        {/* Row 1 */}
        <Button onClick={clear} variant="function" className="col-span-2">
          Clear
        </Button>
        <Button onClick={() => performOperation('÷')} variant="operator">
          ÷
        </Button>
        <Button onClick={() => performOperation('×')} variant="operator">
          ×
        </Button>

        {/* Row 2 */}
        <Button onClick={() => inputNumber('7')}>7</Button>
        <Button onClick={() => inputNumber('8')}>8</Button>
        <Button onClick={() => inputNumber('9')}>9</Button>
        <Button onClick={() => performOperation('-')} variant="operator">
          -
        </Button>

        {/* Row 3 */}
        <Button onClick={() => inputNumber('4')}>4</Button>
        <Button onClick={() => inputNumber('5')}>5</Button>
        <Button onClick={() => inputNumber('6')}>6</Button>
        <Button onClick={() => performOperation('+')} variant="operator">
          +
        </Button>

        {/* Row 4 */}
        <Button onClick={() => inputNumber('1')}>1</Button>
        <Button onClick={() => inputNumber('2')}>2</Button>
        <Button onClick={() => inputNumber('3')}>3</Button>
        <Button onClick={handleEquals} variant="operator" className="row-span-2">
          =
        </Button>

        {/* Row 5 */}
        <Button onClick={() => inputNumber('0')} className="col-span-2">
          0
        </Button>
        <Button onClick={inputDot}>.</Button>
      </div>

      {/* Cannabis-specific calculations */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          🌿 Cannabis compliance & tax calculations
        </p>
      </div>
    </div>
  );
};

export default Calculator;
