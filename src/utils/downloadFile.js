export const downloadFile = (data, contentType) => {

	//Download JSON file
	const file = new Blob([JSON.stringify(data)], { type: contentType.split(';')[0].split('/')[1] });
	const fileURL = URL.createObjectURL(file);

	const link = document.createElement('a');
	link.download = crypto.randomUUID() + '.' + contentType.split(';')[0].split('/')[1];
	link.href = fileURL;
	link.click();

};