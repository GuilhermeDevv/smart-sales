import dayjs from "dayjs";

export interface IDatePickerComponentProps {
  value: string | dayjs.Dayjs;
  onChange: (value: string) => void;
  readOnly?: boolean;
  defaultValue?: string | dayjs.Dayjs;
  isDarkMode: boolean;
}
