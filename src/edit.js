import { __ } from '@wordpress/i18n';
import { RawHTML } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import './editor.scss';

export default function Edit() {

	const posts = useSelect((select) => {
		return select('core').getEntityRecords('postType', 'movies', {
			per_page: 8,
			_embed: true,
		});
	}, []);

	return (
		<div {...useBlockProps()}>
			<div className="wp-block-cm-block-cm-cpt-items__list">
			{posts &&
				posts.map((post) => {
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
						<div className="wp-block-cm-block-cm-cpt-items__card" key={post.id}>
							<div className="wp-block-cm-block-cm-cpt-items__card-img-box">
								<a href={post.link}>
									{featuredImage && (
										<img
											src={
												featuredImage.media_details.sizes.medium.source_url
											}
											alt={featuredImage.alt_text}
										/>
									)}
								</a>
							</div>
							<h2  className="wp-block-cm-block-cm-cpt-items__card-title">
								<a href={post.link}>
									{post.title.rendered ? (
										<RawHTML>{post.title.rendered}</RawHTML>
									) : (
										__('(No title)', 'latest-posts')
									)}
								</a>
							</h2>
							<p className="wp-block-cm-block-cm-cpt-items__card-text">
								{post.excerpt.rendered && (
									<RawHTML>{post.excerpt.rendered}</RawHTML>
								)}
							</p>
							<div className="wp-block-cm-block-cm-cpt-items__card-tags">
								{currGenres &&
									currGenres.map((cat) => {return (
										<>
											<a className="wp-block-cm-block-cm-cpt-items__card-tags-tag" href={cat.link}>#{cat.name}</a>
										</>
									) })
								}
							</div>
						</div>
					);
				})}
			</div>

			<div className="wp-block-cm-block-cm-cpt-items__paginator">
				<span className="wp-block-cm-block-cm-cpt-items__paginator-item">1</span>
				<span className="wp-block-cm-block-cm-cpt-items__paginator-item"><a href="#">2</a></span>
				<span className="wp-block-cm-block-cm-cpt-items__paginator-item"><a href="#">NEXT PAGE</a></span>
			</div>

		</div>
	);
}
