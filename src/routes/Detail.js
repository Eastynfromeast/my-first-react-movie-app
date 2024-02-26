import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Copyright from "../components/Copyright";
import styles from "../css/Common.module.css";
function Detail() {
	const { id } = useParams();
	const [loading, setLoading] = useState(true);
	const [character, setCharacter] = useState([]);
	const [copyright, setCopyright] = useState("");
	const getCharacter = async () => {
		const json = await (await fetch(`https://marvel-proxy.nomadcoders.workers.dev/v1/public/characters/${id}`)).json();
		setCharacter(json.data.results[0]);
		setLoading(false);
		console.log(json);
		setCopyright(json.attributionText);
	};
	useEffect(() => {
		getCharacter();
	}, []);

	return (
		<div className={styles.container}>
			{loading ? (
				<h1>Loading...</h1>
			) : (
				<div className={styles.detail}>
					<h1>{character.name}</h1>
					<div className={styles.detail__thumb}>
						<img src={character.thumbnail.path + "." + character.thumbnail.extension} alt={character.name} />
					</div>
					<div className={styles.detail__info}>
						<h3>Series ({character.series.items.length})</h3>
						<ul>
							{character.series.items.map(item => (
								<li key={item.resourceURI}>{item.name}</li>
							))}
						</ul>
					</div>
					<div className={styles.detail__info}>
						<h3>Comics ({character.comics.items.length})</h3>
						<ul>
							{character.comics.items.map(item => (
								<li key={item.resourceURI}>{item.name}</li>
							))}
						</ul>
					</div>
					<div className={styles.detail__info}>
						<h3>Stories ({character.stories.items.length})</h3>
						<ul>
							{character.stories.items.map(item => (
								<li key={item.resourceURI}>{item.name.length > 80 ? item.name.slice(0, 80) + "..." : item.name}</li>
							))}
						</ul>
					</div>
					<div className={styles.btn}>
						<Link to="/">Back</Link>
					</div>
					<Copyright copyright={copyright} />
				</div>
			)}
		</div>
	);
}

export default Detail;
