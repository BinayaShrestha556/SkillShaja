import { auth } from "@/auth";
import prisma from "@/lib/db/db";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const session = await auth();
  const userId = session?.user?.id;
  const searchParams = req.nextUrl.searchParams;
  const transaction_uuid = searchParams.get("transaction_uuid");
  const total_amount = searchParams.get("total_amount");
  const productId = searchParams.get("productId");

  if (!transaction_uuid || !total_amount || !productId || !userId) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 });
  }
  const res = await fetch(
    "https://rc.esewa.com.np/api/epay/transaction/status/?" +
      new URLSearchParams({
        product_code: process.env.ESEWA_PRODUCT_CODE!,
        total_amount,
        transaction_uuid,
      })
  );
  const data = await res.json();
  if (data.status !== "COMPLETE")
    return NextResponse.json(
      { error: "something went wrong" },
      { status: 500 }
    );
  const paymentData = await prisma.payment.create({
    data: {
      amount: Number(total_amount),
      productId,
      transactionUuid: transaction_uuid,
      status: "COMPLETED",
      userId,
    },
  });
  redirect("/payment/success");
};
