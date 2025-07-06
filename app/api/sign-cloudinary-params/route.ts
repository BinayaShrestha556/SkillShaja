import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  const body = await request.json();
  const { paramsToSign } = body;

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET!
  );

  return Response.json({ signature });
}
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const videoId: string | null = searchParams.get("id");
    const media: string | null = searchParams.get("type");
    if (!videoId)
      return NextResponse.json(
        { message: "Id not provided" },
        { status: 400, statusText: "Not provided all required query" }
      );
    const expiresAt = Math.floor(Date.now() / 1000) + 3600;

    const url = cloudinary.url(videoId, {
      resource_type: media,
      type: "authenticated",
      format: media === "video" ? "m3u8" : "png",
      sign_url: true,
      secure: true,
      expires_at: expiresAt,
    });
    const thumbnail = cloudinary.url(`${videoId}.jpg`, {
      resource_type: "video",
      type: "authenticated",

      sign_url: true,
      secure: true,
      expires_at: expiresAt,
    });
    return NextResponse.json(
      {
        url,
        thumbnail,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "error" },
      { status: 500, statusText: "server error" }
    );
  }
}
