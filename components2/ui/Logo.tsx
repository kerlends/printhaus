import React from 'react';

interface CommonProps extends React.SVGAttributes<SVGElement> {}

const SimpleLogo = (props: CommonProps) => (
	<svg viewBox="0 0 233.5 58.7" {...props}>
		<path
			d="M27.6 30.4q0 8.5-4.7 12.4l-2.2 1.5-1.9 1.3q-2 2.5-3.4 2.7a2.7 2.7 0 0 1-1.3-.7 18.1 18.1 0 0 0-2-1.6 2.8 2.8 0 0 0-.6.7v.7a14 14 0 0 1-.5 4.1 14.1 14.1 0 0 1-1.7 3.7 10.5 10.5 0 0 1-2.6 2.7 6.5 6.5 0 0 1-3.1 1.3L2 58.8l-.9-1.4v-.3a1 1 0 0 1 .3-.8 11.4 11.4 0 0 0 1.9-1.2 4.2 4.2 0 0 0 1-1.5 7.2 7.2 0 0 0 .6-2.2L5 48a22.1 22.1 0 0 0-.2-4l-.8-.6a1.3 1.3 0 0 0-.5.2l-.8.5-.7.4-.5.3-1.1-.5L0 43q0-1.4 2.4-4a2.8 2.8 0 0 0 2.4-3V25.7v-2.4q0-1.2-.2-2.1l-.6-.9-1.1-.1a4.1 4.1 0 0 1-1-.4 2.3 2.3 0 0 1-.9-.6 1.6 1.6 0 0 1-.3-1 2.4 2.4 0 0 1 .8-1.5 12 12 0 0 1 1.8-1.6 14.5 14.5 0 0 1 2.1-1.3 4.2 4.2 0 0 1 1.7-.5 2.8 2.8 0 0 1 2.5 1.4q.9 1.3 2.4 4.1.5 0 3.5-3t4.9-2.9a4.6 4.6 0 0 1 2.7 1 9.9 9.9 0 0 1 2.3 2.4 12.8 12.8 0 0 1 1.6 3.3 10.6 10.6 0 0 1 .6 3.3zM21 30v-2.5q0-8-3.1-8a2.9 2.9 0 0 0-1.5.6 18.8 18.8 0 0 0-1.8 1.3q-1 .8-1.7 1.6a7.1 7.1 0 0 0-.9 1 9.6 9.6 0 0 0-.6 4V33.2l.2 5.2a4.8 4.8 0 0 0 .9 1 9.7 9.7 0 0 0 1.3 1 10.1 10.1 0 0 0 1.5.9 3.4 3.4 0 0 0 1.4.3q2 0 3.1-3.1A25.1 25.1 0 0 0 21 30zM53.5 18a3.8 3.8 0 0 1-.3 1.4 11.3 11.3 0 0 1-2.1 3.2 2.7 2.7 0 0 1-1.2.8l-1.2-.4-1.2-2.2-.5-.2-.6-.2q-4.6 0-4.6 9.4v6.7a29 29 0 0 0 .6 4.6h.2a1.8 1.8 0 0 0 .5.3 5.5 5.5 0 0 0 2.8-.7H48a2 2 0 0 1 .5 1.5 2.2 2.2 0 0 1-.5 1.6 4.7 4.7 0 0 1-1 .7l-2.4 1.2-2.4 1.1a7.4 7.4 0 0 1-1.3.5q-5.7 0-5.7-10.4l.4-7.2v-.8-1q0-2.7-.2-4t-.1-1.2q0-1.8-1-2.3l-.6-.2-.7-.1a3.2 3.2 0 0 1-.8-.3 2.2 2.2 0 0 1-.7-.5 1.4 1.4 0 0 1-.3-1 2.2 2.2 0 0 1 .8-1.4 12.4 12.4 0 0 1 2-1.5 14.6 14.6 0 0 1 2.2-1.3 4.7 4.7 0 0 1 1.8-.4h.7l1.5 2 2 2.8a7.7 7.7 0 0 0 1-.9l2.1-1.7 2.3-1.7a3.5 3.5 0 0 1 1.6-.8 3 3 0 0 1 1.5.5 5.9 5.9 0 0 1 1.4 1.1 7.2 7.2 0 0 1 1 1.5 3.4 3.4 0 0 1 .4 1.5zM69.9 43.4q0 1-1.3 1.7t-4.1 2.5q-3.7 0-4.8-2.8a19.7 19.7 0 0 1-.5-6l.2-17.8-.6-.8a10.6 10.6 0 0 1-1.6-.3 4.3 4.3 0 0 1-.8-.4.7.7 0 0 1-.4-.4 2.4 2.4 0 0 1 0-.6 2.2 2.2 0 0 1 .7-1.4 14.3 14.3 0 0 1 1.7-1.5 13.8 13.8 0 0 1 1.9-1.3 3.4 3.4 0 0 1 1.5-.5 3 3 0 0 1 1.4.4 5.5 5.5 0 0 1 1.4 1.1 6.3 6.3 0 0 1 1 1.5 3.6 3.6 0 0 1 .4 1.6v7.1l-.3 15.1.7.4 1.4.7a11.5 11.5 0 0 1 1.4.9q.7.4.7.8zM67.3 6.3a2.2 2.2 0 0 1-.8 1.6l-1 1.1a7.4 7.4 0 0 1-1 1 2.6 2.6 0 0 1-1.5.4 4.3 4.3 0 0 1-3-1.6q-2.5-1-2.5-2.3a2.3 2.3 0 0 1 .6-1.2 14.7 14.7 0 0 1 1.5-1.6 16.8 16.8 0 0 1 1.7-1.4 2.6 2.6 0 0 1 1.3-.5 2.8 2.8 0 0 1 1.3.5 9 9 0 0 1 1.6 1.2A10.5 10.5 0 0 1 66.8 5a2.5 2.5 0 0 1 .5 1.3zM103.2 42.5a2.6 2.6 0 0 1-.8 1.6 10 10 0 0 1-1.8 1.6 14.4 14.4 0 0 1-2.1 1.3 4.3 4.3 0 0 1-1.7.5 3.4 3.4 0 0 1-2.4-.8 6 6 0 0 1-1.5-2.8 24.6 24.6 0 0 1-.8-5q-.3-3-.3-7.5v-2L92 27l.2-2.2v-1.2q0-3.6-.9-4.6a2 2 0 0 0-.4 0 4 4 0 0 1-.6-.3 3.7 3.7 0 0 0-1.5.6 18.6 18.6 0 0 0-2.2 1.4 23.2 23.2 0 0 0-2 1.8 2.9 2.9 0 0 0-1 1.3 25.6 25.6 0 0 0-.3 4.2v2q0 1.2.2 2.2l.1 2.2v2a7.7 7.7 0 0 1-.1 2.4v.2a2.3 2.3 0 0 0 1 1.9 5.7 5.7 0 0 1 3 .8l.4 1a4.3 4.3 0 0 1-1 1.5 14.6 14.6 0 0 1-1.7 1.6 13.3 13.3 0 0 1-1.8 1.2 3.3 3.3 0 0 1-1.5.6q-3.9 0-4.9-6.7l-.2-3.5-.1-6v-1.7l.2-2.4v-2.4l.1-1.7q0-3.2-.5-4a11 11 0 0 0-3.1-.1l-.7-.6-.2-1a2.3 2.3 0 0 1 .8-1.5 11.1 11.1 0 0 1 1.8-1.5 14.2 14.2 0 0 1 2-1.2 4.5 4.5 0 0 1 1.7-.5 3.3 3.3 0 0 1 1.7.4 2.5 2.5 0 0 1 1 1l.7 1.8a15 15 0 0 0 1.5 2.5q1.5-.4 5-3.3 3-2.6 5.2-2.6 5.6 0 5.6 15.6v.5l-.1 1.2v1.3l-.1 8a4.3 4.3 0 0 0 2.3 1.4q1.6.6 1.6 1.9zM121 16.6a5 5 0 0 1-.3 1.7 2.3 2.3 0 0 1-.9 1.1 4.8 4.8 0 0 1-1.7.7l-2.8.4-.2.2q-.2 1.4-.2 3.3t-.1 4.4v12.2l.5.8a5.8 5.8 0 0 0 1 .3 12.4 12.4 0 0 1 2-.2h.5a3.5 3.5 0 0 1 1.2.2l.6 1a2.8 2.8 0 0 1-1 1.6 13.4 13.4 0 0 1-2 1.7 15.1 15.1 0 0 1-2.4 1.3 5.2 5.2 0 0 1-2 .5 5 5 0 0 1-2.3-.5 3.7 3.7 0 0 1-1.6-1.7 11.1 11.1 0 0 1-.8-3.3 35.8 35.8 0 0 1-.2-5.2l.2-15.7-.6-.8-1.7-.9-.3-.9.4-1.1 1.8-1.2a7.1 7.1 0 0 1 .4-1V11q0-.3-1.5-1.7l-.3-.8.4-1a48.5 48.5 0 0 1 5-2.5 32.7 32.7 0 0 1 5.5-2.3 4.9 4.9 0 0 1 1.3.4l.5 1.3a10 10 0 0 1-2.6 2.3q-2 1.5-2 3v4.6a3 3 0 0 0 .6 1.2h4.6a1.3 1.3 0 0 1 1 1.2zM148.7 34.7q0 7-4.7 15.2-5.2 9.2-11.7 9.2l-1-.2-.3-1.1.3-1.2 1.4-1.1 1.8-1.5 2.5-2.2a7.8 7.8 0 0 0 1-1.1 10 10 0 0 0 .8-1.5l.9-2.2 1.2-3.4.2-.2a37.4 37.4 0 0 0 .7-6.1V25.2a8.7 8.7 0 0 0-1.5-5.5l-1.7-.7a5.2 5.2 0 0 0-1.3.6 20.5 20.5 0 0 0-2 1.3 22.3 22.3 0 0 0-1.9 1.4 2.4 2.4 0 0 0-.9 1.2 2.8 2.8 0 0 1 .1.6v.9a6.5 6.5 0 0 0 0 1l-.1 1.6-.2 4v7.5a3.7 3.7 0 0 0 .9 2.4h1a5.8 5.8 0 0 0 1.8-.3l1 .6.4 1.4-3.3 2.5-1.3 1a10.2 10.2 0 0 1-1.1.9h-1.3a3.4 3.4 0 0 1-2-.6 5.5 5.5 0 0 1-1.5-1.5 7.7 7.7 0 0 1-1-2.4 10.9 10.9 0 0 1-.4-2.8V28.4v-1.6-2-2.2-3.9-1.8l.3-7.9a17.5 17.5 0 0 0-2-1.6l-.3-.8.7-1.3 2.5-1.1 1.4-.7 2.4-1.2q4.7-2.3 6-2.3a2.2 2.2 0 0 1 1.9.7v1.5l-2 1.4-2.6 1.8q-1.3 1.5-1.3 5.5v7.4c0 .3.2.5.3.5q.9 0 3.8-2.4l4-3.3a1.6 1.6 0 0 1 .7 0q2.8 0 5.2 5a17.8 17.8 0 0 1 2.2 7.2zM178.9 42.2a5.1 5.1 0 0 1-.5 2 7.6 7.6 0 0 1-1 1.8 5.5 5.5 0 0 1-1.7 1.4 4 4 0 0 1-2 .5 2.8 2.8 0 0 1-1.5-.5 7.6 7.6 0 0 1-1.4-1.1 7.9 7.9 0 0 1-1.2-1.6 8.7 8.7 0 0 1-.8-1.7h-.6q-.4 0-3 2.2t-3.8 2.2a5.7 5.7 0 0 1-3.3-1 9.4 9.4 0 0 1-2.5-2.5 13.2 13.2 0 0 1-1.7-3.6 12.9 12.9 0 0 1-.7-3.9V26.1a11.3 11.3 0 0 1 .3-2.5 5.4 5.4 0 0 1 1-2 11 11 0 0 1 2-2l3.7-2.6a19.6 19.6 0 0 0 4.4-3.7h1a2.8 2.8 0 0 1 .9.5l1.7 1.1 1.8 1.2a3 3 0 0 0 1.4.5 2.3 2.3 0 0 0 .7-.3l1.2-.6 1.1-.6a2.1 2.1 0 0 1 .7-.3l1.5.5.5 1.4-.6 1.6-.8 2.2-.7 2.6a11.8 11.8 0 0 0-.3 2.5v12a10.8 10.8 0 0 0 .6 4l.2.2a5.2 5.2 0 0 0 1.1-.3 5.7 5.7 0 0 1 1-.2h.8zm-9.2-19.8l-.2-.6q-4.9-1.1-5-1.5h-2.3l-.8 1.2a8 8 0 0 0-.9 1.5 10.4 10.4 0 0 0-.6 2.2 16.6 16.6 0 0 0-.3 3.2v3.4q0 9.9 3.9 9.9a3.3 3.3 0 0 0 1.2-.4 8.8 8.8 0 0 0 1.7-1.2 9.7 9.7 0 0 0 1.6-1.7 3.3 3.3 0 0 0 .7-2v-9.7a5.4 5.4 0 0 1 .3-1.5l.7-2.8zM212.9 43a3.6 3.6 0 0 1-1 1.6 12.4 12.4 0 0 1-3.8 3 4.3 4.3 0 0 1-1.8.5q-3.3 0-4.5-5.3a3 3 0 0 0-.5-1q-8 6.4-8.6 6.4-4.7 0-6-6.5a69.3 69.3 0 0 1-.4-10.3l.5-5.8a5.8 5.8 0 0 0 0-.8V24a13.5 13.5 0 0 0-.5-3.6l-.6-.6a9 9 0 0 1-3.6-.5l-.4-.8a5.3 5.3 0 0 1 1.1-1.6 17.1 17.1 0 0 1 1.8-1.7 11.3 11.3 0 0 1 2-1.4 4.2 4.2 0 0 1 2-.6 2.7 2.7 0 0 1 1.6.7 5.9 5.9 0 0 1 1.4 1.6 9.2 9.2 0 0 1 1 2.2 9.5 9.5 0 0 1 .3 2.6v13.7l.2 7.5.6.6h.9a4.2 4.2 0 0 0 1.7-.7 29.2 29.2 0 0 0 2.5-1.6A20 20 0 0 0 201 38q1-1 1-1.5a2.1 2.1 0 0 1-.1-.6v-1.1a3 3 0 0 1 0-.6l.2-2.7v-1.4L202 28v-2.5-4.8a1.4 1.4 0 0 0-1.2-.8 7.5 7.5 0 0 1-2.3-.8 1.9 1.9 0 0 1-.3-.9 2.2 2.2 0 0 1 .8-1.6l1.2-1.1.7-.7a4.8 4.8 0 0 1 3.1-1.4q4.5 0 4.5 8.7v13.8q0 1.2-.3 2l-.2 1.4q0 2 1 2.6a2.3 2.3 0 0 1 .6 0h.8a3.5 3.5 0 0 1 2.2.4zM240.5 36.8q0 4.4-2 6l-5 3.3-1.6 1.5a3.2 3.2 0 0 1-2 1l-1-.4-2.1-1a8.5 8.5 0 0 0-3.6-.7 4.7 4.7 0 0 0-1.2.3 37.6 37.6 0 0 0-3.2 1l-1.1.3-1.4-.5-.6-1.5a5.1 5.1 0 0 1 1.4-2.1 9 9 0 0 1 2.4-1.7 13.6 13.6 0 0 1 3-1.1 15 15 0 0 1 3.5-.4 38.3 38.3 0 0 1 4.9.4l.7.6h1.7q.6-.2.6-3.8a9.3 9.3 0 0 0 0-1l-.2-1.2-.2-1.2a9 9 0 0 1 0-1l-.1-1.9a2.4 2.4 0 0 0-.3-1 1 1 0 0 0-.5-.4 3.7 3.7 0 0 0-1-.1q-1.3 0-3.7 3.2t-3.3 3.1a6.2 6.2 0 0 1-2.8-.6 8.7 8.7 0 0 1-2.4-1.9 10.2 10.2 0 0 1-1.8-2.5 6.3 6.3 0 0 1-.7-2.8v-6.1a7 7 0 0 1 .2-1.4 11 11 0 0 1 1.1-2.6 6 6 0 0 1 1.6-1.3l2.8-1.9 3-1.7a5.5 5.5 0 0 1 1.9-.7 2.9 2.9 0 0 1 .6.4l1.3 1a10.7 10.7 0 0 0 1.6 1 3.4 3.4 0 0 0 1.4.4 3.5 3.5 0 0 0 1.1-.3l1.6-.6 1.6-.7a7.4 7.4 0 0 1 1-.3l1 .4a4.3 4.3 0 0 0 .5 1 4 4 0 0 1-.8 2.3 9 9 0 0 1-2 2A10.9 10.9 0 0 1 234 21a6.6 6.6 0 0 1-2.5.6 11 11 0 0 1-3.9-1l-2-.8a2.5 2.5 0 0 0-.8-.3h-.1a2.7 2.7 0 0 0-1.1 2.4v5.8a2.2 2.2 0 0 0 .8 1.6 2.4 2.4 0 0 0 1.6.8l1-1 1.7-2 2-2q1-1 1.2-1a9.3 9.3 0 0 1 6 2.2 8.4 8.4 0 0 1 2 2.5 6.5 6.5 0 0 1 .8 3z"
			fill="currentColor"
		/>
	</svg>
);

