declare const PATH: unique symbol;
declare const _default: {
	cxx: typeof cxx;
	cmake: {
		scriptMode: (scriptFile: string, variables: object, options?: ScriptModeOptions) => Promise<void>;
		configure: (args: any) => Promise<void>;
		build: (args: any) => Promise<void>;
		install: (args: any) => Promise<void>;
		extract: (args: any) => Promise<void>;
		ctest: (args: any) => Promise<void>;
		getProjectInfo: typeof getProjectInfo;
	};
	process: {
		spawn: typeof spawnAsync;
	};
	utils: {
		requestGet: typeof requestGet;
		downloadFile: typeof downloadFile;
	};
	Locator: typeof Locator;
	path: typeof Path;
};
declare const process$1: {
	spawn: typeof spawnAsync;
};
declare function downloadFile(url: string, file: string, options?: FetchOptions): Promise<undefined>;
declare function filenameToPragmaOnceMacro(filepath: string, deep: number): string;
declare function generatedScriptNameComment(filename: string): string;
declare function getProjectInfo(source: string): Promise<any>;
declare function lineToMultipleComment(line: string): string;
declare function lineToSinglComment(line: string): string;
declare function requestGet(url: string, options?: FetchOptions): Promise<Buffer>;
declare function spawnAsync(command: string, args: string[], options?: SpawnAsyncOptions): Promise<SpawnAsyncReturns>;
declare namespace Path {
	const sep: "\\" | "/";
	const delimiter: ":" | ";";
	function nativePath(path: string): string;
	function representPath(path: string): string;
	function isAbsolute(path: string): boolean;
	function join(...paths: string[]): string;
	function resolve(...paths: string[]): string;
	function dirname(path: string): string;
	function basename(path: string, suffix?: string): string;
	function relative(from: string, to: string): string;
}
export declare class Locator {
	private [PATH];
	protected constructor(urlString: string);
	join(...paths: Locator[] | string[]): Locator;
	dirname(): Locator;
	basename(): string;
	extname(): string;
	relative(to: Locator | string): string;
	resolve(...paths: Array<Locator | string>): Locator;
	match(regexp: RegExp): RegExpMatchArray | null;
	startsWith(searchString: string, position?: number): boolean;
	endsWith(searchString: string, endPosition?: number): boolean;
	toString(): string;
	isPath(): boolean;
	toPath(): string;
	valueOf(): string;
	toURLString(): string;
	toJSON(): any;
	static isLocator(value: any): boolean;
	static ensureInstance(value: any): Locator;
	static create(path: Locator | string): Locator;
}
export declare const cmake: {
	scriptMode: (scriptFile: string, variables: object, options?: ScriptModeOptions) => Promise<void>;
	configure: (args: any) => Promise<void>;
	build: (args: any) => Promise<void>;
	install: (args: any) => Promise<void>;
	extract: (args: any) => Promise<void>;
	ctest: (args: any) => Promise<void>;
	getProjectInfo: typeof getProjectInfo;
};
export declare const utils: {
	requestGet: typeof requestGet;
	downloadFile: typeof downloadFile;
};
export interface Environment {
	[key: string]: string | undefined;
}
export interface FetchOptions {
	attempts?: number;
}
export interface ScriptModeOptions {
	environment?: Environment;
	workDir?: string;
}
export interface SpawnAsyncOptions {
	cwd?: string;
	encoding?: BufferEncoding;
	env?: Environment;
	nostdout?: boolean;
	extra?: {
		verbose?: boolean;
		output?: string;
	};
}
export interface SpawnAsyncReturns {
	status: number;
	stdout: string;
	stderr: string;
	output: string;
	error?: Error | undefined;
}

declare namespace cxx {
	export { filenameToPragmaOnceMacro, generatedScriptNameComment, lineToMultipleComment, lineToSinglComment };
}

export {
	_default as default,
	cxx,
	process$1 as process,
};

export as namespace bitmake;

export {};
