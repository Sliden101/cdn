import { S3 } from '$lib/s3';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { json } from "@sveltejs/kit";
import 'dotenv/config'

const slugifyString = (str: string) => {
    return str.trim().toLowerCase().replace(/\s+/g, '-').replace(/\./g, '-').replace(/-+/g, '-').replace(/[^a-z0-9-]/g, '-');
}

export const POST = async ({ request }) => {
    const { fileName, fileType, } = await request.json() as { fileName: string | undefined, fileType: string | undefined };

    if (!fileName || !fileType || fileName.trim() === '' || fileType.trim() === '') {
        return json({ message: 'Missing required parameters.' }, { status: 400 });
    }

    const objectKey = `${slugifyString(Date.now().toString())}-${slugifyString(fileName)}`;
    console.log(objectKey)
    const presignedUrl = await getSignedUrl(S3, new PutObjectCommand({
        Bucket: `${process.env.PUBLIC_S3_BUCKET_NAME}`,
        Key: objectKey,
        ContentType: fileType,
        ACL: 'public-read'
    }), {
        expiresIn: 60 * 5 // 120 minutes
    });
    return json({ presignedUrl, objectKey });
};