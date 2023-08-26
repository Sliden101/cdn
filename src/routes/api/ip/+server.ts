import { json } from "@sveltejs/kit";
import 'dotenv/config'

export const POST = async ({ request }) => {
    let bool
    return json({ bool });
};