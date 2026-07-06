const resolveServerUrl = () => {
    return (
        process.env.NEXT_PUBLIC_SERVER_URL ||
        process.env.NEXT_PUBLIC_DOCKER_SERVER_URL ||
        "http://localhost:5000"
    );
};

export const API_BASE_URL = resolveServerUrl();

export const apiUrl = (path: string) => {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return `${API_BASE_URL}${normalizedPath}`;
};
