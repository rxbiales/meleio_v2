/*import supabase from "@/lib/supabase";

export async function createClass(
  name: string,
  description: string,
  schoolYear: string,
  teacherId: string
) {
  const { error } = await supabase.from("classes").insert({
    name,
    description,
    school_year: schoolYear,
    teacher_id: teacherId,
  });

  if (error) {
    console.error("Error creating class:", error);
    return null;
  }
}
*/
