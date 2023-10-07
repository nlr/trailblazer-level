import { useCallback, useEffect, useState, useMemo } from "react";
import { levels, dailyActivityExp, powerRefill, getDateAfter } from "./calc";
import { Analytics } from "@vercel/analytics/react";
import "./App.css";
import { QrCodeAccordion } from "./QrCodeAccordion";

const MAX_LEVEL = 70;
const dailyPower = 240;

const initialValues = {
  currentLevel: 1,
  goalLevel: MAX_LEVEL,
  currentExp: 0,
  refillsPerDay: 0,
  weeklyImmersifiers: 4,
  fuels: 0,
};

function App() {
  const [currentLevel, setCurrentLevel] = useState<number>((): number => {
    const data = localStorage.getItem("levelCalcData");
    if (data) {
      const temp = JSON.parse(data);
      return temp.currentLevel;
    } else {
      return initialValues.currentLevel;
    }
  });
  const [goalLevel, setGoalLevel] = useState<number>((): number => {
    const data = localStorage.getItem("levelCalcData");
    if (data) {
      const temp = JSON.parse(data);
      return temp.goalLevel;
    } else {
      return initialValues.goalLevel;
    }
  });
  const [currentExp, setCurrentExp] = useState<number>((): number => {
    const data = localStorage.getItem("levelCalcData");
    if (data) {
      const temp = JSON.parse(data);
      return temp.currentExp;
    } else {
      return initialValues.currentExp;
    }
  });
  const [refillsPerDay, setRefillsPerDay] = useState<number>(
    initialValues.refillsPerDay
  );
  const [weeklyImmersifiers, setWeeklyImmersifiers] = useState<number>(
    initialValues.weeklyImmersifiers
  );
  const [fuels, setFuels] = useState<number>(initialValues.fuels);
  const [error, setError] = useState<string>("");

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

    const totalExpReq = totalExpRequired(currentLevel, goalLevel, currentExp);
    const expFromFuels = ((fuels * 60) / 10) * 50;
    const expFromDailies = dailyExpTotal(currentLevel);
    const expFromRefills = ((refillsPerDay * 60) / 10) * 50;
    const expFromImmersifiers = ((weeklyImmersifiers * 40) / 10) * 50;

    const daysRequired =
      1 +
      (totalExpReq - expFromFuels) /
        (expFromDailies + expFromRefills + expFromImmersifiers / 7);

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
    return Math.round(calculateDaysRequired() * jadeTotalCostPerDay);
  }, [calculateDaysRequired, jadeTotalCostPerDay]);

  const handleInputChange = useCallback(
    (setter: React.Dispatch<React.SetStateAction<number>>) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        setter(value);
      },
    []
  );

  const date = useCallback(() => {
    return getDateAfter(days);
  }, [days]);

  return (
    <>
      <div className="p-6 max-w-lg mx-auto font-sans antialiased">
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Current Level:
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="number"
                  min={1}
                  max={goalLevel}
                  value={currentLevel}
                  onChange={handleInputChange(setCurrentLevel)}
                />
              </label>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Goal Level:
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="number"
                  min={1}
                  max={MAX_LEVEL}
                  value={goalLevel}
                  onChange={handleInputChange(setGoalLevel)}
                />
              </label>
            </div>
          </div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Current EXP:
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number"
              value={currentExp}
              min={0}
              onChange={handleInputChange(setCurrentExp)}
            />
          </label>
          <br />
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Refills per Day:
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number"
              value={refillsPerDay}
              min={0}
              max={8}
              onChange={handleInputChange(setRefillsPerDay)}
            />
          </label>
          <br />
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Weekly Immersifiers:
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number"
              value={weeklyImmersifiers}
              min={0}
              max={4}
              onChange={handleInputChange(setWeeklyImmersifiers)}
            />
          </label>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Fuels:
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number"
              value={fuels}
              min={0}
              onChange={handleInputChange(setFuels)}
            />
          </label>
        </div>
        <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        {error && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{error}</span>
          </div>
        )}
        {!error && (
          <>
            <div>
              Total EXP required:{" "}
              <strong>
                {totalExpRequired(currentLevel, goalLevel, currentExp)}
              </strong>
            </div>
            <div className="mt-4">
              Projection target date is: <strong>{date()}</strong> or{" "}
              <strong>{days}</strong> day(s)
            </div>
            {refillsPerDay > 0 && (
              <div className="mt-4">
                <p>
                  Stellar Jade Refill Cost:{" "}
                  <strong>{jadeTotalCostPerDay}</strong>
                </p>
                <p>
                  Goal Stellar Jade Cost: <strong>{goalStellarJadeCost}</strong>{" "}
                  or <strong>{Math.ceil(goalStellarJadeCost / 160)}</strong>{" "}
                  pulls.
                </p>
              </div>
            )}
          </>
        )}
        <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>

        <div className="flex flex-col space-y-4">
          <a
            href="https://github.com/nlr/trailblazer-level/issues"
            target="_blank"
            className="inline-flex items-center justify-center p-5 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="w-full">Report a Bug or Share an Idea</span>
            <svg
              aria-hidden="true"
              className="w-6 h-6 ml-3"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
          <a
            href="https://honkai-star-rail.fandom.com/wiki/Trailblaze_EXP"
            target="_blank"
            className="inline-flex items-center justify-center p-5 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="w-full">Data from Honkai: Star Rail Wiki</span>
            <svg
              aria-hidden="true"
              className="w-6 h-6 ml-3"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </div>
        <QrCodeAccordion />
      </div>
      <Analytics />
    </>
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
