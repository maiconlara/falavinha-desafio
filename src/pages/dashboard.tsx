import CityContainer from "@/components/city-container";
import JobContainer from "@/components/job-container";
import StateContainer from "@/components/state-container";
import { useIdbCandidates } from "@/utils/hooks/useIdbCandidates";
import { useState, useEffect } from "react";

interface StateCount {
  state: string;
  count: number;
}
interface CityCount {
  city: string;
  count: number;
}
interface JobCount {
  job: string;
  count: number;
}

const Dashboard = () => {
  const { data = [] } = useIdbCandidates();
  const [countByState, setCountByState] = useState<StateCount[]>([]);
  const [countByCity, setCountByCity] = useState<CityCount[]>([]);
  const [countByJob, setCountByJob] = useState<JobCount[]>([]);

  useEffect(() => {
    if (data.length === 0 || data === undefined) return;
    const count = data.reduce<Record<string, number>>((acc, candidate) => {
      if (acc[candidate.state]) {
        acc[candidate.state] += 1;
      } else {
        acc[candidate.state] = 1;
      }
      return acc;
    }, {});

    const countArray: StateCount[] = Object.entries(count).map(
      ([state, count]) => ({
        state,
        count,
      })
    );

    setCountByState(countArray);
  }, [data]);

  useEffect(() => {
    if (data.length === 0 || data === undefined) return;
    const count = data.reduce<Record<string, number>>((acc, candidate) => {
      if (acc[candidate.city]) {
        acc[candidate.city] += 1;
      } else {
        acc[candidate.city] = 1;
      }
      return acc;
    }, {});

    const countArray: CityCount[] = Object.entries(count).map(
      ([city, count]) => ({
        city,
        count,
      })
    );

    setCountByCity(countArray);
  }, [data]);

  useEffect(() => {
    if (data.length === 0 || data === undefined) return;
    const count = data.reduce<Record<string, number>>((acc, candidate) => {
      if (acc[candidate.job]) {
        acc[candidate.job] += 1;
      } else {
        acc[candidate.job] = 1;
      }
      return acc;
    }, {});

    const countArray: JobCount[] = Object.entries(count).map(
      ([job, count]) => ({
        job,
        count,
      })
    );

    setCountByJob(countArray);
  }, [data]);

  return (
    <div className="flex h-full w-[90vw] xl:w-[78vw] flex-col items-center justify-start gap-10  pt-10 pb-3text-green-950 ">
      <div className="flex w-full flex-row ">
        <p className="font-poppins text-4xl font-medium">Dashboard <span className="text-[10px]">(bem simples)</span></p>
      </div>
      <div className="grid grid-cols-1 grid-rows-3 lg:grid-cols-3 lg:grid-rows-2 w-full h-full lg:gap-6 gap-y-6 ">
        <StateContainer data={countByState} />
        <CityContainer data={countByCity} />
        <JobContainer data={countByJob} />
      </div>
    </div>
  );
};
export default Dashboard;
