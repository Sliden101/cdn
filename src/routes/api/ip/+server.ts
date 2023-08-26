import { json } from "@sveltejs/kit";
import 'dotenv/config'

export const POST = async ({ request }) => {
    const { ip } = await request.json() as { ip: string | undefined };
    let range = process.env.IP
    if (process.env.IP?.includes(ip as string)){
        let bool = true
        return json({ bool });
    }
    return json({ bool: false });
};