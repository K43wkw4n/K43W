import * as yup from "yup";

export const validationstudent = yup.object({
  name: yup.string().required(),
  surName: yup.string().required(),
  sex: yup.string().required(),
  birthday: yup.string().required(),
  email: yup.string().required(),
  tel: yup.string().required(),
  address: yup.string().required(),
  oldEdu: yup.string().required(),
  oldSchool: yup.string().required(),
  file: yup.mixed().when("img", {
    is: (value: string) => !value,
    then: yup.mixed().required("Please provide an image"),
  }),
});
