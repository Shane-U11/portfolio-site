import { NextResponse, NextRequest } from "next/server";
import { createClient } from "../db/supabase";
import { Description } from "@mui/icons-material";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { name, email, phoneNumber, isEngineeringManager, isTechRecruiter, isFellowDeveloper, description, other } = body 

        const supabase = createClient()

        const { data, error } = await supabase
        .from("subscribers")
        .upsert(
            {
                name,
                email,
                phoneNumber,
                updatedAt: new Date().toISOString(),
                isEngineeringManager,
                isTechRecruiter,
                isFellowDeveloper,
                other,
                description
            },
        )
        .select()

    if (error) {
        console.error('Error inserting row:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log('Successfully inserted rows:', {data})
    return NextResponse.json(data)
    } catch (error) {
        console.error('Internal server error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}