// Byimaan

export const p = console.log;

export const copyToClipboard = (str: string) => {
    navigator.clipboard.writeText(str);
}