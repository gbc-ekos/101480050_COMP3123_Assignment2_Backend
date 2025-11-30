export const isValidPicture = (picture) => {
    if (!picture) return true;

    // Check if it starts with valid image data URI
    const validImageTypes = [
        'data:image/jpeg',
        'data:image/jpg',
        'data:image/png',
        'data:image/gif',
        'data:image/webp',
        'data:image/svg+xml'
    ];

    return validImageTypes.some(type => picture.startsWith(type));
};

export const getBase64Size = (base64String) => {
    if (!base64String) return 0;

    // Remove the data URI prefix
    const base64Data = base64String.split(',')[1] || base64String;

    // Calculate size: base64 encoding increases size by ~33%
    // Size in bytes = (length * 3) / 4
    return Math.ceil((base64Data.length * 3) / 4);
};

export const isPictureSizeValid = (picture) => {
    if (!picture) return true;
    const pictureSize = getBase64Size(picture);
    const limit = 5242880;
    return pictureSize <= limit;
};
