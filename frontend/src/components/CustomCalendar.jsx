import { useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  format,
  isToday,
  startOfDay
} from "date-fns";
import { pl } from "date-fns/locale";

// Dodaj propsy selectedDate i setSelectedDate
export default function CustomCalendar({ selectedDate, setSelectedDate }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const renderHeader = () => (
    <div className="flex justify-between items-center mb-4">
      <button
        onClick={prevMonth}
        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        ‹
      </button>
      <h2 className="text-lg font-semibold">
        {format(currentMonth, "LLLL yyyy", { locale: pl })}
      </h2>
      <button
        onClick={nextMonth}
        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        ›
      </button>
    </div>
  );

  const renderDays = () => {
    const days = [];
    const date = startOfWeek(new Date(), { weekStartsOn: 1 });
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center font-medium text-gray-600">
          {format(addDays(date, i), "EEE", { locale: pl })}
        </div>
      );
    }
    return <div className="grid grid-cols-7 mb-2">{days}</div>;
  };

  const renderCells = () => {
    const rows = [];
    let days = [];
    let day = startDate;
    const today = new Date();

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isPast = day < startOfDay(today);
        const isCurrentDay = isToday(day);

        let cellClass = `
            p-2 text-center rounded cursor-pointer transition
            ${!isCurrentMonth ? "text-gray-400" : "text-gray-800"}
            ${isPast ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""}
            ${isSameDay(day, selectedDate) ? "bg-indigo-600 text-white" : ""}
            ${isCurrentDay ? "border-2 border-blue-400" : ""}
            ${!isPast && !isSameDay(day, selectedDate) ? "hover:bg-indigo-100" : ""}
        `;


        days.push(
          <div
            key={day}
            onClick={() => {
              if (isPast) return;
              if (!isCurrentMonth) {
                setCurrentMonth(startOfMonth(cloneDay));
                setSelectedDate(cloneDay);
              } else {
                setSelectedDate(cloneDay);
              }
            }}
            className={cellClass}
            style={isPast ? { pointerEvents: "none" } : {}}
          >
            {format(day, "d")}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day} className="grid grid-cols-7">
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md mx-auto">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
}
