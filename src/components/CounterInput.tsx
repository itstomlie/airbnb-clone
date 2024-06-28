import { Minus, Plus } from "lucide-react";
import React from "react";

type Counts = {
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
};

interface CounterInputProps {
  label: string;
  name: keyof Counts;
  value: number;
  onDecrease: (name: keyof Counts) => void;
  onIncrease: (name: keyof Counts) => void;
  onChange: (name: keyof Counts, value: number) => void;
}

const CounterInput: React.FC<CounterInputProps> = ({
  label,
  name,
  value,
  onDecrease,
  onIncrease,
  onChange,
}) => {
  return (
    <div className="w-full flex justify-between border-b py-5">
      <p className="text-lg">{label}</p>
      <div className="flex items-center">
        <button
          className="border border-black rounded-full border-opacity-50 p-[3px] cursor-pointer"
          type="button"
          onClick={() => onDecrease(name)}
        >
          <Minus size={20} strokeWidth={1.5} />
        </button>

        <input
          type="number"
          name={name}
          value={value}
          onChange={(e) => onChange(name, parseInt(e.target.value))}
          className="text-center w-8 mx-1"
        />
        <button
          className="border border-black rounded-full border-opacity-50 p-[3px] cursor-pointer"
          type="button"
          onClick={() => onIncrease(name)}
        >
          <Plus size={20} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
};

export default CounterInput;
