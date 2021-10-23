type Awaited<P> = P extends Promise<infer T> ? T : unknown;

type AwaitedReturnType<F> = F extends (...args: any[]) => Promise<infer T>
	? T
	: unknown;
