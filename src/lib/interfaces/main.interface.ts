import { Router } from "express";

/**
 * Interface de proveedor de rutas 
 * 
 */
interface ProviderRouter {
  path: string;
  controller: any;
  model: any;
  generateRouter: (controller: any) => Router;
}

/**
 * Interface principal
 */
export interface Main<T> {
  port: number;
  connectionMethod: () => Promise<T>;
  corsMethod: () => any;
  providerRouter: ProviderRouter[];
  textRunServer: string;
}

