/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { createCabin } from "../../services/apiCabins";
import { useForm } from "react-hook-form";

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();

  const { errors } = formState;

  const queryClient = useQueryClient();
  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("New Cabin is successfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function onSubmit(data) {
    mutate({ ...data, image: data.image[0] });
  }
  function onError(errors) {
    // console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow error={errors?.name?.message} label='Cabin name'>
        <Input
          type='text'
          disabled={isCreating}
          id='name'
          {...register("name", { required: "This Field Is Required" })}
        />
      </FormRow>

      <FormRow error={errors?.maxCapacity?.message} label='Maximum capacity'>
        {/* we can insert minimum value and its error message */}
        <Input
          type='number'
          disabled={isCreating}
          id='maxCapacity'
          {...register("maxCapacity", {
            required: "This Field Is Required",
            min: { value: 1, message: "Minimum capacity should be 1" },
          })}
        />
      </FormRow>

      <FormRow error={errors?.regularPrice?.message} label='Regular price'>
        <Input
          type='number'
          disabled={isCreating}
          id='regularPrice'
          {...register("regularPrice", {
            required: "This Field Is Required",
            min: {
              value: 1,
              message: "Minimum price should be 1",
            },
          })}
        />
      </FormRow>

      <FormRow error={errors?.discount?.message} label='Discount'>
        <Input
          type='number'
          disabled={isCreating}
          id='discount'
          defaultValue={0}
          {...register("discount", {
            required: "This Field Is Required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount cannot be bigger than price",
          })}
        />
      </FormRow>

      <FormRow error={errors?.description?.message} label='Description'>
        <Textarea
          type='number'
          disabled={isCreating}
          id='description'
          defaultValue=''
          {...register("description", { required: "This Field Is Required" })}
        />
      </FormRow>

      {/* TO AVOID MAKING TYPE="file" IN HTML WE MADE THAT IN THE STYLED COMPONENT */}
      <FormRow label='Cabin photo'>
        <FileInput
          id='image'
          disabled={isCreating}
          accept='image/*'
          {...register("image", { required: "This Field Is Required" })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
