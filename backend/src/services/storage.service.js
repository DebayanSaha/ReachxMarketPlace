const ImageKit = require('@imagekit/nodejs')

const client = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(file, fileName) {
    const response = await client.files.upload({ file: file.toString("base64") , fileName: fileName});

    return response;
}

module.exports = {
    uploadFile,
}