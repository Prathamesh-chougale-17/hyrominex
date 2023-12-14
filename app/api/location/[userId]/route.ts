import clientPromise from "@/mondoDB/mongo/clientPromise";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { param }: { param: { userId: string } }) {
    try {
        const { userId } = param;
        const { latitude, longitude } = await request.json();
        //send to mongoDB
        const client = await clientPromise;
        const db = client.db("Smart-India-Hackathon-2023");
        const collection = db.collection("Location");
        const UpdatedUser = await collection.updateOne({ userId: userId }, { $set: { latitude: latitude, longitude: longitude } });

        return NextResponse.json(UpdatedUser, { status: 201 })
    } catch (e) {
        return NextResponse.json(e);
    }
}
