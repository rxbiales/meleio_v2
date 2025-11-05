import StudentTimeline from "@/components/student/StudentTimeLine";

export default function StudentTimelinePage() {
  return (
    <StudentTimeline
      aluno={{
        nome: "",
        turma: "",
        idade: undefined,
      }}
      series={[]}
      events={[]}
    />
  );
}
