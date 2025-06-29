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
	path: typeof Path;
};
declare function downloadFile(url: string, file: string, options?: FetchOptions): Promise<undefined>;
declare function filenameToPragmaOnceMacro(filepath: string, deep: number): string;
declare function generatedScriptNameComment(filename: string): string;
declare function getProjectInfo(source: string): Promise<any>;
declare function lineToMultipleComment(line: string): string;
declare function lineToSinglComment(line: string): string;
declare function requestGet(url: string, options?: FetchOptions): Promise<Buffer>;
declare function spawnAsync(command: string, args: string[], options?: any): Promise<Result>;
declare namespace Path {
	const sep: "\\" | "/";
	const delimiter: ";" | ":";
	function nativePath(path: string): string;
	function representPath(path: string): string;
	function isAbsolute(path: string): boolean;
	function join(...paths: string[]): string;
	function resolve(...paths: string[]): string;
	function dirname(path: string): string;
	function basename(path: string, suffix?: string): string;
	function relative(from: string, to: string): string;
}
export interface FetchOptions {
	attempts?: number;
}
export interface ScriptModeOptions {
	environment?: object;
	workDir?: string;
}
export type Result = {
	status: number;
};

declare namespace cxx {
	export { filenameToPragmaOnceMacro, generatedScriptNameComment, lineToMultipleComment, lineToSinglComment };
}

export {
	_default as default,
};

export as namespace bitmake;

export {};
