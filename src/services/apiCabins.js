/* eslint-disable no-unused-vars */
import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  //we got this from supabase api docs
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}

//If we are editing we have to pass an id
export async function createEditCabin(newCabin, id) {
  //make a variable to check if the image is a url or a name
  const hasImagePath = newCabin?.image?.startsWith?.(supabaseUrl);

  //https://tmqshbonovzamvxhsobz.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  // replace all slashes into nothing to avoid creating new folder and make image have a unique name
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // Here we need to specify the image path to the new cabin we create so we will mutate the newCabin object
  //1- Create/Edit cabin:
  // const { data, error } = await supabase
  //   .from("cabins")
  //   .insert([{ ...newCabin, image: imagePath }])
  //   .select()
  //   .single();
  let query = supabase.from("cabins");

  //A)Create
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  //B) Edit
  if (id) {
    //eq means equal means we dont want to update everything only the row of id we want to update
    //diference we dont have to pass this into an array as creting cabin
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }
  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  //we will do this if there is no error in creating the cabin it
  //2. upload image
  //image name we already created and the actual image
  if (hasImagePath) return data; //if image already have a path then it have been already uploaded so we dont need to upload again
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //3.Delete cabin if there is an error in uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("Cabin could not be created");
  }
  return data;
}
