import React from 'react';

export default function Container(props: React.HTMLAttributes<HTMLDivElement>) {
	return <div {...props} className="mx-auto max-w-8xl px-6 py-8" />;
}
