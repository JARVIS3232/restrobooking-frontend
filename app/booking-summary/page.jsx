import BookingSummary from "@/components/BookingSummary";
import { Suspense } from "react";

const Summary = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingSummary />
    </Suspense>
  );
};

export default Summary;
