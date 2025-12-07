import pool from "@/db";
import { NextResponse } from "next/server";

export async function GET():Promise<Response> {
  try {
    const result = await pool.query("SELECT * FROM recipes");
    console.log(result);
    return  NextResponse.json({
        result: result.rows,
        message: "GETリクエストが成功しました",
  });
  } catch(error) {
    console.error("GET /recipes エラー:", error);
    return NextResponse.json(
        { message: "サーバーエラーが発生しました", error },
        { status: 500 });
  }
}

export async function POST(request: Request){
    try {
        const data = await request.json();
        const {title, description} = data;
    
        const result = await pool.query("INSERT INTO recipes (title, description) VALUES ($1, $2) RETURNING *", [title, description]);
        return  NextResponse.json(
            { data: result.rows[0], 
                message: "POSTリクエストが成功しました"
            });
    } catch(error){
        return NextResponse.json(
        { message: "サーバーエラーが発生しました", error },
        { status: 500 });
    }
}