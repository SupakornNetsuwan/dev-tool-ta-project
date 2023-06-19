"use client";
// Date picker 📅
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import 'dayjs/locale/th';

const ClientLocalizationProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="th" key="localization-provider">
      {children}
    </LocalizationProvider>
  );
};

export default ClientLocalizationProvider;
