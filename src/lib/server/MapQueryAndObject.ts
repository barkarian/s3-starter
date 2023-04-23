export function queryStringToObjectOfStrings<T>(
	sampleObjectAsAFilter: any,
	query: string
): Record<string, T> {
	const keyValuePairs = query.replace(/^\?/, '').split('&');

	const queryParams: Record<string, T> = {};
	const queryParamKeys: string[] = [];
	keyValuePairs.forEach((pair) => {
		const [key, value] = pair.split('=').map(decodeURIComponent);
		if (key && sampleObjectAsAFilter[key]) {
			//@ts-ignore
			queryParams[key] = value;
		}
	});
	// const result: Record<string, T> = {}
	// sampleObjectAsAFilter.forEach((pair) => {
	// 	const [key, value] = pair
	// 		.split('=')
	// 		.map(decodeURIComponent)
	// 	if (key) {
	// 		//@ts-ignore
	// 		queryParams[key] = value
	// 	}
	// })
	return queryParams;
}

export function objectToQueryString(obj: Record<string, any>): string {
	return Object.entries(obj)
		.map(([key, value]) => {
			if (value === undefined) {
				return '';
			}

			return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
		})
		.filter((item) => item !== '')
		.join('&');
}
