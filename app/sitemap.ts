import { MetadataRoute } from "next";

export default function sitemap() : MetadataRoute.Sitemap {
    return [
        {
            url: 'https://moopi.offing.me',
            lastModified: new Date(),
        },
        {
            url: 'https://moopi.offing.me/login',
            lastModified: new Date(),
        },
    ]
}