// src/components/TagFilter.tsx

import { FC } from "react";
import { TagFilterType } from "@/types";
import styles from "@/styles/components/TagFilter.module.scss";

interface TagFilterProps {
	tags: TagFilterType[];
	activeTag: TagFilterType;
	onTagSelect: (tag: TagFilterType) => void;
}

const TagFilter: FC<TagFilterProps> = ({ tags, activeTag, onTagSelect }) => {
	return (
		<div className={styles.container}>
			<h2 className={styles.title}>Filtros:</h2>
			<div className={styles.tagList}>
				{tags.map((tag) => (
					<button
						key={tag}
						onClick={() => onTagSelect(tag)}
						className={`${styles.tag} ${
							activeTag === tag ? styles.active : ""
						}`}
						aria-pressed={activeTag === tag}
					>
						{tag === "all" ? "All" : tag}
					</button>
				))}
			</div>
		</div>
	);
};

export default TagFilter;
