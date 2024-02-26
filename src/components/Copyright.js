import styles from "../css/Common.module.css";
function Copyright({ copyright }) {
	return (
		<footer className={styles.footer}>
			<p>{copyright}</p>
		</footer>
	);
}
export default Copyright;
