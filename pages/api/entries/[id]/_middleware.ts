import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
// import mongoose from "mongoose";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  // if (req.page.name === "/api/entries") return NextResponse.next();
  const id = req.page.params?.id || "";
  console.log(id);
  //chequeamois que id contenga 24 caracteres
  const checkMongoRegExp = new RegExp("^[0-9a-fA-F]{24}$");

  if (!checkMongoRegExp.test(id)) {
    return new Response(JSON.stringify({ message: "No es un ID valido" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return NextResponse.next();
}
