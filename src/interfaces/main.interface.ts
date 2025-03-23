import { Router } from "express";


interface ProviderRouter {
  path: string;
  controller: any;
  model: any;
  generateRouter: (controller: any) => Router;
}

export interface IMain<T> {
  port: number;
  connectionMethod: () => Promise<T>;
  providerRouter: ProviderRouter[];
  textRunServer: string;
}

