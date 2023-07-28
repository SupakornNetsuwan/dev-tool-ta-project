import React from "react";
import FieldWrapper from "@/core/components/form/FieldWrapper";
import ShowInputError from "@/core/components/form/ShowInputError";
import * as Label from "@radix-ui/react-label";
import { useFormContext } from "react-hook-form";

const Row = () => {
  const { register, watch } = useFormContext();
  return (
    <div>
      <FieldWrapper label={<Label.Root>คำนำหน้า</Label.Root>} errorComponent={<ShowInputError inputName="name" />}>
        <input type="text" {...register("name")} />
      </FieldWrapper>
    </div>
  );
};

export default Row;
