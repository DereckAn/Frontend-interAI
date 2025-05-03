/**
 * @module interviews
 * @description API para manejar entrevistas.
 */

import { auth } from "@/src/auth";
import { NextRequest, NextResponse } from "next/server";

/**
 * @function GET
 * @description Maneja las solicitudes GET para obtener entrevistas.
 * @param {NextRequest} request - La solicitud entrante.
 * @returns {Promise<NextResponse>} - Devuelve la respuesta con los datos de las entrevistas o un mensaje de error.
 */
export async function GET(request: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "api/interviews",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: request.headers.get("cookie") || "",
        },
        credentials: "include",
      }
    );

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * @function POST
 * @description Maneja las solicitudes POST para crear entrevistas.
 * @param {NextRequest} request - La solicitud entrante.
 * @returns {Promise<NextResponse>} - Devuelve la respuesta con los datos de la entrevista creada o un mensaje de error.
 */
export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "api/interviews",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: request.headers.get("cookie") || "",
        },
        body: JSON.stringify(body),
        credentials: "include",
      }
    );

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
