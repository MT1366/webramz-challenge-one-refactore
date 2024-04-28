import { useState } from "react";
import dayjs from "dayjs";

const useDisabledDate = (
  startDate: dayjs.Dayjs | null,
  endDate: dayjs.Dayjs | null
): ((current: dayjs.Dayjs) => boolean) => {
  const [disabledDateFunction] = useState<(current: dayjs.Dayjs) => boolean>(
    () => {
      const disableOutOfRangeDates = (current: dayjs.Dayjs): boolean => {
        if (startDate) {
          const nextWeek = startDate.add(7, "day");
          return current.isAfter(nextWeek, "day");
        }

        if (endDate) {
          return (
            current.isBefore(startDate, "day") ||
            current.isAfter(endDate, "day")
          );
        }
        return false;
      };

      return disableOutOfRangeDates;
    }
  );

  return disabledDateFunction;
};

export default useDisabledDate;
