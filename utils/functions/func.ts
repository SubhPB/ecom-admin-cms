// Byimaan

export const p = console.log;

export const copyToClipboard = (str: string) => {
    navigator.clipboard.writeText(str);
}
export const formatter = new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD',
});

export const capitalize = (str: string) => (str[0].toUpperCase() + str.slice(1).toLowerCase()) ?? '';
export const pluralize = (str: string, es=false) => es ? str + 'es' : str + 's';
export const singularize = (str: string, es=false) => str.slice(0,str.length - (es ? 2 : 1));
