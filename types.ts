import { FieldError, UseFormRegister } from "react-hook-form";
import { z, ZodType } from "zod"; //z is an instance of the Zod object. && ZodType is a generic type that represents a Zod schema type for a specific data structure.

export type FormData = {
  // FormData represents the structure of the data expected in the form.
  email: string;
  githubUrl: string;
  yearsOfExperience: number;
  password: string;
  confirmPassword: string;
};

export type FormFieldProps = {
  //FormFieldProps defines the properties expected by the form field component.
  type: string;
  placeholder: string;
  name: ValidFieldNames;
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
};

//ValidFieldNames is a union type that enumerates the valid field names for the form. These correspond to the fields defined in the FormData type.
export type ValidFieldNames =
  | "email"
  | "githubUrl"
  | "yearsOfExperience"
  | "password"
  | "confirmPassword";

export const UserSchema: ZodType<FormData> = z
  .object({
    email: z.string().email(),
    githubUrl: z
      .string()
      .url()
      .includes("github.com", { message: "Invalid Github Url" }),
    yearsOfExperience: z
      .number({
        required_error: "required Field",
        invalid_type_error: "Years of Experience is Needed",
      })
      .min(1)
      .max(10),
    password: z
      .string()
      .min(8, { message: "8 characters is too short" })
      .max(20, { message: "8 characters is too long" }),
    confirmPassword: z.string(),
  })

  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
