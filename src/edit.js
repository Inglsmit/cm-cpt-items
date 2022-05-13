/* eslint-disable jsx-a11y/anchor-is-valid */
import { __ } from '@wordpress/i18n';
import { RawHTML } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { Spinner, Placeholder } from '@wordpress/components';
import './editor.scss';

export default function Edit() {
	const postsPerPage = 8;
	const allPosts = useSelect((select) => {
		return select('core').getEntityRecords('postType', 'gb_movies', {
			per_page: -1
		});
	}, []);

	const posts = useSelect((select) => {
		return select('core').getEntityRecords('postType', 'gb_movies', {
			per_page: postsPerPage,
			_embed: true,
		});
	}, []);

	console.log(posts);

	const maxNumPages =
		allPosts &&
		allPosts.length &&
		Math.ceil((allPosts.length) / postsPerPage);

	return (
		<div {...useBlockProps()}>
			{posts && posts.length ? (
				<>
					<div className="wp-block-cm-block-gb-cpt-items__list">
						{posts.map((post) => {
							const currGenres =
								post._embedded &&
								post._embedded['wp:term'] &&
								post._embedded['wp:term'].length > 0 &&
								post._embedded['wp:term'][0];

								console.log(post.meta._gb_sidebar_opt_media_meta.length)
								console.log(post.meta._gb_sidebar_opt_media_meta.mediaURL)

							const featuredVideo = 
								post.meta &&
								post.meta._gb_sidebar_opt_media_meta && 
								post.meta._gb_sidebar_opt_media_meta.length !== 0 &&
								post.meta._gb_sidebar_opt_media_meta.mediaURL;

							const featuredImage =
								post._embedded &&
								post._embedded['wp:featuredmedia'] &&
								post._embedded['wp:featuredmedia'].length > 0 &&
								post._embedded['wp:featuredmedia'][0];
							return (
								<div
									className="wp-block-cm-block-gb-cpt-items__card"
									key={post.id}
								>
									<div className="wp-block-cm-block-gb-cpt-items__card-img">
										<a href={post.link}>
											{ featuredVideo ? (
												<video
													autoPlay
													muted
													loop
													className="wp-block-cm-block-hero-block__video"
													src={featuredVideo}
												/>
											) : (
												<>
													{featuredImage && (
														<img
															className={ featuredImage.id ? `wp-image-${ featuredImage.id }` : null }
															src={
																featuredImage.source_url
															}
															alt={featuredImage.alt_text}
														/>
													)}
												</>
											) }
										</a>
									</div>
									<h2 className="wp-block-cm-block-gb-cpt-items__card-title">
										<a href={post.link}>
											{post.title.rendered ? (
												<RawHTML>
													{post.title.rendered}
												</RawHTML>
											) : (
												__('(No title)', 'gb-cpt-items')
											)}
										</a>
									</h2>
									<p className="wp-block-cm-block-gb-cpt-items__card-text">
										{post.excerpt.rendered && (
											<RawHTML>
												{post.excerpt.rendered}
											</RawHTML>
										)}
									</p>
									<div className="wp-block-cm-block-gb-cpt-items__card-tags">
										{currGenres &&
											currGenres.map((cat) => {
												return (
													<>
														<a
															className="wp-block-cm-block-gb-cpt-items__card-tag"
															href={cat.link}
														>
															#{cat.name}
														</a>
													</>
												);
											})}
									</div>
								</div>
							);
						})}
					</div>

					{maxNumPages > 4 ? (
						<>
							<div className="wp-block-cm-block-gb-cpt-items__paginator">
								<span
									aria-current="page"
									className="page-numbers current"
								>
									1
								</span>
								<a className="page-numbers" href="#">
									2
								</a>
								<a className="page-numbers" href="#">
									3
								</a>
								<span className="page-numbers dots">…</span>
								<a className="page-numbers" href="#">
									{maxNumPages}
								</a>
								<a className="next page-numbers" href="#">
									{__('Next »', 'gb-cpt-items')}
								</a>
							</div>
						</>
					) : (
						<>
							<div className="wp-block-cm-block-gb-cpt-items__paginator">
								<span
									aria-current="page"
									className="page-numbers current"
								>
									1
								</span>
								{[...Array(maxNumPages + 1)].map((e, i) => {
									return (
										i > 1 && (
											<a
												key={i}
												className="page-numbers"
												href="#"
											>
												{i}
											</a>
										)
									);
								})}
								<a className="next page-numbers" href="#">
									{__('Next »', 'gb-cpt-items')}
								</a>
							</div>
						</>
					)}
				</>
			) : (
				<>
					{posts === null ? (
						<Placeholder
							icon={'admin-generic'}
							// eslint-disable-next-line @wordpress/i18n-ellipsis
							label={__('Movies list is loading...', 'gb-cpt-items')}
						>
							<Spinner />
						</Placeholder>
					) : (
						<>
							<p>
								{__('Sorry, movies not found.', 'gb-cpt-items')}
							</p>
						</>
					)}
				</>
			)}
		</div>
	);
}
