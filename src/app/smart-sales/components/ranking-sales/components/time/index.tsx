/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck

// PACKAGES
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import "dayjs/locale/pt-br";

// TYPES
import { IDatePickerComponentProps } from "./types";

// STYLES
import styles from "./TimePicker.module.css";
import { useEffect, useState } from "react";
import { MobileTimePicker } from "@mui/x-date-pickers";

export function Time({
  value,
  onChange,
  readOnly,
  defaultValue,
  isDarkMode,
}: IDatePickerComponentProps) {
  const [localValue, setLocalValue] = useState(value);
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <MobileTimePicker
        value={localValue}
        onChange={(newValue) => onChange(newValue as unknown as any)}
        className={styles.DatePicker}
        readOnly={readOnly ? readOnly : false}
        defaultValue={defaultValue}
        sx={{
          ".MuiInputBase-input": {
            padding: 0,
            borderBottom: `1px solid ${
              isDarkMode ? "rgba(232, 230, 227, 0.46)" : "#cccccc6d"
            }`,
            color: isDarkMode ? "#E8E3E6" : "#000",
          },
          ".MuiInputAdornment-root .MuiSvgIcon-root": {
            color: isDarkMode ? "#E8E3E6" : "#00000075",
          },
        }}
      />
    </LocalizationProvider>
  );
}
