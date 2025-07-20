/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

export class WorkerServiceProvider {
  public processExit(params: any): void {
    setTimeout(() => process.exit(params), 0);
  }
};
