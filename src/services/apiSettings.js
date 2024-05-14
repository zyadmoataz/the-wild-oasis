import supabase from "./supabase";

export async function getSettings() {
  //single takes one single object insetad of entire array
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }

  // return data[0]; or return this instead of using Single Function
  return data;
}

// We expect a newSetting object that looks like {setting: newValue}
//we dont need id as we have only one row
//we will pass object of column we want to update
export async function updateSetting(newSetting) {
  const { data, error } = await supabase
    .from("settings")
    .update(newSetting)
    // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
    .eq("id", 1)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be updated");
  }
  return data;
}
