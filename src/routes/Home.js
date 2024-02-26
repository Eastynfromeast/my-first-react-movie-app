import { useState, useEffect } from "react";
import Character from "../components/Character";
import Copyright from "../components/Copyright";
import styles from "../css/Common.module.css";
function Home() {
	const [loading, setLoading] = useState(true);
	const [characters, setCharacters] = useState([]);
	const [copyright, setCopyright] = useState("");
	const getChagracters = async () => {
		const json = await (
			await fetch(`https://marvel-proxy.nomadcoders.workers.dev/v1/public/characters?limit=50&orderBy=modified&series=24229,1058,2023`)
		).json();
		setCharacters(json.data.results);
		setLoading(false);
		setCopyright(json.attributionText);
	};
	useEffect(() => {
		getChagracters();
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1>Characters of Marvel</h1>
			</div>
			{loading ? (
				<h1>Loading...</h1>
			) : (
				<div>
					<ul className={styles.itemList}>
						{characters.map(character => (
							<Character
								key={character.id}
								id={character.id}
								name={character.name}
								thumbnailPath={character.thumbnail.path}
								thumbnailExtension={character.thumbnail.extension}
							/>
						))}
					</ul>
					<Copyright copyright={copyright} />
				</div>
			)}
		</div>
	);
}

export default Home;
