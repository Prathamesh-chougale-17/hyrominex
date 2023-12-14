import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { userId, latitude, longitude } = await request.json();
    const responseBody = { userId, latitude, longitude };

    //send to mongoDB


    console.log(responseBody);

    return NextResponse.json({ message: "POST" });
  } catch (e) {
    return NextResponse.json(e);
  }
}
