import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        console.log("hii put");

        return NextResponse.json({ "message": "PUT" });
    } catch (e) {
        return NextResponse.json(e);
    }
}
