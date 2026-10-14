import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q");
    const specialization = searchParams.get("specialization");
    const department = searchParams.get("department");
    
    let url = `${BACKEND_URL}/api/doctor?`;
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (specialization) params.set("specialization", specialization);
    if (department) params.set("department", department);
    
    url += params.toString();
    
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}