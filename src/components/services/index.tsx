export default async function APIRequest<T>(url: string, data: any): Promise<T> {
    return fetch(url, data)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json() as Promise<T>
        })
}