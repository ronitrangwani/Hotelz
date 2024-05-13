import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getServerSession } from 'next-auth';
import { authOptions } from "@/libs/auth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion:'2024-04-10'
})

type RequestData = {
    checkinDate: string;
    checkoutDate: string;
    adults: number;
    children: number;
    numberOfDays: number;
    hotelRoomSlug: string;
}

export async function POST(req: Request, res: Response) {
    const {
        checkinDate,
        checkoutDate,
        adults,
        children,
        numberOfDays,
        hotelRoomSlug
    } = await req.json();

    if (!checkinDate || !checkoutDate || !adults || !numberOfDays || !hotelRoomSlug) {
        return new NextResponse("Please all fields are required",{status:400})
    }

    const origin = req.headers.get('origin');
    const session = await getServerSession(authOptions)

    if (!session) {
        return new NextResponse('Authentication required', { status: 400 })
    }

    const userId = session.user.id;
}