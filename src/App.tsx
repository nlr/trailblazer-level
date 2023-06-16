import { useCallback, useEffect, useState, useMemo } from "react";
import { levels, dailyActivityExp, powerRefill, getDateAfter } from "./calc";
import "./App.css";

const MAX_LEVEL = 66;
const dailyPower = 240;

function App() {
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [goalLevel, setGoalLevel] = useState<number>(MAX_LEVEL);
  const [currentExp, setCurrentExp] = useState<number>(0);
  const [refillsPerDay, setRefillsPerDay] = useState<number>(0);
  const [weeklyImmersifiers, setWeeklyImmersifiers] = useState<number>(4);
  const [fuels, setFuels] = useState<number>(0);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const data = localStorage.getItem("levelCalcData");
    if (data) {
      const {
        currentLevel: savedCurrentLevel,
        goalLevel: savedGoalLevel,
        currentExp: savedCurrentExp,
        refillsPerDay: savedRefillsPerDay,
        weeklyImmersifiers: savedWeeklyImmersifiers,
        fuels: savedFuels,
      } = JSON.parse(data);
      setCurrentLevel(savedCurrentLevel);
      setGoalLevel(savedGoalLevel);
      setCurrentExp(savedCurrentExp);
      setRefillsPerDay(savedRefillsPerDay);
      setWeeklyImmersifiers(savedWeeklyImmersifiers);
      setFuels(savedFuels);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "levelCalcData",
      JSON.stringify({
        currentLevel,
        goalLevel,
        currentExp,
        refillsPerDay,
        weeklyImmersifiers,
        fuels,
      })
    );
  }, [
    currentLevel,
    goalLevel,
    currentExp,
    refillsPerDay,
    weeklyImmersifiers,
    fuels,
  ]);

  const validateFields = useCallback(() => {
    if (
      isNaN(currentLevel) ||
      isNaN(goalLevel) ||
      isNaN(currentExp) ||
      isNaN(refillsPerDay) ||
      isNaN(weeklyImmersifiers) ||
      isNaN(fuels)
    ) {
      setError("All fields must be filled");
      return false;
    }

    if (currentLevel < 1 || currentLevel > MAX_LEVEL) {
      setError("Invalid current level");
      return false;
    }

    if (goalLevel < 1 || goalLevel > MAX_LEVEL || goalLevel < currentLevel) {
      setError("Invalid goal level");
      return false;
    }

    if (currentExp < 0) {
      setError("Current EXP cannot be negative");
      return false;
    }

    if (refillsPerDay < 0 || refillsPerDay > 8) {
      setError("Invalid number of refills per day");
      return false;
    }

    if (weeklyImmersifiers < 0 || weeklyImmersifiers > 4) {
      setError("Invalid number of weekly immersifiers");
      return false;
    }

    if (fuels < 0) {
      setError("Fuels cannot be negative");
      return false;
    }

    setError("");
    return true;
  }, [
    currentLevel,
    goalLevel,
    currentExp,
    refillsPerDay,
    weeklyImmersifiers,
    fuels,
  ]);

  const calculateDaysRequired = useCallback((): number => {
    if (!validateFields()) {
      return 0;
    }
    const daysRequired =
      1 +
      (totalExpRequired(currentLevel, goalLevel, currentExp) -
        ((fuels * 60) / 10) * 50) /
        (dailyExpTotal(currentLevel) +
          ((refillsPerDay * 60) / 10) * 50 +
          (((weeklyImmersifiers * 40) / 10) * 50) / 7);

    return Number(daysRequired.toFixed(2) as unknown as number);
  }, [
    currentLevel,
    goalLevel,
    currentExp,
    refillsPerDay,
    weeklyImmersifiers,
    fuels,
    validateFields,
  ]);

  const days = useMemo(() => {
    return calculateDaysRequired();
  }, [calculateDaysRequired]);

  const jadeTotalCostPerDay = useMemo(() => {
    if (refillsPerDay > 0 && refillsPerDay <= 8) {
      return powerRefill[refillsPerDay].totalCost;
    }
  }, [refillsPerDay]);

  const goalStellarJadeCost = useMemo(() => {
    if (jadeTotalCostPerDay === undefined) {
      return 0;
    }
    return calculateDaysRequired() * jadeTotalCostPerDay;
  }, [calculateDaysRequired, jadeTotalCostPerDay]);

  const handleInputChange = useCallback(
    (setter: React.Dispatch<React.SetStateAction<number>>) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "") {
          setter(e.target.value);
        }
        const value = parseInt(e.target.value);
        if (!isNaN(value)) {
          // Check if value is a valid number
          setter(value);
        }
      },
    []
  );

  const date = useCallback(() => {
    return getDateAfter(days);
  }, [days]);

  return (
    <div className="p-6 max-w-sm mx-auto font-sans antialiased">
      <div className="  ">
        <label>
          Current Level:
          <input
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="number"
            min={1}
            max={goalLevel}
            value={currentLevel}
            onChange={handleInputChange(setCurrentLevel)}
          />
        </label>
        <br />
        <label>
          Goal Level:
          <input
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="number"
            min={1}
            max={MAX_LEVEL}
            value={goalLevel}
            onChange={handleInputChange(setGoalLevel)}
          />
        </label>
        <br />
        <label>
          Current EXP:
          <input
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="number"
            value={currentExp}
            min={0}
            onChange={handleInputChange(setCurrentExp)}
          />
        </label>
        <br />
        <label>
          Refills per Day:
          <input
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="number"
            value={refillsPerDay}
            min={0}
            max={8}
            onChange={handleInputChange(setRefillsPerDay)}
          />
        </label>
        <br />
        <label>
          Weekly Immersifiers:
          <input
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="number"
            value={weeklyImmersifiers}
            min={0}
            max={4}
            onChange={handleInputChange(setWeeklyImmersifiers)}
          />
        </label>
        <label>
          Fuels:
          <input
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="number"
            value={fuels}
            min={0}
            onChange={handleInputChange(setFuels)}
          />
        </label>
      </div>
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      {!error && (
        <>
          <div className="mt-4">
            Expected Finish Date is: <strong>{date()}</strong> or{" "}
            <strong>{days}</strong> day(s)
          </div>
          {refillsPerDay > 0 && (
            <div className="mt-4">
              Stellar Jade Refill Cost: {jadeTotalCostPerDay}
              <br />
              Total: {goalStellarJadeCost}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;

function dailyExpTotal(currentLevel: number): number {
  if (
    levels[currentLevel] &&
    dailyActivityExp.has(levels[currentLevel].equilibriumLevel)
  ) {
    const dailyExp = dailyActivityExp.get(
      levels[currentLevel].equilibriumLevel
    ) as number;
    return (dailyPower / 10) * 50 + dailyExp * 5;
  }
  return 1;
}

function totalExpRequired(
  currentLevel: number,
  goalLevel: number,
  currentExp: number
) {
  if (levels[goalLevel] && levels[currentLevel]) {
    return (
      levels[goalLevel].totalExp - levels[currentLevel].totalExp - currentExp
    );
  }
  return 0;
}
