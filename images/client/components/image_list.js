import React from 'react';
import ImageDetail from './image_detail';

const ImageList = (props) => {
	const validImages = props.images.filter(image => (!image.is_album && image.type != 'video/mp4'));

	const RenderImages = validImages.map(image => {
		{/* unique `key` identifier makes it easier for React to rerender lists of item */}
		return <ImageDetail key={image.id} image={image} />
	});

	return (
		<ul className="media-list list-group">
			{RenderImages}
		</ul>
	);
};

export default ImageList;