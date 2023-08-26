<script lang="ts">
    import { Fileupload } from 'flowbite-svelte';
    import axios from 'axios';
    import "dotenv";

    async function upload(file: any) {
        const getPresignedUrlResponse = await fetch('/api/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fileName: file.name,
                fileType: file.type
            })
        });

        if (!getPresignedUrlResponse.ok) {
            console.error('Failed to get presigned URL');
        }
        const { presignedUrl, objectKey } = await getPresignedUrlResponse.json();

        const uploadToR2Response = await fetch(presignedUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': file.type
            },
            body: file
        });
        if (!uploadToR2Response.ok) {
            console.error('Failed to upload file to R2');
        }
        let clip = (`https://astolfo.store/${objectKey}`)
        alert(clip);
    }

    const handleFileUpload = async (e: Event) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    const res = await axios(`https://wtfismyip.com/json`);

    console.log(res.data.YourFuckingIPAddress);
    let ip = res.data.YourFuckingIPAddress;
    const bool = await fetch('/api/ip',{
        method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ip: ip,
            })

    });
    if (file && bool) {
        upload(file);
    }
};

</script>


<svelte:head>
	<title>r2 cdn</title>
</svelte:head>

<main class="max-w-5xl py-12 mx-auto space-y-12">

	<Fileupload id="with_helper" class="mb-2" on:change={handleFileUpload} />

</main>
