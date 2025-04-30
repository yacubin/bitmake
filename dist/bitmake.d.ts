declare const _default$1: {
	cxx: typeof cxx;
	cmake: {
		DEFAULT_GENERATOR: GeneratorType;
		scriptMode: typeof scriptMode;
		configure: typeof configure;
		build: typeof build;
		install: typeof install;
		ctest: typeof ctest;
		extract: typeof extract;
	};
	commands: {
		default: (options: CommandOptions) => Promise<void>;
		init: typeof _default;
		build: (options: CommandOptions) => Promise<void>;
	};
	process: {
		spawn: typeof spawnAsync;
	};
	utils: {
		requestGet: typeof requestGet;
		downloadFile: typeof downloadFile;
	};
};
declare enum GeneratorType {
	UnixMakefiles = "Unix Makefiles"
}
declare function _default(options: CommandOptions): Promise<void>;
declare function build(args: any): Promise<void>;
declare function configure(args: any): Promise<void>;
declare function ctest(args: any): Promise<void>;
declare function downloadFile(url: string, file: string, options?: FetchOptions): Promise<undefined>;
declare function extract(args: any): Promise<void>;
declare function filenameToPragmaOnceMacro(filepath: string, deep: number): string;
declare function generatedScriptNameComment(filename: string): string;
declare function install(args: any): Promise<void>;
declare function lineToMultipleComment(line: string): string;
declare function lineToSinglComment(line: string): string;
declare function requestGet(url: string, options?: FetchOptions): Promise<Buffer>;
declare function scriptMode(scriptFile: string, variables: object, options?: ScriptModeOptions): Promise<void>;
declare function spawnAsync(command: string, args: string[], options?: any): Promise<Result>;
export interface CommandOptions {
	handler: string;
	workDir: string;
	env: {
		buildType?: string;
		config?: string;
		preset?: string;
	};
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
	_default$1 as default,
};

export as namespace bitmake;

export {};
