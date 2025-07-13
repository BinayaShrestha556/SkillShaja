import { auth } from "@/auth";
import prisma from "@/lib/db/db";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const session = await auth();
  const userId = session?.user?.id;
  const searchParams = req.nextUrl.searchParams;
  const base64 = searchParams.get("data");
  if (!base64)
    return NextResponse.json({ error: "Missing params" }, { status: 400 });
  const decoded = Buffer.from(base64, "base64").toString("utf-8");
  const decodedObject = JSON.parse(decoded);
  console.log(decodedObject);
  const { transaction_code, transaction_uuid, signature } = decodedObject;
  if (!transaction_uuid || !transaction_code)
    return NextResponse.json({
      message: "error, transaction id not found in params.",
    });
  const transactionData = await prisma.payment.findUnique({
    where: { transactionUuid: transaction_uuid as string },
  });
  if (!transactionData)
    return NextResponse.json({ error: "transaction not initialized" });

  const res = await fetch(
    "https://rc.esewa.com.np/api/epay/transaction/status/?" +
      new URLSearchParams({
        product_code: process.env.ESEWA_MERCHANT_ID!,
        total_amount: transactionData.totalAmount.toFixed(2),
        transaction_uuid,
      })
  );
  const data = await res.json();
  console.log(data);
  if (data.status !== "COMPLETE")
    return NextResponse.json(
      { error: "something went wrong" },
      { status: 500 }
    );
  await prisma.payment.update({
    where: {
      transactionUuid: transaction_uuid as string,
    },
    data: {
      status: "SUCCESS",
      transactionCode: transaction_code,
    },
  });

  redirect("/payment/success");
};
