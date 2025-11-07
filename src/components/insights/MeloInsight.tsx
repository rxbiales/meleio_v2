import type { ReactElement } from "react";

import MeloInsights from "@/components/layout/MeloInsights";

export default function MeloInsight(props: Parameters<typeof MeloInsights>[0]): ReactElement {
  return <MeloInsights {...props} />;
}
