export const skipKeyObject = (object, array) => {
	let updatedHeaderObject = {};

	for (const [key, value] of Object.entries(object)) {
		if (!array.includes(key)) {
			if (typeof value !== 'object' || Array.isArray(value)) {
				updatedHeaderObject[key] = value + '';
			} else {
				for (const [subKey, subValue] of Object.entries(value)) {
					updatedHeaderObject[subKey] = subValue + '';
				}
			}
		}
	}

	return updatedHeaderObject;

};