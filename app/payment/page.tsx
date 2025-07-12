import EsewaPayment from "@/components/payment/payment-form";
import prisma from "@/lib/db/db";
import { notFound } from "next/navigation";

interface QueryTypes {
  searchParams: Promise<{
    courseId: string;
  }>;
}
const Page: React.FC<QueryTypes> = async ({ searchParams }) => {
  const { courseId } = await searchParams;
  console.log(courseId);
  const course = await prisma.course.findUnique({
    where: { id: courseId },
  });
  if (!course) notFound();
  return (
    <div>
      <EsewaPayment amount={course.price} courseId={courseId} />
    </div>
  );
};

export default Page;
