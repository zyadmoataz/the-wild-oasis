/* eslint-disable no-unused-vars */
import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { QueryClient } from "@tanstack/react-query";
import FormRow from "../../ui/FormRow";

const FormRow2 = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm() {
  //useform wil give us functions as register and handleSubmit
  //now we dont need to make the inputs as a controlled component as we will handle them in the form hook
  // get values function is to get value from input and pass it into another input
  //we will use form state to display the errors
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
    mutate(data);
  }
  function onError(errors) {
    // console.log(errors);
  }

  return (
    // handle submit will be called when the form is submitted and then all the validation will be executed
    //handle submit will not call on submit function if there is an error in any input field and we have defined that all of them are reqired
    //in  this case onError will be called
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      {/* we can pass second object arrguement for validation */}
      {/* <FormRow2>
        <Label htmlFor='name'>Cabin name</Label>
        <Input
          type='text'
          id='name'
          {...register("name", { required: "This Field Is Required" })}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow2> */}

      {/* we can insert minimum value and its error message */}
      {/* <FormRow2>
        <Label htmlFor='maxCapacity'>Maximum capacity</Label>
        <Input
          type='number'
          id='maxCapacity'
          {...register("maxCapacity", {
            required: "This Field Is Required",
            min: { value: 1, message: "Minimum capacity should be 1" },
          })}
        />
        {errors?.maxCapacity?.message && (
          <Error>{errors.maxCapacity.message}</Error>
        )}
      </FormRow2> */}

      {/* <FormRow2>
        <Label htmlFor='regularPrice'>Regular price</Label>
        <Input
          type='number'
          id='regularPrice'
          {...register("regularPrice", {
            required: "This Field Is Required",
            min: {
              value: 1,
              message: "Minimum price should be 1",
            },
          })}
        />
        {errors?.regularPrice?.message && (
          <Error>{errors.regularPrice.message}</Error>
        )}
      </FormRow2> */}

      {/* Write a custom validation for discount as discount cannot be bigger than price */}
      {/* the field will be correctly validated when it return true */}
      {/* <FormRow2>
        <Label htmlFor='discount'>Discount</Label>
        <Input
          type='number'
          id='discount'
          defaultValue={0}
          {...register("discount", {
            required: "This Field Is Required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount cannot be bigger than price",
          })}
        />
        {errors?.discount?.message && <Error>{errors.discount.message}</Error>}
      </FormRow2> */}

      {/* <FormRow2>
        <Label htmlFor='description'>Description for website</Label>
        <Textarea
          type='number'
          id='description'
          defaultValue=''
          {...register("description", { required: "This Field Is Required" })}
        />
        {errors?.description?.message && (
          <Error>{errors.description.message}</Error>
        )}
      </FormRow2> */}

      {/* <FormRow2>
        <Label htmlFor='image'>Cabin photo</Label>
        <FileInput id='image' accept='image/*' />
      </FormRow2> */}

      <FormRow error={errors?.name?.message} label='Cabin name'>
        <Input
          type='text'
          id='name'
          {...register("name", { required: "This Field Is Required" })}
        />
      </FormRow>

      <FormRow error={errors?.maxCapacity?.message} label='Maximum capacity'>
        {/* we can insert minimum value and its error message */}
        <Input
          type='number'
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

      <FormRow label='Cabin photo'>
        <FileInput id='image' accept='image/*' />
      </FormRow>

      <FormRow2>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow2>
    </Form>
  );
}

export default CreateCabinForm;
