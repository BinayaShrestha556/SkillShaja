import EsewaPayment from "@/components/payment/payment-form";
import prisma from "@/lib/db/db";
import { notFound } from "next/navigation";

interface QueryTypes {
  params: {
    courseId: string;
  };
}
const Page: React.FC<QueryTypes> = async ({ params }) => {
  const { courseId } = await params;
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
