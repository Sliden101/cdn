import { json } from "@sveltejs/kit";
import 'dotenv/config'

export const POST = async ({ request }) => {
    const { ip } = await request.json() as { ip: string | undefined };
    console.log(ip)
    if (process.env.IP == (ip as string)){
        return json({ bool: true });
    }
    return json({ bool: false });
};