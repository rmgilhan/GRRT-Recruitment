import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export interface UserFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  roles: string[]; // 👈 roles must be an array
}

export default function useUserValidation() {
  const schema: yup.SchemaOf<UserFormData> = yup.object().shape({
    fullName: yup
      .string()
      .min(2, "Full name must be at least 2 characters")
      .required("Full name is required"),

    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),

    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),

    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), ""], "Passwords must match")
      .required("Confirm password is required"),

    roles: yup.string().required("Role is required"), // 👈 string here
  
    // roles: yup
    //   .array()
    //   .of(yup.string().required())
    //   .min(1, "At least one role must be selected")
    //   .required("Role is required"), // 👈 now an array
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<UserFormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  return {
    register,
    handleSubmit,
    reset,
    errors,
    isValid,
  };
}
