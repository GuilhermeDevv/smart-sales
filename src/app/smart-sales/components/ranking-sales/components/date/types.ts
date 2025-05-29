/* eslint-disable @typescript-eslint/no-explicit-any */

import dayjs from "dayjs";

export interface IDatePickerComponentProps {
  value: string | dayjs.Dayjs;
  onChange: (value: string) => void;
  readOnly?: boolean;
  defaultValue?: string;
  isDarkMode: boolean;
  minDate?: any;
}
