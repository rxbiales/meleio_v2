import supabase from "@/lib/supabase";

export async function createStudent(
  name: string,
  email: string,
  classId: string
) {
  const { error } = await supabase.from("students").insert({
    name,
    email,
    class_id: classId,
  });

  if (error) {
    console.error("Erro ao criar aluno:", error);
    return null;
  }

  console.log("Aluno criado com sucesso!");
  return true;
}
