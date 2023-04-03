import styles from '@/styles/Home.module.css'
import { useEffect, useRef } from 'react';
import NewsItemCard from '../components/NewsItemCard';
import { createRoot } from 'react-dom/client';
import { XMLParser } from 'fast-xml-parser';

export async function getServerSideProps(context) {

	var res = await fetch('http://localhost:3000/api/proxy');
	var feed = await res.text();

	return {props: {feed: feed}};
}

export default function Home(props) {
	
	const data = new XMLParser({ignoreAttributes: false, attributeNamePrefix: "@_"}).parse(props.feed);
	const items = data['rss']['channel']['item'];

	return <div className={styles.container}>
		<div className={styles.header}>
			<a href="https://www.essentiallysports.com">
				<img className={styles.logo} src="https://image-cdn.essentiallysports.com/wp-content/uploads/es_horizontal-1.png" />
			</a>
		</div>
		<div className={styles.body}>
			<div className={styles.news}>
				{
					items.map((item, i) => <div className={styles.newsitem} key={i}><NewsItemCard item={item} /></div>)
				}
			</div>
		</div>
	</div>;
}
