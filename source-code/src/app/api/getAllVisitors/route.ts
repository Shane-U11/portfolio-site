import { NextResponse, NextRequest } from "next/server";
import { createClient } from "../db/supabase";

const tableName = 'visitor'

export async function GET(req: NextRequest) {
    try {
        const supabase = createClient()
        const { data, error } = await supabase.from(tableName).select('*')

        if (error) {
            console.error('Error fetching data:', error.message)
        }

        return NextResponse.json(data)
    } catch (error: any) {
        console.error('Error:', error.message);
    }
}