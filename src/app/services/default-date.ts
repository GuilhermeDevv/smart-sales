import dayjs from "dayjs";
import "dayjs/locale/pt-br";

function defaultDate() {
  const startDate = dayjs()
    .subtract(7, "day")
    .startOf("day")
    .format("YYYY-MM-DD");
  const endDate = dayjs().endOf("day").format("YYYY-MM-DD");

  return { startDate, endDate };
}

export { defaultDate };
