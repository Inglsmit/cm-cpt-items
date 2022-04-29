import { __ } from '@wordpress/i18n';
import { RawHTML } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import './editor.scss';

export default function Edit() {

	// const {numberOfPosts} = attributes;

	const posts = useSelect((select) => {
		return select('core').getEntityRecords('postType', 'movies', {
			per_page: 8,
			_embed: true,
		});
	}, []);

	return (
		<ul {...useBlockProps()}>
			{posts &&
				posts.map((post) => {
					// console.log(post);
					console.log(post._embedded);
					// console.log(allCats);
					const currGenres = 
					post._embedded && 
					post._embedded['wp:term'] && 
					post._embedded['wp:term'].length > 0 
					&& post._embedded['wp:term'][0];
					
					const featuredImage =
					post._embedded &&
					post._embedded['wp:featuredmedia'] &&
					post._embedded['wp:featuredmedia'].length > 0 &&
					post._embedded['wp:featuredmedia'][0];
					return (
						<li key={post.id}>
							{featuredImage && (
								<img
									src={
										featuredImage.media_details.sizes.medium.source_url
									}
									alt={featuredImage.alt_text}
								/>
							)}
							<h5>
								<a href={post.link}>
									{post.title.rendered ? (
										<RawHTML>{post.title.rendered}</RawHTML>
									) : (
										__('(No title)', 'latest-posts')
									)}
								</a>
							</h5>
							{post.excerpt.rendered && (
								<RawHTML>{post.excerpt.rendered}</RawHTML>
							)}
							<p>
								{currGenres &&
									currGenres.map((cat) => {return (
										<>
											<span className=''>{cat.name}</span>
										</>
										) })
								}
							</p>
						</li>
					);
				})}
		</ul>
	);
}
