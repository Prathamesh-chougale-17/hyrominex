import clientPromise from "@/mondoDB/mongo/clientPromise";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { userId, latitude, longitude, image, name } = await request.json();
    const responseBody = { userId, latitude, longitude, image, name };
    //send to mongoDB
    const client = await clientPromise;
    const db = client.db("Smart-India-Hackathon-2023");
    const collection = db.collection("Location");
    const user = await collection.findOne({ userId: userId });
    if (user) {
      const updatedUser = await collection.updateOne({ userId: userId }, { $set: { latitude: latitude, longitude: longitude } });
      return NextResponse.json(updatedUser, { status: 201 })
    }
    const newUser = await collection.insertOne(responseBody);
    return NextResponse.json(newUser, { status: 201 })
  } catch (e) {
    return NextResponse.json(e);
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("Smart-India-Hackathon-2023");
    const collection = db.collection("Location");
    const user = await collection.find({}).toArray();
    return NextResponse.json(user, { status: 201 })
  } catch (e) {
    return NextResponse.json(e);
  }
}