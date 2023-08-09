import React from "react";
import { TimePicker } from "@mui/x-date-pickers";
import { Controller, useFormContext, FieldPath } from "react-hook-form";
import { PRACTICEFormType } from "@/app/api/subjects/[subjectId]/approvalForm/func/PRACTICE/PRACTICE";
import dayjs from "dayjs";

const DatePicker: React.FC<{ name: FieldPath<PRACTICEFormType> }> = ({ name }) => {
  const { register, setValue, control, ...methods } = useFormContext<PRACTICEFormType>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { name, onChange, ref, value } }) => (
        <TimePicker
          ampm={false}
          value={value ? dayjs(value as string) : null}
          ref={ref}
          onChange={(newValue) => {
            try {
              console.log(newValue);
              onChange(dayjs(newValue).toISOString());
            } catch (error) {
              if (error instanceof Error) {
                console.log("จาก Date component :", error.message);
              }
            }
          }}
          closeOnSelect={true}
          sx={{
            width: "100%",
            backgroundColor: "white",
            ".MuiInputBase-input": { padding: "0.5rem" },
          }}
        />
      )}
    />
  );
};

export default DatePicker;
