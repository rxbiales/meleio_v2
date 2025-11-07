import { redirect } from "next/navigation";

type StudentDefaultPageProps = {
  params: { studentId: string };
};

export default function StudentDefaultPage({
  params,
}: StudentDefaultPageProps) {
  redirect(
    `/dashboard/estudantes/${encodeURIComponent(
      params.studentId
    )}/timeline`
  );
}
