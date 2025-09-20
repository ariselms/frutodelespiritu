import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { put } from "@vercel/blob";

export async function POST(request: Request): Promise<NextResponse> {

	const { searchParams } = new URL(request.url);

  const filename = searchParams.get("filename");

  if (!filename) {
    return NextResponse.json(
      { error: "Filename is required" },
      { status: 400 }
    );
  }

  if (!request.body) {
    return NextResponse.json(
      { error: "Request body is required" },
      { status: 400 }
    );
  }

  const blob = await put(`/avatars/${filename}`, request.body, {
    access: "public",
    allowOverwrite: true
  });

	return NextResponse.json(
    {
      success: true,
      message: "File uploaded successfully",
      data: blob
    },
    { status: 200 }
  );
}

export async function PUT(request: Request) {

  try {

    const body = await request.json();

    const {
      name,
      image_url,
      bio,
      contact_email,
      contact_phone,
      role,
      address_street,
      address_city,
      address_state,
      address_zip,
      address_country
    } = body;

    const {rows: existingUser} = await sql`
      SELECT * FROM users
        WHERE contact_email = ${contact_email}
    `;

    if(existingUser.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No se pudo actualizar el usuario",
          data: null
        },
        { status: 400 }
      );
    }

    let updatedImage: string| null = null;

    if(image_url !== "" && existingUser[0].image_url !== image_url)
    {
      updatedImage = image_url
    }
    else {
      updatedImage = existingUser[0].image_url
    }

    const {rows: updatedUser} = await sql`
      UPDATE users
      SET
        name = ${name},
        bio = ${bio},
        contact_email = ${contact_email},
        contact_phone = ${contact_phone},
        image_url = ${updatedImage},
        role = ${role},
        address_street = ${address_street},
        address_city = ${address_city},
        address_state = ${address_state},
        address_zip = ${address_zip},
        address_country = ${address_country}
      WHERE
        contact_email = ${contact_email}
      RETURNING *
    `

    if(updatedUser.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No se pudo actualizar el usuario, inténtelo nuevamente",
          data: null
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Usuario actualizado correctamente",
        data: body
      },
      { status: 200 }
    );

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Hubo un error, inténtelo nuevamente",
        data: null
      },
      { status: 500 }
    );
  }
}