import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function PUT(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const segments = request.nextUrl.pathname.split("/");
    const id = segments[segments.length - 2];
    
    const res = await fetch(`${BACKEND_URL}/api/admin/doctors/${id}/reject`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader || "",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}