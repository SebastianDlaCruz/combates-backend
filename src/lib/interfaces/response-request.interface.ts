export interface Pagination {
  data: any; // Lista de resultados (por ejemplo, boxeadores)
  total: number; // Número total de elementos
  totalPages: number; // Número total de páginas
  currentPage: number; // Página actual
  pageSize: number; // Tamaño de la página
  next: string | null; // Página siguiente (número o URL)
  prev?: string | null;
  messageError?: string;
}


export interface ResponseRequest {
  statusCode: number;
  success: boolean;
  data?: unknown;
  message: string;
  error?: any;
  pagination?: Pagination;
}