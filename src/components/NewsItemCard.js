import styles from './css/NewsItemCard.module.css'
import { useEffect, useRef, useState } from 'react';

export default function(props) {

	const item = props.item;
	const date = item['pubDate'].split(" ").slice(1, 4).join(" ");
	const contentRef = useRef();
	const [render, setRender] = useState(false);

	if (!Array.isArray(item['category'])) item['category'] = [item['category']];

	var contentOpen = false;
	var maximizeContent = () => {
		if (contentOpen) {
			contentRef.current.style.height = "0px";
		}
		else {
			contentRef.current.style.height = (55 + contentRef.current.children[0].clientHeight) + "px";
		}
		contentOpen = !contentOpen;
	};

	
	useEffect(() => {
		setRender(true);
		const observer = new ResizeObserver(_ => {
			if (contentOpen) {
				contentRef.current.style.height = (55 + contentRef.current.children[0].clientHeight) + "px";
			}
		});
		observer.observe(contentRef.current.children[0]);
	});

	return <div className={styles.container}>
		<div className={styles.card}>
			<div className={styles.imagecontainer}>
				<a href={item['link']}>
					<div className={styles.image} style={{backgroundImage: "url(" + item['media:content']['@_url'] + ")"}} />
				</a>
			</div>
			<div className={styles.right}>
				<div className={styles.content}>
					<div className={styles.categories}>{
						item['category'].map((category, i) => <div className={styles.category} key={i}>{category.toUpperCase()}</div>)
					}</div>
					<a href={item['link']} className={styles.link}><div className={styles.title} dangerouslySetInnerHTML={{__html: item['title']}} /></a>
					<div className={styles.description} dangerouslySetInnerHTML={{__html: item['description']}} />
				</div>
				<div className={styles.footer}>
					<div className={styles.creatordate}>
						<div className={styles.creator}>{item['dc:creator'].toUpperCase()}</div>
						|
						<div className={styles.date}>{date}</div>
					</div>
					<div className={styles.readmore} onClick={maximizeContent}>Read More</div>
				</div>
			</div>
		</div>
		<div className={styles.fullcontentcontainer} ref={contentRef}>
			<div className={styles.fullcontent} dangerouslySetInnerHTML={{__html: render && item['content:encoded']}} />
			<div className={styles.closecontent}><div className={styles.closebutton} onClick={maximizeContent}><i className="bi bi-arrow-bar-up"></i></div></div>
		</div>
	</div>;
}
