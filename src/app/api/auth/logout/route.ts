import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    cookies().delete("user")

    return NextResponse.json({ message: "Removed Cookies" }, { status: 200 });
}