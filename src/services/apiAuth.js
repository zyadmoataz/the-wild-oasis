import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
  //signup receives email and password and we can pass options inside it data object and in there we can pass any kind of information that we want about the user
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

//each time user refresh the page he need to be refetched again from supabase
export async function getCurrentUser() {
  //1- check if there is active session in the local storage
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  //2- If there is session in the local storage then get the user from supabase
  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ avatar, fullName, password }) {
  //1-Update password or fullName "We cannot update both at the same time"
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };
  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  //2-Upload  the avatar image
  //Create a file name for the avatar to be uploaded
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  //Upload the image to supabase storage and get the url of the image to be stored in the database
  //upload takes 2 arguments 1-the file name and 2- the file
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  //3-Update the avatar in the user
  //updateUser takes 1 argument data object with the avatar url comes from supabase storage
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error2) throw new Error(error2.message);
  return updatedUser;
}
