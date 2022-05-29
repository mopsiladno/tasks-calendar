import { iso } from "$lib/functions.js";

export function get({ params }) {
    const token = params.token;
    const date = iso(new Date());

    return {
        headers: {
            Location: `${token}/${date}`
        },
        status: 302
    };
}
