export function createCSV(data) {
    const headers = ['id', 'name', 'top', 'left'];

    const csvData = [
        headers.join(';'),
        ...Object.entries(data).map(([id, obj]) => {
            return `${id};${obj.name};${obj.top};${obj.left}`;
        }),
    ].join('\n');

    return csvData;
}
