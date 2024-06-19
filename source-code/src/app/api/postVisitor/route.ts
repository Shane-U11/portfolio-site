import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../db/supabase";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { latitude, longitude, ipAddress } = body

        const supabase = createClient()

        const visitorCounter = await supabase
            .from("visitor")
            .select("visitCount")
            .single()

        let visitCount = 0

        if (visitorCounter.data) {
            visitCount = visitorCounter.data.visitCount + 1
        }

        const { data, error } = await supabase
            .from("visitor")
            .upsert(
                {
                    lat: latitude,
                    long: longitude,
                    ipAddress,
                    updatedAt: new Date().toISOString(),
                    visitCount
                },
                { onConflict: "ipAddress" }
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