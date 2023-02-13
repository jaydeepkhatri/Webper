import { RiCheckLine } from 'react-icons/ri';
import { useContext, useEffect } from 'react';
import { AppContext } from '../../App';
import './Notification.scss';

const Notification = () => {

	const { showNotification, setShowNotification } = useContext(AppContext);

	useEffect(() => {
		if (showNotification !== false) {
			setTimeout(() => {
				setShowNotification(false);
			}, 1500);
		}
	}, [showNotification]);


	return (
		<div className={`notification ${showNotification ? 'active' : null}`} >
			<RiCheckLine /> Copied to Clipboard
		</div>
	);
};

export default Notification;