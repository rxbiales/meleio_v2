"use client";

import StudentTimelinePro from "@/components/student/StudentTimeLine";
import { useStudentLayout } from "@/components/student/useStudentLayout";

export default function StudentTimelinePage() {
  const { aluno, series, events } = useStudentLayout();
  return (
    <StudentTimelinePro aluno={aluno} series={series} events={events} />
  );
}
