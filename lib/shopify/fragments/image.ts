const imageFragment = /* GraphQL */ `
	fragment image on Image {
		id
		url
		smallUrl: url(transform: { maxWidth: 600 })
		altText
		width
		height
	}
`;

export default imageFragment;
