import { Link } from "react-router-dom";
import propTypes from "prop-types";
import styles from "../css/Common.module.css";

function Character({ id, name, thumbnailPath, thumbnailExtension }) {
	return (
		<li key={id}>
			<Link to={`/character/${id}`}>
				<div className={styles.thumbnail}>
					<img src={thumbnailPath + "." + thumbnailExtension} alt={name} />
				</div>
				<h2>{name}</h2>
			</Link>
		</li>
	);
}

Character.propTypes = {
	id: propTypes.number.isRequired,
	name: propTypes.string.isRequired,
	thumbnailPath: propTypes.string.isRequired,
	thumbnailExtension: propTypes.string.isRequired,
};

export default Character;
