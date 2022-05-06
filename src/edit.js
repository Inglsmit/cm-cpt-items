/* eslint-disable jsx-a11y/anchor-is-valid */
import { __ } from '@wordpress/i18n';
import { RawHTML } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { Spinner, Placeholder } from '@wordpress/components';
import './editor.scss';

export default function Edit() {

	const postsPerPage = 2;
	const allPosts = useSelect((select) => {
		return select('core').getEntityRecords('postType', 'gb_movies', {});
	}, []);

	const posts = useSelect((select) => {
		return select('core').getEntityRecords('postType', 'gb_movies', {
			per_page: postsPerPage,
			_embed: true,
		});
	}, []);

	const maxNumPages = allPosts && allPosts.length && Math.ceil(allPosts.length / postsPerPage);

	console.log(maxNumPages);

	return (
		<div {...useBlockProps()}>
			{posts && posts.length ? (
				<>
					<div className="wp-block-cm-block-cm-cpt-items__list">
						{posts.map((post) => {
							const currGenres =
								post._embedded &&
								post._embedded['wp:term'] &&
								post._embedded['wp:term'].length > 0 &&
								post._embedded['wp:term'][0];

							const featuredImage =
								post._embedded &&
								post._embedded['wp:featuredmedia'] &&
								post._embedded['wp:featuredmedia'].length > 0 &&
								post._embedded['wp:featuredmedia'][0];
							return (
								<div
									className="wp-block-cm-block-cm-cpt-items__card"
									key={post.id}
								>
									<div className="wp-block-cm-block-cm-cpt-items__card-img-box">
										<a href={post.link}>
											{featuredImage && (
												<img
													src={
														featuredImage
															.media_details.sizes
															.medium.source_url
													}
													alt={featuredImage.alt_text}
												/>
											)}
										</a>
									</div>
									<h2 className="wp-block-cm-block-cm-cpt-items__card-title">
										<a href={post.link}>
											{post.title.rendered ? (
												<RawHTML>
													{post.title.rendered}
												</RawHTML>
											) : (
												__('(No title)', 'cm-cpt-items')
											)}
										</a>
									</h2>
									<p className="wp-block-cm-block-cm-cpt-items__card-text">
										{post.excerpt.rendered && (
											<RawHTML>
												{post.excerpt.rendered}
											</RawHTML>
										)}
									</p>
									<div className="wp-block-cm-block-cm-cpt-items__card-tags">
										{currGenres &&
											currGenres.map((cat) => {
												return (
													<>
														<a
															className="wp-block-cm-block-cm-cpt-items__card-tag"
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
							<div className="wp-block-cm-block-cm-cpt-items__paginator">
								<span aria-current="page" className="page-numbers current">1</span>
								<a className="page-numbers" href="#">2</a>
								<a className="page-numbers" href="#">3</a>
								<span className="page-numbers dots">…</span>
								<a className="page-numbers" href="#">{maxNumPages}</a>
								<a className="next page-numbers" href="#">Next »</a>
							</div>
						</>

					):(
						<>
							<div className="wp-block-cm-block-cm-cpt-items__paginator">
								<span aria-current="page" className="page-numbers current">1</span>
								{
									[...Array(maxNumPages+1)].map((e, i) => {
										return i > 1 && <a key={i} className="page-numbers" href="#">{i}</a>
									} )
								}
								<a className="next page-numbers" href="#">Next »</a>
							</div>
						</>
					)}

				</>
			) : (
				<>
					{posts === null ? (
						<Placeholder icon={ 'admin-generic' } label="Movies list is loading...">
							<Spinner />
						</Placeholder>
					):(
						<>
							<p>{__('Sorry, movies not found.', 'cm-cpt-items')}</p>
						</>
					)}
				</>
			)}
		</div>
	);
}
