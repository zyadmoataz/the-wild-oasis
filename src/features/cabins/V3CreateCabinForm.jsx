/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { createEditCabin } from "../../services/apiCabins";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId); // if we have id then its true else false

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;

  const { createCabin, isCreating } = useCreateCabin();
  const { editCabin, isEditing } = useEditCabin();
  // const queryClient = useQueryClient();
  // const { mutate: createCabin, isLoading: isCreating } = useMutation({
  //   mutationFn: createEditCabin,
  //   onSuccess: () => {
  //     toast.success("New Cabin is successfully created");
  //     queryClient.invalidateQueries({ queryKey: ["cabins"] });
  //     reset();
  //   },
  //   onError: (err) => {
  //     toast.error(err.message);
  //   },
  // });

  // const { mutate: editCabin, isLoading: isEditing } = useMutation({
  //   mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
  //   onSuccess: () => {
  //     toast.success("Cabin is successfully editied");
  //     queryClient.invalidateQueries({ queryKey: ["cabins"] });
  //     reset();
  //   },
  //   onError: (err) => {
  //     toast.error(err.message);
  //   },
  // });

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession)
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: (data) => {
            reset();
          },
        }
      );
    //we cannout use the reset inside the custom hook so we are using rest here
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: (data) => {
            reset();
          },
        }
      );
  }
  function onError(errors) {
    // console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow error={errors?.name?.message} label='Cabin name'>
        <Input
          type='text'
          disabled={isWorking}
          id='name'
          {...register("name", { required: "This Field Is Required" })}
        />
      </FormRow>

      <FormRow error={errors?.maxCapacity?.message} label='Maximum capacity'>
        {/* we can insert minimum value and its error message */}
        <Input
          type='number'
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
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
          id='description'
          defaultValue=''
          {...register("description", { required: "This Field Is Required" })}
        />
      </FormRow>

      {/* TO AVOID MAKING TYPE="file" IN HTML WE MADE THAT IN THE STYLED COMPONENT */}
      <FormRow label='Cabin photo'>
        <FileInput
          id='image'
          disabled={isWorking}
          accept='image/*'
          {...register("image", {
            required: isEditSession ? false : "This Field Is Required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit Cabin" : "Create New Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