const HeavyLogo = (props: CommonProps) => (
	<svg viewBox="0 0 240.5 59.2" {...props}>
		<path
			d="M1.4 41.4l2.7-.4V23a2.5 2.5 0 0 0 0-.7q-.4-2.5-1.8-2.5a1.8 1.8 0 0 0-1.2.5H1l-.1.1-.7-1L6.9 14a8.8 8.8 0 0 0 .7.6l1 .8a8 8 0 0 1 2.5 6L19 14l1.4 1 2 1.7q3.5 3.3 3.5 9v17a37.6 37.6 0 0 0-9.7 6.7 17.6 17.6 0 0 0-5-2.7V50q0 5.4 3.8 7.2l-.6 1.2A19.1 19.1 0 0 1 7 54.2a14.9 14.9 0 0 1-5 3 1.6 1.6 0 0 0-.7.2l-.3-.8a12.2 12.2 0 0 0 1.8-2q1.3-1.7 1.3-6v-4.1L0 44v-2.4l1.4-.2zm13.9.6a21.4 21.4 0 0 1 3.5 1.6V26.2a7.7 7.7 0 0 0-.7-3.9 9 9 0 0 0-2.8-2.6L11 23.6V41a24.2 24.2 0 0 1 4.2 1zM36 14a10.6 10.6 0 0 1 4.8 5.7l6.4-5.8 5 6.2-4.7 4.4-4.2-5.1-2.8 2.4v19.7L44 44l3.2-2.5 1 1.1-8.5 6.8a17.4 17.4 0 0 0-8.5-5v-.9q2.4-1.3 2.4-5.5V24a6.3 6.3 0 0 0-1-4l-.7-.8-2 1.7-.9-.9zM60.8 49.4q-1.8-1.9-3.4-3.3a23.2 23.2 0 0 0-3.2-2.3v-.7q2.2-.8 2.2-4.5v-18l-2.4-2 5.8-4.6 5.8 4.8-2.4 2.1v21.7l2 1.7 2.1-1.7.9 1.2zM62.1 0l5.8.2-5.8 8-1.7-.2zM76.4 14a17.1 17.1 0 0 1 3 3.1 7.7 7.7 0 0 1 1 4.1L89 14l5 5 3.3-3.1 1 1-1 1q-.6.6-1.2 1.7-1.3 2-1.3 6.6v14q0 3.3 1.7 3.3a3 3 0 0 0 1.6-.8l.5-.5.9 1.3-7.4 6a7.7 7.7 0 0 1-1-1l-1.4-1.6q-1.8-2.5-1.8-7.7V21.6l-2.7-2.8-4.8 4V42l2.3 2.5-6 5-6-5 2.8-2.6V23.7a.4.4 0 0 1 0-.3V22q0-2.4-1.5-2.4a3.1 3.1 0 0 0-1.8.7l-.8-1.1zM111.4 5v10.4h6v3.8h-6v22.3l1 .7 1.3 1 1.1.8L117 42l1 1.2-7.4 6.1a16.5 16.5 0 0 0-8.2-4.8v-1q2.2-1.4 2.2-5.3V19.2h-3V18zM118.5 44.7l2.8-2.4V9.6a8.3 8.3 0 0 0-3-7l.6-1a19.3 19.3 0 0 1 5.1 3.6 13.4 13.4 0 0 1 8.1-4.2l.4.8a8.4 8.4 0 0 1-1 .8q-3.1 2.2-3.1 7V22l9.8-8 1.5 1.3a8 8 0 0 1 3 4.5 21.8 21.8 0 0 1 .4 4.8v13.8a22.8 22.8 0 0 1-1.1 8 13.2 13.2 0 0 1-5 6q-3.4 2.5-12.7 6.2l-.4-1.2 1.2-.5 1.7-.8q5.2-2.4 7.2-5.6t2-8.9V24.8q0-3.7-2.3-5.4l-5.3 4.2v18.8l2.3 2.5-6.2 4.6zM166.8 49.4l-.7-.6-.8-.8a10.4 10.4 0 0 1-2.6-6l-9.3 7.5q-5.4-4.2-5.4-8.8 0-5.7 5.6-12l1-1-6-10.9.2.1h.4a.2.2 0 0 0 .1 0h.8a12.8 12.8 0 0 0 8.5-2.9l.3.2.4.2q5.3 2.7 8.8 2.7a4.7 4.7 0 0 0 3.1-1.5l1 .5a13.3 13.3 0 0 0-2.5 7l-.1 1.6V41q0 2.5 1.8 2.7a5.5 5.5 0 0 0 1.6-.5l.2-.2a.4.4 0 0 0 .3-.2l.7.9zm-16-31.3l5.2 9.4 6.7 2.9V22zm4.6 10.5q-.2 0-.7 2.1a25.4 25.4 0 0 0-.9 5.6q0 3.7 4.4 7.7l4.4-3.7v-8.5l-3.7-1.6zM182.6 14l5.8 5.1-2.3 2v20.2l3 2.5 5-4.5V21l-2.5-2 5.7-5.1 5.8 5.1-2.3 2v19.4q0 3.2 1.8 3.2a2.2 2.2 0 0 0 1.7-.7l1 1.1-7 5.3a8.7 8.7 0 0 1-3.7-4.1 11.1 11.1 0 0 1-.6-4.1l-9.2 8.2a27.7 27.7 0 0 0-7.6-5.2v-1q2-.7 2-3.3V21.4l-1.5-1.1-1.4 1.1-.9-1.1zM215.3 36.1l-6.5-3.6V20.2a18 18 0 0 0 5.2-2.3q1-.7 4-3.8a20.7 20.7 0 0 0 9.1 2.5 4.5 4.5 0 0 0 2.2-.5 2 2 0 0 0 1.2-1.7 2.2 2.2 0 0 0-.7-1.7 2.6 2.6 0 0 1-.8-2 1.8 1.8 0 0 1 2-2q2.5 0 2.5 3v.7q-.3 2-3 5.8l-5.9 8 7.2 4.2V44a26.2 26.2 0 0 0-9.7 5.4 15.3 15.3 0 0 0-7.8-2.6 11.1 11.1 0 0 0-7 2.6l-.9-.8zm5.3-4.3l-7.4 10.5 1.8-.4.6-.2.6-.1h.4a3 3 0 0 0 .5 0h1.4a1 1 0 0 1 .4 0 14 14 0 0 1 5.8 2V34zm-1.5-1l6.6-9.3a6.9 6.9 0 0 1-2 .3h-.7a9.2 9.2 0 0 1-1.5 0l-1.3-.3a16.3 16.3 0 0 1-4.5-2V29z"
			fill="currentColor"
		/>
	</svg>
);

interface LogoProps extends CommonProps {
	variant?: 'heavy' | 'simple';
}

export function Logo({ variant = 'heavy', ...props }: LogoProps) {
	return variant === 'heavy' ? (
		<HeavyLogo {...props} />
	) : (
		<SimpleLogo {...props} />
	);
}
