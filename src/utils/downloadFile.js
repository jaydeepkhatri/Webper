export const downloadFile = (data) => {

	//Download JSON file
	const file = new Blob([JSON.stringify(data)], { type: 'application/json' });
	const fileURL = URL.createObjectURL(file);

	const link = document.createElement('a');
	link.download = crypto.randomUUID() + '.json';
	link.href = fileURL;
	link.click();

};