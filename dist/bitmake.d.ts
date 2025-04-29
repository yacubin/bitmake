declare const _default$1: {
	cxx: typeof cxx;
	handlers: {
		default: (options: RunScriptOptions) => Promise<void>;
		init: typeof _default;
		build: (options: RunScriptOptions) => Promise<void>;
	};
	process: {
		spawn: typeof spawnAsync;
	};
	utils: {
		requestGet: typeof requestGet;
		downloadFile: typeof downloadFile;
	};
};
declare function _default(options: any): Promise<void>;
declare function downloadFile(url: string, file: string): Promise<any>;
declare function filenameToPragmaOnceMacro(filepath: string, deep: number): string;
declare function generatedScriptNameComment(filename: string): string;
declare function lineToMultipleComment(line: string): string;
declare function lineToSinglComment(line: string): string;
declare function requestGet(url: string): Promise<Buffer>;
declare function spawnAsync(command: string, args: string[], options?: any): Promise<Result>;
export interface RunScriptOptions {
	handler: string;
	nodeExecutable: string;
	currentScript: string;
	workDir: string;
	env: {
		buildType?: string;
		config?: string;
		preset?: string;
	};
}
export type Result = {
	status: number;
};

declare namespace cxx {
	export { filenameToPragmaOnceMacro, generatedScriptNameComment, lineToMultipleComment, lineToSinglComment };
}

export {
	_default$1 as default,
};

export as namespace bitmake;

export {};
