const imageFragment = /* GraphQL */ `
	fragment image on Image {
		id
		url(transform: { maxWidth: 1024 })
		smallUrl: url(transform: { maxWidth: 600 })
		altText
		width
		height
	}
`;

export default imageFragment;
