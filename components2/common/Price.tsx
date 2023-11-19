import clsx from 'clsx';

interface PriceProps extends React.ComponentProps<'p'> {
	amount: string;
	className?: string;
	currencyCode: string;
	currencyCodeClassName?: string;
}

export function Price({
	amount,
	className,
	currencyCode = 'USD',
	currencyCodeClassName,
}: PriceProps) {
	return (
		<p suppressHydrationWarning={true} className={className}>
			{`${new Intl.NumberFormat(undefined, {
				style: 'currency',
				currency: currencyCode,
				currencyDisplay: 'narrowSymbol',
			}).format(parseFloat(amount))}`}
			<span
				className={clsx('ml-1 inline', currencyCodeClassName)}
			>{`${currencyCode}`}</span>
		</p>
	);
}
