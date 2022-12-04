import TattooLayout from '../../components/ui/Layout/TattooLayout';

export default function ContactThankYouPage() {
	return (
		<div className="flex flex-col gap-3 max-w-xl mx-auto text-center">
			<h2 className="text-4xl">Thank you!</h2>
			<p>I will be in touch soon.</p>
		</div>
	);
}

ContactThankYouPage.Layout = TattooLayout;
