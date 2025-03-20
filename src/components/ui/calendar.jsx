import * as React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export function Calendar({ selected, onSelect, fromDate, className }) {
  return (
    <div className={`p-4 bg-white rounded-lg shadow-md border border-gray-200 ${className}`}>
      <DayPicker 
        mode="single" 
        selected={selected} 
        onSelect={onSelect} 
        fromDate={fromDate} // Prevent selecting past dates
      />
    </div>
  );
}
